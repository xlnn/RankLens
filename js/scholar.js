/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), mra42 (https://github.com/mra42)
 */

const scholar = {};

scholar.rankSpanList = [];

/**
 * Extract the venue name from a Google Scholar result line. Handles the
 * classic "Authors - Venue, Year - Publisher" form, the "·" publisher
 * separator, dash unicode variants, and truncated venue names
 * ("Advanced …, 2026" on long author lists).
 */
scholar.extractVenue = function (text) {
  if (!text) return "";
  const normalized = String(text)
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/\u00b7/g, "-")
    .replace(/\u2026/g, "…")
    .replace(/\s+/g, " ")
    .trim();

  // Works for both result rows ("authors - venue, year - publisher") and
  // author-profile rows that start directly with "venue, year - publisher".
  const direct = normalized.match(/(?:^|\s-\s)([^-]+?),\s*((?:19|20)\d{2})\b/);
  if (direct) {
    const venue = direct[1].trim().replace(/\s*(…|\.\.\.)\s*$/, "");
    if (venue.length >= 4 && venue.length <= 150) return venue;
  }

  const segments = normalized.split(" - ");
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i].trim();
    const m = seg.match(/^(.+?),?\s*((?:19|20)\d{2})\b.*$/);
    if (m) {
      let venue = m[1].trim().replace(/\s*(…|\.\.\.)\s*$/, "").trim();
      if (venue.length >= 4 && venue.length <= 150) return venue;
    }
  }
  return "";
};

scholar.extractYear = function (text) {
  const match = String(text || "").match(/\b((?:19|20)\d{2})\b/);
  return match ? match[1] : "";
};

scholar.run = function () {
  let url = window.location.pathname;
  if (url == "/scholar") {
    scholar.appendRank();
  } else if (url == "/citations") {
    scholar.appendRanks(); // 页面加载时先处理一次作者主页上的条目
    scholar.observeCitations(); // 然后设置观察者以处理动态加载的条目
  }
};

scholar.appendRank = function () {
  let elements = $("#gs_res_ccl_mid > div > div.gs_ri");
  elements.each(function (index) {
    let node = $(this).find("h3 > a");
    if (!node.next().hasClass("ccf-rank")) {
      let title = node.text();
      let gsA = $(this).find("div.gs_a").text();
      let data = gsA
        .replace(/[\,\-\…]/g, "")
        .split(" ");
      let author = data[1];
      let year = scholar.extractYear(gsA);
      let venue = scholar.extractVenue(gsA);
      setTimeout(function () {
        // journals outside dblp (medicine, materials, ...) resolve directly
        // by venue name against the full CAS/XinRui tables
        if (!tryVenueRank(node, venue, scholar)) {
          fetchRank(node, title, author, year, scholar);
        }
      }, 100 * index);
    }
  });
};

scholar.observeCitations = function () {
  console.debug("Start citations ...");
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // 检查是否有新的文献项被添加到列表
        scholar.appendRanks();
      }
    }
  });

  // 开始观察文献列表的变化
  const targetNode = document.getElementById("gsc_a_b");
  if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
  }
};

scholar.appendRanks = function () {
  let elements = $("tr.gsc_a_tr");
  elements.each(function (index) {
    let node = $(this).find("td.gsc_a_t > a").first();
    if (!node.next().hasClass("ccf-rank") && !$(this).hasClass("ccf-ranked")) {
      let title = node.text();
      let author = $(this)
        .find("div.gs_gray")[0]
        .innerText.replace(/[\,\…]/g, "")
        .split(" ")[1];
      let year = $(this).find("td.gsc_a_y").text();
      let venue = scholar.extractVenue(
        $(this).find("div.gs_gray")[1] ? $(this).find("div.gs_gray")[1].innerText : "",
      );
      $(this).addClass("ccf-ranked");
      setTimeout(function () {
        if (!tryVenueRank(node, venue, scholar)) {
          fetchRank(node, title, author, year, scholar);
        }
      }, 100 * index);
    }
  });
};
