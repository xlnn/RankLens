/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), Kai Chen (https://github.com/FunClip), dozed (https://github.com/dozed)
 */

const ccf = {};

ccf.normName = function (s) {
  return String(s)
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
};

// full-name lookup tolerating "&" vs "AND" and punctuation differences
// between the CCF list and venue names shown on publisher pages
ccf.normFullIdx = null;
ccf.fullUrlByName = function (name) {
  if (!name) return undefined;
  if (ccf.fullUrl.hasOwnProperty(name)) return ccf.fullUrl[name];
  const up = String(name).toUpperCase();
  if (ccf.fullUrl.hasOwnProperty(up)) return ccf.fullUrl[up];
  if (ccf.normFullIdx === null) {
    ccf.normFullIdx = {};
    for (let k in ccf.fullUrl) {
      ccf.normFullIdx[ccf.normName(k)] = ccf.fullUrl[k];
    }
  }
  return ccf.normFullIdx[ccf.normName(name)];
};

ccf.getRankInfo = function (refine, type, rawUrl) {
  let rankInfo = {};
  rankInfo.ranks = [];
  rankInfo.info = "";
  let rank;
  let url;
  if (type == "url") {
    rank = ccf.rankUrl[refine];
    url = refine;
  } else if (type == "abbr") {
    if (refine === undefined) {
      rank = "none";
      rankInfo.info += "Not Found\n";
    } else {
      let full = ccf.abbrFull[refine];
      url = ccf.fullUrl[full];
      if (full === undefined) {
        refine = refine.substring(0, refine.length - 1);
        let res = Object.keys(ccf.fullUrl).filter(function (k) {
          return k.indexOf(refine.toUpperCase()) == 0;
        });
        url = res ? ccf.fullUrl[res] : false;
      }
      rank = ccf.rankUrl[url];
      if (rank == undefined && rawUrl) {
        // venue-abbreviation lookup missed, but the dblp stream url from the
        // search response is known — resolve the rank through it instead
        let canon = ccf.rankDb[rawUrl] || rawUrl;
        let rankViaUrl = ccf.rankUrl[canon];
        if (rankViaUrl !== undefined) {
          rank = rankViaUrl;
          url = canon;
        }
      }
    }
  } else if (type == "meeting") {
    let full = ccf.abbrFull[refine];
    url = ccf.fullUrl[full];
    rank = ccf.rankUrl[url];
  } else {
    url = ccf.fullUrlByName(refine);
    rank = ccf.rankUrl[url];
  }
  if (rank == undefined) {
    rank = "none";
    rankInfo.info += "Not Found\n";
  } else {
    rankInfo.info += ccf.rankFullName[url];
    let abbrname = ccf.rankAbbrName[url];
    if (abbrname != "") {
      rankInfo.info += " (" + abbrname + ")";
    }
    if (rank == "E") {
      rankInfo.info += ": Expanded\n";
    } else if (rank == "P") {
      rankInfo.info += ": Preprint\n";
    } else {
      rankInfo.info += ": CCF " + rank + "\n";
    }
  }
  rankInfo.ranks.push(rank);
  return rankInfo;
};

ccf.getRankClass = function (ranks) {
  for (let rank of "ABCEP") {
    for (let r of ranks) {
      if (r[0] == rank) {
        return "ccf-" + rank.toLowerCase();
      }
    }
  }
  return "ccf-none";
};

ccf.getRankSpan = function (refine, type, rawUrl) {
  let rankInfo = ccf.getRankInfo(refine, type, rawUrl);
  let span = $("<span>")
    .addClass("ccf-rank")
    .addClass(ccf.getRankClass(rankInfo.ranks));
  let firstRank = rankInfo.ranks[0];
  if (firstRank == "E") {
    span.text("Expanded");
  } else if (firstRank == "P") {
    span.text("Preprint");
  } else if (firstRank == "none") {
    span.text("CCF None");
  } else {
    span.text("CCF " + rankInfo.ranks.join("/"));
  }
  if (rankInfo.info.length != 0) {
    span
      .addClass("ccf-tooltip")
      .append($("<pre>").addClass("ccf-tooltiptext").text(rankInfo.info));
  }
  return span;
};
