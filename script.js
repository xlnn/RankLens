dblp.rankSpanList.push(ei.getRankSpan, xr.getRankSpan, sci.getRankSpan, ccf.getRankSpan);
scholar.rankSpanList.push(ei.getRankSpan, xr.getRankSpan, sci.getRankSpan, ccf.getRankSpan);
connectedpapers.rankSpanList.push(ei.getRankSpan, xr.getRankSpan, sci.getRankSpan, ccf.getRankSpan);
semanticscholar.rankSpanList.push(ei.getRankSpan, xr.getRankSpan, sci.getRankSpan, ccf.getRankSpan);
wos.rankSpanList.push(ei.getRankSpan, xr.getRankSpan, sci.getRankSpan, ccf.getRankSpan);
pub.rankSpanList.push(ei.getRankSpan, xr.getRankSpan, sci.getRankSpan, ccf.getRankSpan);

if (window.location.hostname.startsWith("dblp")) {
  dblp.run();
} else if (window.location.hostname.startsWith("scholar.google")) {
  scholar.run();
} else if (window.location.hostname.includes("connectedpaper")) {
  connectedpapers.run();
} else if (window.location.hostname.includes("semanticscholar")) {
  semanticscholar.run();
} else if (window.location.hostname.includes("webofscience") || window.location.hostname.includes("clarivate")) {
  wos.run();
} else if (pub.matches(window.location.hostname)) {
  pub.run();
}

filter.init();
