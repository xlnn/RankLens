#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build dblp-key -> journal-ranking data files for the CCFrank4dblp extension.

Ranking sources (data files must be provided locally, see README):
  - 中科院分区表升级版 2025 (CAS, FQBJCR2025-UTF8.csv)  -> sci.rankUrl / sci.meta
  - 新锐期刊分区表 2026     (XR,  XR2026-UTF8.csv)      -> xr.rankUrl / xr.meta
  - 新锐期刊分区表 2026 会议表 (XR2026Conferences)       -> xr.rankUrl (conf entries)

dblp side:
  - crawled journal browse pages (raw/journals_pos_*.json, see build/fetch_dblp_venues.js)
  - full titles fetched per venue (raw/journal_titles.json, optional but improves precision)
  - CCF seed mapping from the extension's own data/*.js files

Outputs (written to ../data/):
  - sciRankUrl.js / sciRankUrlMeta.js
  - xrRankUrl.js / xrRankUrlMeta.js
  - build_report.json (match statistics + unmatched lists for manual review)
"""

import csv
import glob
import json
import os
import re
import unicodedata
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
EXT = os.path.abspath(os.path.join(HERE, ".."))
DATA_SRC = os.environ.get(
    "SHOWJCR_DIR",
    r"D:\ccf-sci\ShowJCR\中科院分区表及JCR原始数据文件",
)
RAW = os.path.join(os.path.dirname(EXT), "raw")

# --------------------------------------------------------------------------
# small helpers
# --------------------------------------------------------------------------

def norm(s):
    """Normalize a journal name for matching: lowercase, strip accents and
    punctuation, collapse whitespace. Keeps digits (2D Materials, 4OR)."""
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = s.lower()
    s = s.replace("&", " and ")
    s = re.sub(r"[^0-9a-z\u4e00-\u9fff]+", " ", s)
    return " ".join(s.split())


def tokens(s):
    ts = norm(s).split()
    # WoS names drop leading articles ("The VLDB Journal" -> "VLDB JOURNAL")
    while ts and ts[0] in ("the", "a", "an"):
        ts = ts[1:]
    return ts


def parse_js_object(path, varname):
    """Extract the object literal assigned to `ccf.<varname> = {...}` from a
    generated data file (the files are plain JSON bodies)."""
    text = open(path, encoding="utf-8").read()
    m = re.search(re.escape(varname) + r"\s*=\s*(\{.*?\});", text, re.S)
    if not m:
        raise ValueError(f"{varname} not found in {path}")
    return json.loads(m.group(1))


# --------------------------------------------------------------------------
# dblp side
# --------------------------------------------------------------------------

ABBR_PAREN = r"\(([A-Za-z0-9][A-Za-z0-9\-&\. ]{0,24})\)"
ABBR_PREFIX = r"^([A-Za-z0-9][A-Za-z0-9\-&\.]{0,24})\s-\s"


def looks_like_abbr(s):
    """mixed-case dblp venue abbreviations: ToSC, iSys, ZfBB, ISeB, COMNET"""
    return any(c.isupper() for c in s) and len(s) <= 25


def split_display(name):
    """Split a dblp browse display name into candidate full-name fragments.

    Handles merged rename slots ("A; B ..."), trailing "(ABBR)" and leading
    "ABBR - " decorations.
    """
    frags = []
    for part in name.split(";"):
        part = part.strip()
        part = re.sub(r"\s*\.\.\.$", "", part)
        part = re.sub(r"\s*\…$", "", part)
        m = re.search(ABBR_PAREN + r"\s*$", part)
        if m and looks_like_abbr(m.group(1)):
            part = part[: m.start()].strip()
        m = re.match(ABBR_PREFIX, part)
        if m and looks_like_abbr(m.group(1)):
            part = part[m.end():].strip()
        if part and part not in frags:
            frags.append(part)
    return frags


def extract_abbrs(name):
    abbrs = []
    m = re.search(ABBR_PAREN + r"\s*$", name)
    if m and looks_like_abbr(m.group(1)):
        abbrs.append(m.group(1))
    m = re.match(ABBR_PREFIX, name)
    if m and looks_like_abbr(m.group(1)):
        abbrs.append(m.group(1))
    return abbrs


def load_dblp_journals():
    """key -> {"names": [...], "abbrs": [...]} gathered from all browse pages."""
    info = defaultdict(lambda: {"names": [], "abbrs": []})
    files = glob.glob(os.path.join(RAW, "journals_pos_*.json"))
    if not files:
        raise SystemExit("no raw/journals_pos_*.json found — run the dblp crawl first")
    for f in files:
        page = json.load(open(f, encoding="utf-8"))
        for link in page.get("links", []):
            key = link["href"].rstrip("/").split("/")[-1]
            text = link["text"]
            if text not in info[key]["names"]:
                info[key]["names"].append(text)
            for ab in extract_abbrs(text):
                if ab not in info[key]["abbrs"]:
                    info[key]["abbrs"].append(ab)
    # split merged ("A; B ...") display names into candidate fragments
    for key, v in info.items():
        frags = []
        for name in v["names"]:
            for part in split_display(name):
                if part not in frags:
                    frags.append(part)
        v["frags"] = frags
    return info


def load_ccf_seeds():
    """stream url -> full journal name, from the extension's own CCF data."""
    d = os.path.join(EXT, "data")
    rank_db = parse_js_object(os.path.join(d, "ccfRankDb.js"), "ccf.rankDb")
    rank_full = parse_js_object(os.path.join(d, "ccfRankFull.js"), "ccf.rankFullName")
    rank_abbr = parse_js_object(os.path.join(d, "ccfRankAbbr.js"), "ccf.rankAbbrName")
    seeds = {}
    for stream, canon in rank_db.items():
        if not stream.startswith("/journals/"):
            continue
        full = rank_full.get(canon, "")
        ab = rank_abbr.get(canon, "")
        if full:
            seeds[stream] = {"canon": canon, "full": full, "abbr": ab}
    return seeds


def load_extra_titles():
    """optional hand-fetched full titles: {"key": "Full Journal Name"}"""
    p = os.path.join(RAW, "journal_titles.json")
    if os.path.exists(p):
        return json.load(open(p, encoding="utf-8"))
    return {}


# --------------------------------------------------------------------------
# ranking sources
# --------------------------------------------------------------------------

def load_cas():
    """CAS 2025 rows -> list of records."""
    rows = []
    p = os.path.join(DATA_SRC, "FQBJCR2025-UTF8.csv")
    with open(p, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            zone = r["大类分区"].strip()
            m = re.match(r"([1-4])\s*\[?([0-9]*)/?([0-9]*)\]?", zone)
            if not m:
                continue
            small = []
            for i in range(1, 7):
                sc = r.get(f"小类{i}", "").strip()
                sz = r.get(f"小类{i}分区", "").strip()
                if sc:
                    sm = re.match(r"([1-4])", sz)
                    small.append([sc.strip(), sm.group(1) if sm else ""])
            rows.append(
                {
                    "name": r["Journal"].strip(),
                    "issn": r["ISSN/EISSN"].strip(),
                    "wos": r["Web of Science"].strip(),
                    "cat": r["大类"].strip(),
                    "z": m.group(1),
                    "p": f'{m.group(2)}/{m.group(3)}' if m.group(2) else "",
                    "top": 1 if r["Top"].strip() == "是" else 0,
                    "small": small,
                    "warn": 1 if "预警" in r["标注"] else 0,
                }
            )
    return rows


def load_xr():
    """XR 2026 rows -> list of records."""
    rows = []
    p = os.path.join(DATA_SRC, "XR2026-UTF8.csv")
    with open(p, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            zone = r["大类新锐分区"].strip()
            m = re.match(r"([1-4])", zone)
            if not m:
                continue
            rows.append(
                {
                    "name": r["Journal"].strip(),
                    "cn": r["刊名"].strip(),
                    "issn": (r.get("ISSN") or "").strip(),
                    "eissn": (r.get("EISSN") or "").strip(),
                    "db": r["数据库"].strip(),
                    "cat": r["大类中文名"].strip(),
                    "z": m.group(1),
                    "top": 1 if r["Top"].strip() == "Top" else 0,
                    "warn": 1 if r["预警标记"].strip() else 0,
                }
            )
    return rows


XR_CONF_KEY_MAP = {
    # 新锐分区表 2026 会议表 (all 1区 Top) -> dblp canonical urls
    "ACL": "/conf/acl/acl",
    "CVPR": "/conf/cvpr/cvpr",
    "FOCS": "/conf/focs/focs",
    "ICML": "/conf/icml/icml",
    "ICSE": "/conf/icse/icse",
    "IEEE S&P": "/conf/sp/sp",
    "ISCA": "/conf/isca/isca",
    "KDD": "/conf/kdd/kdd",
    "NeurIPS": "/conf/nips/nips",
    "OSDI": "/conf/osdi/osdi",
    "SIGCOMM": "/conf/sigcomm/sigcomm",
    "SIGMOD": "/conf/sigmod/sigmod",
    "SOSP": "/conf/sosp/sosp",
    "STOC": "/conf/stoc/stoc",
    "VLDB": "/conf/vldb/vldb",
}


# --------------------------------------------------------------------------
# matching
# --------------------------------------------------------------------------

# renamed journals where the dblp current name diverges from the ranking-table
# name (e.g. IEEE/ACM ToN became IEEE ToN); dblp key -> table-side full name
MANUAL_NAME_OVERRIDES = {
    "ton": "IEEE/ACM Transactions on Networking",
    "cl": "Journal of Computer Languages",
    "adt": "Annals of Telecommunications",
    "pnas": "Proceedings of the National Academy of Sciences of the United States of America",
    "symmetry": "Symmetry-Basel",
    "bit": "BIT Numerical Mathematics",
    "tsmc": "IEEE Transactions on Systems Man Cybernetics-Systems",
    "it": "IT-Information Technology",
}


def dedupe(records):
    """Drop duplicate normalized-name rows; prefer SCIE records."""
    best = {}
    order = []
    for r in records:
        k = " ".join(tokens(r["name"]))
        if k not in best:
            best[k] = r
            order.append(k)
        elif "SCIE" in r.get("wos", "") and "SCIE" not in best[k].get("wos", ""):
            best[k] = r
    return [best[k] for k in order]


GENERIC_TAIL_WORDS = {"of", "the", "a", "an", "and", "for", "on", "in"}

# dblp keys that must stay unmatched: their name is a prefix/subset of a
# renamed WoS row of a DIFFERENT journal (verified manually via near-miss audit)
BLACKLIST_KEYS = {
    # ACM SIGCOMM CCR is not WoS-indexed "COMPUTER COMMUNICATIONS"
    "ccr",
    # Journal of Software (Finland) != Journal of Software-Evolution and Process
    "jsw",
    # Inderscience/RiverPublisher cloud journals != Springer JCC
    "ijcc", "ojcc",
    # old Journal of Algorithms != J. Algorithms & Computational Technology
    "jal",
    # EAI Endorsed Transactions family: only 'sis' is WoS-indexed
    "ebusiness", "eetcc", "eetcogcom", "eetws", "ew", "fiee", "mca", "phat",
    "sesa", "sg", "ue",
    # International Journal of Computing != IJ Computing Science and Mathematics
    "ijcomputing",
}


class Matcher:
    def __init__(self, records):
        # exact normalized-name index and tokenized records
        self.exact = {}
        self.toks = []
        for i, r in enumerate(records):
            k = " ".join(tokens(r["name"]))
            self.exact[k] = i
            self.toks.append(tokens(r["name"]))
        self.records = records

    def _align(self, ct, rt):
        """candidate tokens form a contiguous, in-order prefix of the record
        tokens; prefix-tolerance ("trans" ~ "transactions") applies only to
        tokens of length >= 3 to avoid 1-char false alignments"""
        if len(ct) > len(rt):
            return False
        for j, t in enumerate(ct):
            r = rt[j]
            if t == r:
                continue
            if len(t) >= 3 and r.startswith(t):
                continue
            return False
        return True

    def match(self, cand):
        """Try to match one candidate string. Returns list of matching record
        indices (unique hit == confident). Tolerates truncated dblp names and
        renamed WoS spellings."""
        ct = tokens(cand)
        if not ct:
            return []
        # fragments that end in a preposition/article are truncation
        # artifacts ("EAI Endorsed Transactions on"), not real titles
        if ct[-1] in GENERIC_TAIL_WORDS:
            return []
        n = " ".join(ct)
        if n in self.exact:
            return [self.exact[n]]
        hits = []
        for i, rt in enumerate(self.toks):
            if len(ct) > len(rt):
                # dblp full name vs short WoS name ("Measurement"): accept only
                # when every record token aligns and the surplus candidate
                # tokens are generic filler words
                if len(rt) < 2:
                    continue
                if not all(
                    (a == b) or (len(a) >= 3 and rt[j].startswith(a))
                    for j, (a, b) in enumerate(zip(ct, rt))
                ):
                    continue
                if all(t in GENERIC_TAIL_WORDS for t in ct[len(rt):]):
                    hits.append(i)
                continue
            # truncated dblp names: >= 3 informative tokens, contiguous prefix
            if len(ct) >= 3 and self._align(ct, rt):
                hits.append(i)
        return hits


def match_journals(dblp, cas, xr, ccf_seeds, extra_titles):
    cas_m = Matcher(cas)
    xr_m = Matcher(xr)

    result = {}  # key -> {"cas": idx or None, "xr": idx or None, "via": ...}
    ambiguous = []

    for key, v in dblp.items():
        if key in BLACKLIST_KEYS:
            continue
        # candidate names, best first: manual override, fetched full title,
        # CCF full name, then dblp display fragments (longest first)
        cands = []
        if key in MANUAL_NAME_OVERRIDES:
            cands.append((MANUAL_NAME_OVERRIDES[key], "manual"))
        if key in extra_titles:
            cands.append((extra_titles[key], "title"))
        stream = f"/journals/{key}"
        if stream in ccf_seeds:
            cands.append((ccf_seeds[stream]["full"], "ccf"))
        for frag in sorted(v["frags"], key=len, reverse=True):
            cands.append((frag, "dblp"))

        rec = {"cas": None, "xr": None, "via": {}}
        for target, field, matcher in (("cas", "cas", cas_m), ("xr", "xr", xr_m)):
            matched = None
            for cand, via in cands:
                hits = matcher.match(cand)
                if len(hits) == 1:
                    matched = (hits[0], via)
                    break
            if matched:
                rec[field] = matched[0]
                rec["via"][field] = matched[1]
        if rec["cas"] is None and rec["xr"] is None and cands:
            ambiguous.append(key)
        result[key] = rec
    return result, ambiguous


# --------------------------------------------------------------------------
# output
# --------------------------------------------------------------------------

COPYRIGHT = """/**
 * MIT License
 *
 * WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 * Copyright (c) 2019-2026 All Rights Reserved.
 * ------------------------------------------------------
 * Generated by build/gen_sci_data.py — do not edit by hand.
 * Ranking data sources:
 *   - sci: 中科院期刊分区表升级版2025 (via github.com/hitfyd/ShowJCR, GPL-3.0)
 *   - xr : 新锐期刊分区表2026 (xinrui.fenqubiao.com successor, via ShowJCR)
 * Last updated: %s
 */
"""


def canonical_of(key):
    return f"/journals/{key}/{key}"


def emit(ext_keys, cas, xr, matched, out_dir, today):
    """ext_keys: {key: canonical} special subkey overrides from ccf.rankDb"""
    lines_c = COPYRIGHT % today

    sci_url = {}
    sci_meta = {}
    xr_url = {}
    xr_meta = {}

    for key, rec in matched.items():
        canon = ext_keys.get(key, canonical_of(key))
        stream = f"/journals/{key}"
        if rec["cas"] is not None:
            r = cas[rec["cas"]]
            meta = {
                "n": r["name"],
                "c": r["cat"],
                "z": r["z"],
                "t": r["top"],
                "w": r["wos"],
                "p": r["p"],
                "warn": r["warn"],
            }
            if r["small"]:
                meta["s"] = r["small"][0]
            sci_url[stream] = canon
            sci_url[canon] = canon
            sci_meta[canon] = meta
        if rec["xr"] is not None:
            r = xr[rec["xr"]]
            meta = {
                "n": r["name"],
                "c": r["cat"],
                "z": r["z"],
                "t": r["top"],
                "db": r["db"],
                "warn": r["warn"],
            }
            if r["cn"] and r["cn"] != r["name"]:
                meta["cn"] = r["cn"]
            xr_url[stream] = canon
            xr_url[canon] = canon
            xr_meta[canon] = meta

    # 新锐会议表 (15 conferences, all 1区 Top)
    xr_conf_abbr = {}
    for abbr, canon in XR_CONF_KEY_MAP.items():
        xr_url[canon] = canon
        xr_meta[canon] = {"conf": abbr, "z": "1", "t": 1}
        xr_conf_abbr[abbr.upper().replace(" ", "")] = canon

    def write(fname, var_pairs):
        body = "".join(
            f"ccf.{var} = {json.dumps(obj, ensure_ascii=False, sort_keys=True, separators=(',', ':'))};\n"
            for var, obj in var_pairs
        )
        with open(os.path.join(out_dir, fname), "w", encoding="utf-8") as f:
            f.write(f"{lines_c}{body}")

    write("sciRankUrl.js", [("sciRankUrl", sci_url)])
    write("sciRankUrlMeta.js", [("sciMeta", sci_meta)])
    write("xrRankUrl.js", [("xrRankUrl", xr_url)])
    write(
        "xrRankUrlMeta.js",
        [("xrMeta", xr_meta), ("xrConfAbbr", xr_conf_abbr)],
    )
    return sci_meta, xr_meta


def norm_key(s):
    """Mirror of ccf.normName in js/ccf.js: uppercase, & -> AND, strip punct."""
    import re as _re
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = s.upper().replace("&", " AND ")
    s = _re.sub(r"[^A-Z0-9\u4e00-\u9fff]+", " ", s)
    return " ".join(s.split())


def short_db(db):
    """Compact WoS indexing info: 'Web of Science (SCIE); Scopus' -> 'SCIE'"""
    m = re.search(r"Web of Science \(([^)]+)\)", db or "")
    return m.group(1) if m else (db or "").strip()


def norm_issn(issn):
    """Normalize an ISSN/EISSN to bare digits+X for lookup."""
    s = re.sub(r"[^0-9Xx]", "", issn or "")
    return s.upper()


def issn_keys(cas_row):
    """All ISSN/EISSN variants of a CAS row (column '1078-8956/1558-0792')."""
    keys = []
    for part in (cas_row["issn"] or "").split("/"):
        k = norm_issn(part)
        if k and k not in keys:
            keys.append(k)
    return keys


def xr_issn_keys(xr_row):
    keys = []
    for col in ("issn", "eissn"):
        k = norm_issn(xr_row.get(col, ""))
        if k and k not in keys:
            keys.append(k)
    return keys


def emit_name_indexes(cas, xr, out_dir, today):
    """Full journal tables keyed by normalized name, so non-dblp journals
    (medicine, materials, ...) resolve on publisher pages and Google Scholar.
    Compact array values keep the payload small (~1 MB each). ISSN indexes
    support exact journal resolution from Crossref/OpenAlex metadata."""
    sci_idx = {}
    sci_issn = {}
    for r in cas:
        key = norm_key(r["name"])
        if not key or key not in sci_idx:
            sci_idx[key] = [r["z"], r["top"], r["cat"], r["wos"], r["p"], r["warn"]]
        value = sci_idx[key]
        for k in issn_keys(r):
            sci_issn.setdefault(k, value)
    xr_idx = {}
    xr_issn = {}
    for r in xr:
        key = norm_key(r["name"])
        if not key or key not in xr_idx:
            xr_idx[key] = [r["z"], r["top"], r["cat"], short_db(r["db"]), r["warn"]]
        value = xr_idx[key]
        for k in xr_issn_keys(r):
            xr_issn.setdefault(k, value)

    body = "".join(
        f"ccf.{var} = {json.dumps(obj, ensure_ascii=False, sort_keys=True, separators=(',', ':'))};\n"
        for var, obj in (
            ("sciNameIdx", sci_idx),
            ("xrNameIdx", xr_idx),
            ("sciIssnIdx", sci_issn),
            ("xrIssnIdx", xr_issn),
        )
    )
    with open(os.path.join(out_dir, "rankNameIdx.js"), "w", encoding="utf-8") as f:
        f.write((COPYRIGHT % today) + body)
    return len(sci_idx), len(xr_idx), len(sci_issn), len(xr_issn)


def main():
    today = __import__("datetime").date.today().isoformat()
    dblp = load_dblp_journals()
    ccf_seeds = load_ccf_seeds()
    extra_titles = load_extra_titles()
    cas = load_cas()
    xr = load_xr()
    print(f"dblp journals: {len(dblp)}, CCF journal seeds: {len(ccf_seeds)}, "
          f"CAS records: {len(cas)}, XR records: {len(xr)}, extra titles: {len(extra_titles)}")

    cas = dedupe(cas)
    xr = dedupe(xr)
    matched, ambiguous = match_journals(dblp, cas, xr, ccf_seeds, extra_titles)

    # statistics
    n_cas = sum(1 for r in matched.values() if r["cas"] is not None)
    n_xr = sum(1 for r in matched.values() if r["xr"] is not None)
    print(f"matched CAS: {n_cas}, matched XR: {n_xr}, dblp keys with no match: {len(ambiguous)}")

    # unmatched CAS journals worth reviewing (cs / engineering / math ...)
    interesting = {"计算机科学", "工程技术", "数学", "综合性期刊", "管理学", "物理学", "物理与天体物理"}
    hit_cas = {r["cas"] for r in matched.values() if r["cas"] is not None}
    unmatched_cas = [
        {"name": cas[i]["name"], "cat": cas[i]["cat"], "z": cas[i]["z"]}
        for i in range(len(cas))
        if i not in hit_cas and cas[i]["cat"] in interesting
    ]
    unmatched_cas.sort(key=lambda x: (x["cat"], x["z"]))

    report = {
        "stats": {
            "dblp_journals": len(dblp),
            "matched_cas": n_cas,
            "matched_xr": n_xr,
            "ambiguous_or_unmatched_dblp": len(ambiguous),
            "unmatched_cas_interesting": len(unmatched_cas),
        },
        "ambiguous_dblp_keys": ambiguous,
        "unmatched_cas_interesting": unmatched_cas,
    }
    with open(os.path.join(HERE, "build_report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=1)

    # emit extension data files; extend keys with ccf canonical subkeys
    rank_db = parse_js_object(os.path.join(EXT, "data", "ccfRankDb.js"), "ccf.rankDb")
    ext_keys = {}
    for stream, canon in rank_db.items():
        m = re.match(r"^/journals/([a-z0-9\-]+)/", canon)
        if m and m.group(1) != canon.split("/")[2]:
            ext_keys[m.group(1)] = canon
        elif m:
            ext_keys[m.group(1)] = canon
    sci_meta, xr_meta = emit(ext_keys, cas, xr, matched, os.path.join(EXT, "data"), today)
    n_sci_idx, n_xr_idx, n_sci_issn, n_xr_issn = emit_name_indexes(cas, xr, os.path.join(EXT, "data"), today)
    print(f"emitted: sci {len(sci_meta)} journals, xr {len(xr_meta)} entries (incl. conferences)")
    print(f"name indexes: sci {n_sci_idx}, xr {n_xr_idx}; issn indexes: sci {n_sci_issn}, xr {n_xr_issn}")


if __name__ == "__main__":
    main()
