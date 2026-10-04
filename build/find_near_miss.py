#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Find unmatched dblp keys that have a plausible ranking-table counterpart.

Uses a token-inverted index + overlap score (much faster than difflib over
22k names). Output: build/near_miss.json for manual review / overrides.
"""
import json
import sys
from collections import defaultdict

sys.path.insert(0, r"D:\ccf-sci\CCFrank4dblp\build")
import gen_sci_data as g


def build_index(names):
    idx = defaultdict(set)
    for i, n in enumerate(names):
        for t in set(n):
            idx[t].add(i)
    return idx


def best_rows(cand_tokens, names, idx, top=3):
    cand = set(cand_tokens)
    if not cand:
        return []
    counts = defaultdict(int)
    for t in cand:
        for i in idx.get(t, ()):  # rows containing this token
            counts[i] += 1
    scored = []
    for i, c in counts.items():
        union = len(cand | set(names[i]))
        if union == 0:
            continue
        scored.append((c / union, i))
    scored.sort(reverse=True)
    return scored[:top]


def main():
    dblp = g.load_dblp_journals()
    cas = g.dedupe(g.load_cas())
    xr = g.dedupe(g.load_xr())
    rep = json.load(open(r"D:\ccf-sci\CCFrank4dblp\build\build_report.json", encoding="utf-8"))
    unmatched = rep["ambiguous_dblp_keys"]

    cas_names = [g.tokens(r["name"]) for r in cas]
    xr_names = [g.tokens(r["name"]) for r in xr]
    cas_idx = build_index(cas_names)
    xr_idx = build_index(xr_names)

    out = []
    for key in unmatched:
        frags = dblp[key]["frags"]
        # longest fragment is the most informative
        frags = sorted(frags, key=len, reverse=True)[:2]
        hits = []
        for frag in frags:
            ct = g.tokens(frag)
            if len(ct) < 2:
                continue
            for score, i in best_rows(ct, cas_names, cas_idx):
                if score >= 0.55:
                    hits.append(("CAS", round(score, 2), frag, cas[i]["name"], cas[i]["z"]))
            for score, i in best_rows(ct, xr_names, xr_idx):
                if score >= 0.55:
                    hits.append(("XR", round(score, 2), frag, xr[i]["name"], xr[i]["z"]))
        if hits:
            out.append({"key": key, "display": dblp[key]["names"][:2], "hits": hits[:4]})

    with open(r"D:\ccf-sci\CCFrank4dblp\build\near_miss.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print("keys with plausible counterparts:", len(out), "of", len(unmatched))


if __name__ == "__main__":
    main()
