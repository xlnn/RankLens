/**
 * MIT License
 *
 * Copyright (c) 2019-2026 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 *
 * Publisher-site adapter (论文原网站/会议官网): ScienceDirect, SpringerLink,
 * IEEE Xplore, ACM DL, Wiley, Taylor & Francis, MDPI, Nature, arXiv, plus
 * conference/open-proceedings sites: ACL Anthology, OpenReview, PMLR,
 * NeurIPS proceedings, CVF Open Access, USENIX, AAAI (OJS).
 *
 * Article pages embed Google-Scholar-style citation_* meta tags. The venue is
 * looked up by name first (no network; containment-tolerant for proceedings
 * titles), then falls back to the dblp title search used on Google Scholar.
 */

const pub = {};

pub.rankSpanList = [];

// hostnames on which this adapter runs (manifest matches must cover these)
pub.sites = [
  "sciencedirect.com",
  "link.springer.com",
  "ieeexplore.ieee.org",
  "dl.acm.org",
  "onlinelibrary.wiley.com",
  "tandfonline.com",
  "www.mdpi.com",
  "nature.com",
  "arxiv.org",
  "aclanthology.org",
  "openreview.net",
  "proceedings.mlr.press",
  "papers.nips.cc",
  "proceedings.neurips.cc",
  "openaccess.thecvf.com",
  "usenix.org",
  "ojs.aaai.org",
];

// per-site overrides of the title-node lookup
pub.siteConfig = {
  "openaccess.thecvf.com": { titleSel: "#papertitle" },
};

pub.pollInterval = null;
pub.state = { node: null, key: "", wrap: null };

pub.meta = function (name) {
  const el =
    document.querySelector('meta[name="' + name + '"][content]') ||
    document.querySelector('meta[property="' + name + '"][content]');
  return el ? el.getAttribute("content").trim() : "";
};

// normalized containment match for proceedings-style venue names
// ("Proceedings of the 62nd Annual Meeting of the ACL" ~ CCF's ACL entry);
// the most specific (longest contained / shortest containing) name wins, and
// only unique hits are accepted, otherwise undefined
pub._normNames = null;
pub.venueUrlByContainment = function (venue) {
  const v = ccf.normName(venue);
  if (!v || v.length < 12) return undefined;
  if (pub._normNames === null) {
    pub._normNames = [];
    for (let k in ccf.fullUrl) {
      pub._normNames.push([ccf.normName(k), ccf.fullUrl[k]]);
    }
  }
  let best = null; // { score, u, ambiguous }
  for (const [n, u] of pub._normNames) {
    if (n.length < 12) continue;
    let score = null;
    if (v === n) score = 1e9;
    else if (v.includes(n)) score = 1e6 + n.length;
    else if (n.includes(v)) score = 1e6 - n.length;
    if (score === null) continue;
    if (best === null || score > best.score) {
      best = { score: score, u: u, ambiguous: false };
    } else if (score === best.score && best.u !== u) {
      best.ambiguous = true;
    }
  }
  return best && !best.ambiguous ? best.u : undefined;
};

pub.findTitleNode = function () {
  const hostname = window.location.hostname;
  const cfgKey = Object.keys(pub.siteConfig).find(function (s) {
    return hostname === s || hostname.endsWith("." + s) || hostname.includes(s);
  });
  if (cfgKey) {
    const n = document.querySelector(pub.siteConfig[cfgKey].titleSel);
    if (n) return n;
  }
  let n = document.querySelector("h1");
  if (!n) n = document.querySelector("h2"); // ACL Anthology / OpenReview
  return n;
};

pub.appendRank = function () {
  const node = pub.findTitleNode();
  if (!node) return;
  const articleTitle = pub.meta("citation_title");
  const venueName = !articleTitle ? node.textContent.trim() : "";
  const key = articleTitle || venueName;

  // Handle SPA navigation: clear badges and ranking state when the same title
  // node is reused for a different article/venue.
  if (pub.state.node === node && pub.state.key !== key) {
    if (pub.state.wrap && pub.state.wrap.parentNode) pub.state.wrap.remove();
    node.removeAttribute("data-ccf-ranked");
    pub.state.wrap = null;
  }
  if (node.dataset.ccfRanked && pub.state.key === key) return;
  pub.state.node = node;
  pub.state.key = key;
  if (!key || key.length < 6 || key.length > 300) return;

  // Venue/home page mode: no article title, so use the heading as venue name.
  if (!articleTitle) {
    if (pub.appendVenueRank(node, venueName)) node.dataset.ccfRanked = "1";
    return;
  }

  // publisher stylesheets sometimes force their own children to display:block;
  // badges go into a shield wrapper so page CSS cannot stretch them
  const wrap = document.createElement("span");
  wrap.className = "ccf-rank-wrap";
  pub.state.wrap = wrap;

  const title = articleTitle;
  const venue =
    pub.meta("citation_journal_title") || pub.meta("citation_conference_title");
  const date =
    pub.meta("citation_publication_date") || pub.meta("citation_date") || "";
  const year = (date.match(/\d{4}/) || [""])[0];
  const authors = document.querySelectorAll('meta[name="citation_author"]');
  const author = authors.length
    ? authors[0]
        .getAttribute("content")
        .trim()
        .split(/\s+/)
        .pop()
    : "";

  // 1) venue-name based lookup — no network needed
  if (venue) {
    const url = ccf.fullUrlByName(venue) || pub.venueUrlByContainment(venue);
    if (url) {
      // url covers ccf, the xr conference table and sci journal entries
      node.dataset.ccfRanked = "1";
      node.after(wrap);
      // rankSpanList is ordered so dblp.js's after()-insertion shows CCF
      // first; appendChild keeps insertion order, so walk it backwards
      for (let i = pub.rankSpanList.length - 1; i >= 0; i--) {
        wrap.appendChild(pub.rankSpanList[i](url, "url").get(0));
      }
      return;
    }
    const known =
      sci.getRankInfo(venue, "publication").meta ||
      xr.getRankInfo(venue, "publication").meta;
    if (known) {
      node.dataset.ccfRanked = "1";
      node.after(wrap);
      for (let i = pub.rankSpanList.length - 1; i >= 0; i--) {
        wrap.appendChild(
          pub.rankSpanList[i](venue.toUpperCase(), "publication").get(0),
        );
      }
      return;
    }
  }

  // 2) fall back to the dblp title search (same flow as Google Scholar)
  node.dataset.ccfRanked = "1";
  node.after(wrap);
  const inner = document.createElement("span");
  wrap.appendChild(inner);
  fetchRank($(inner), title, author, year || 0, pub);
};

/**
 * Insert badges for a venue resolved purely by name (journal/conference home
 * pages). Returns true when at least one ranking system recognized it.
 */
pub.appendVenueRank = function (node, venueName) {
  const url = ccf.fullUrlByName(venueName) || pub.venueUrlByContainment(venueName);
  const sciMeta = sci.getRankInfo(venueName, "publication").meta;
  const xrMeta = xr.getRankInfo(venueName, "publication").meta;
  if (!url && !sciMeta && !xrMeta) return false;

  const wrap = document.createElement("span");
  wrap.className = "ccf-rank-wrap";
  node.after(wrap);
  const ref = url || venueName.toUpperCase();
  const type = url ? "url" : "publication";
  for (let i = pub.rankSpanList.length - 1; i >= 0; i--) {
    wrap.appendChild(pub.rankSpanList[i](ref, type).get(0));
  }
  return true;
};

pub.run = function () {
  pub.stop();
  pub.appendRank();
  pub.pollInterval = setInterval(function () {
    pub.appendRank();
  }, 800);
};

pub.stop = function () {
  if (pub.pollInterval !== null) {
    clearInterval(pub.pollInterval);
    pub.pollInterval = null;
  }
  pub.state = { node: null, key: "", wrap: null };
};

pub.matches = function (hostname) {
  return pub.sites.some(function (s) {
    return hostname === s || hostname.endsWith("." + s) || hostname.includes(s);
  });
};
