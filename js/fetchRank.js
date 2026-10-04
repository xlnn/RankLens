/**
 * MIT License
 *
 * Copyright (c) 2019-2026 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), FlyingFog (https://github.com/FlyingFog), mra42 (https://github.com/mra42), dozed (https://github.com/dozed), MarkLee131 (https://github.com/MarkLee131)
 */

// PACM PL conference mapping - centralized configuration
const PACM_PL_CONFERENCE_MAP = {
  oopsla: "/conf/oopsla/oopsla",
  oopsla1: "/conf/oopsla/oopsla",
  oopsla2: "/conf/oopsla/oopsla",
  popl: "/conf/popl/popl",
  pldi: "/conf/pldi/pldi",
  icfp: "/conf/icfp/icfp",
};

/**
 * Process PACM PL journal entries to determine the actual conference URL.
 * PACM PL conferences (OOPSLA, POPL, PLDI, ICFP) are published in PACMPL journal
 * but should be recognized as conferences for CCF ranking purposes.
 * @param {Object} resp - DBLP API response hits object
 * @returns {string} DBLP URL for the conference or default PACMPL journal URL
 */
function processPacmPlJournal(resp) {
  let number_raw = resp.hit[0] && resp.hit[0].info && resp.hit[0].info.number;
  let number = number_raw ? number_raw.toString().toLowerCase() : "";

  // Handle missing number - traverse resp.hit array to find an element with number info
  if (number === "") {
    for (let i = 0; i < resp["@sent"]; i++) {
      let hit_number =
        resp.hit[i] && resp.hit[i].info && resp.hit[i].info.number;
      if (hit_number) {
        number = hit_number.toString().toLowerCase();
        break;
      }
    }
  }

  // Map to conference URL using centralized config, fallback to PACMPL journal
  return PACM_PL_CONFERENCE_MAP[number] || "/journals/pacmpl/pacmpl";
}

/**
 * Extract the canonical dblp stream url ("journals/tocs") from a dblp API
 * record url. Shared by the fetch and cache paths.
 */
function rawStreamUrl(resp) {
  try {
    let url = resp.hit[0].info.url;
    return url.substring(url.indexOf("/rec/") + 4, url.lastIndexOf("/"));
  } catch (e) {
    return "";
  }
}

/**
 * Try to rank a result purely by its venue name (no dblp round-trip). Used
 * on Google Scholar so journals outside dblp (medicine, materials, ...)
 * still show their CAS/XinRui partitions. Returns true when badges were
 * inserted.
 */
function tryVenueRank(node, venue, site) {
  if (!venue || venue.length < 4 || venue.length > 150) return false;
  let url;
  try {
    url = ccf.fullUrlByName(venue);
  } catch (e) {
    url = undefined;
  }
  let sciMeta;
  let xrMeta;
  try {
    sciMeta = sci.getRankInfo(venue, "publication").meta;
    xrMeta = xr.getRankInfo(venue, "publication").meta;
  } catch (e) {
    sciMeta = null;
    xrMeta = null;
  }
  if (!url && !sciMeta && !xrMeta) return false;
  const ref = url || venue.toUpperCase();
  const type = url ? "url" : "publication";
  for (let getRankSpan of site.rankSpanList) {
    $(node).after(getRankSpan(ref, type));
  }
  return true;
}

function normIssn(issn) {
  return String(issn || "")
    .replace(/[^0-9Xx]/g, "")
    .toUpperCase();
}

function titleWords(title) {
  return new Set(
    String(title || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter(function (word) {
        return word.length > 2;
      }),
  );
}

function likelyTitleMatch(queryTitle, candidateTitle) {
  const query = titleWords(queryTitle);
  const candidate = titleWords(candidateTitle);
  if (!query.size || !candidate.size) return true;
  let overlap = 0;
  query.forEach(function (word) {
    if (candidate.has(word)) overlap++;
  });
  return overlap / query.size >= 0.45;
}

/**
 * Resolve a paper's journal through OpenAlex/Crossref when dblp has no
 * record (non-CS journals, truncated Scholar venue names). Maps the journal
 * to CAS/XinRui partitions via ISSN or normalized name; falls back to the
 * plain CCF-None badges when nothing matches.
 */
function fetchMetaRank(node, title, year, site) {
  const done = function (ref, type) {
    for (let getRankSpan of site.rankSpanList) {
      $(node).after(getRankSpan(ref, type));
    }
  };
  const fallback = function () {
    done("", "url");
  };
  const insert = function (journal, sciMeta, xrMeta, eiMeta) {
    const url = ccf.fullUrlByName(journal);
    if (url) {
      if (eiMeta && eiMeta.n) {
        ei.runtimeMetaByName[ei.normTitle(journal)] = eiMeta;
      }
      done(url, "url");
      return;
    }
    // The metadata service supplied a verified ISSN match even if its display
    // name differs from the local table. Publish that runtime match by name.
    if (sciMeta && sciMeta.n) {
      sci.runtimeMetaByName[ccf.normName(journal)] = sciMeta;
    }
    if (xrMeta && xrMeta.n) {
      xr.runtimeMetaByName[ccf.normName(journal)] = xrMeta;
    }
    if (eiMeta && eiMeta.n) {
      ei.runtimeMetaByName[ei.normTitle(journal)] = eiMeta;
    }
    done(journal.toUpperCase(), "publication");
  };
  const resolve = function (journal, issns) {
    if (!journal) return null;
    let sciMeta = null;
    let xrMeta = null;
    let eiMeta = null;
    for (const raw of issns || []) {
      const k = normIssn(raw);
      if (!eiMeta && ccf.eiIndex && ccf.eiIndex.serialByIssn) {
        eiMeta = ei.getMetaByIssn(k, journal);
      }
      if (!sciMeta && ccf.sciIssnIdx && ccf.sciIssnIdx[k]) {
        sciMeta = sci.getMetaByIssn(k, journal);
      }
      if (!xrMeta && ccf.xrIssnIdx && ccf.xrIssnIdx[k]) {
        xrMeta = xr.getMetaByIssn(k, journal);
      }
    }
    if (!sciMeta) sciMeta = sci.getMetaByName(journal);
    if (!xrMeta) xrMeta = xr.getMetaByName(journal);
    const ccfUrl = ccf.fullUrlByName(journal);
    if (!sciMeta && !xrMeta && !ccfUrl && !eiMeta) return null;
    return { journal: journal, sci: sciMeta, xr: xrMeta, ei: eiMeta };
  };
  const cacheKey = "meta:" + String(title).toLowerCase().slice(0, 180);
  const cached = apiCache.getItem(cacheKey);
  if (cached && cached.journal) {
    const hit = resolve(cached.journal, cached.issns);
    if (hit) {
      insert(hit.journal, hit.sci, hit.xr, hit.ei);
    } else {
      fallback();
    }
    return;
  }
  const getJson = function (url) {
    return new Promise(function (resolvePromise, rejectPromise) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.timeout = 9000;
      xhr.onload = function () {
        try {
          resolvePromise(JSON.parse(xhr.responseText));
        } catch (e) {
          rejectPromise(e);
        }
      };
      xhr.onerror = function () {
        rejectPromise(new Error("network"));
      };
      xhr.ontimeout = function () {
        rejectPromise(new Error("timeout"));
      };
      xhr.send();
    });
  };
  const mailto = encodeURIComponent("ranklens-ext@users.noreply.github.com");
  const oaUrl =
    "https://api.openalex.org/works?filter=title.search:" +
    encodeURIComponent(title) +
    "&per-page=1&mailto=" +
    mailto;
  const crUrl =
    "https://api.crossref.org/works?query.bibliographic=" +
    encodeURIComponent(title) +
    "&rows=1&mailto=" +
    mailto;
  getJson(oaUrl)
    .then(function (j) {
      const w = j && j.results && j.results[0];
      const source = w && w.primary_location && w.primary_location.source;
      const journal = source && source.display_name;
      const issns = []
        .concat((source && source.issn) || [])
        .concat((source && source.issn_l) || []);
      const candidateTitle = w && (w.title || (w.display_name || ""));
      if (!journal || !likelyTitleMatch(title, candidateTitle)) throw new Error("no reliable result");
      const record = { journal: journal, issns: issns };
      apiCache.setItem(cacheKey, record);
      const resolved = resolve(journal, issns);
      if (resolved) insert(resolved.journal, resolved.sci, resolved.xr, resolved.ei);
    })
    .catch(function () {
      getJson(crUrl)
        .then(function (j) {
          const item = j && j.message && j.message.items && j.message.items[0];
          const journal =
            item && item["container-title"] && item["container-title"][0];
          const issns = (item && item.ISSN) || [];
          const candidateTitle = item && (item.title || (item.title && item.title[0]));
          if (!journal || (candidateTitle && !likelyTitleMatch(title, candidateTitle))) throw new Error("no reliable result");
          const record = { journal: journal, issns: issns };
          apiCache.setItem(cacheKey, record);
          const resolved = resolve(journal, issns);
      if (resolved) insert(resolved.journal, resolved.sci, resolved.xr, resolved.ei);
      else fallback();
        })
        .catch(fallback);
    });
}

function fetchRank(node, title, authorA, year, site) {
  const manifest = chrome.runtime.getManifest();
  const version = manifest.version;

  let query_url =
    "https://dblp.org/search/publ/api?q=" +
    encodeURIComponent(title + "  author:" + authorA) +
    "&format=json&app=CCFrank4dblp_" +
    version;

  let cached = apiCache.getItem(query_url);
  // console.log("cached: ", cached);
  if (cached) fetchFromCache(cached, node, title, authorA, year, site);
  else fetchFromDblpApi(query_url, node, title, authorA, year, site);
}

function fetchFromCache(cached, node, title, authorA, year, site) {
  console.debug('fetch from cache: %s (%s) "%s"', authorA, year, title);

  let dblp_url = cached.dblp_url;
  let resp = cached.resp;
  let resp_flag = cached.flag;
  let raw_url = cached.raw_url || rawStreamUrl(resp);
  // console.log("dblp_url: ", dblp_url);

  //Find a new vul: rankDB lacks of `tacas` etc., but it does occur in file `dataGen`.
  if (typeof dblp_url == "undefined" && resp_flag != false) {
    let dblp_abbr = resp.hit[0].info.number;
    if (typeof dblp_abbr != "undefined" && isNaN(dblp_abbr)) {
      // console.log("dblp_abbr: ", dblp_abbr);
    } else {
      dblp_abbr = resp.hit[0].info.venue;
    }

    for (let getRankSpan of site.rankSpanList) {
      // console.log("with abbr");
      $(node).after(getRankSpan(dblp_abbr, "abbr", raw_url));
    }
  } else if (dblp_url == "/journals/pacmpl/pacmpl") {
    // Process PACM PL conferences using centralized helper function
    dblp_url = processPacmPlJournal(resp);

    for (let getRankSpan of site.rankSpanList) {
      $(node).after(getRankSpan(dblp_url, "url"));
    }
  } else {
    if (resp_flag == false) {
      // dblp has no record (non-CS journals, truncated Scholar venues) —
      // resolve the journal via OpenAlex/Crossref metadata instead
      fetchMetaRank(node, title, year, site);
      return;
    }
    // console.log("dblp_url is not empty");
    for (let getRankSpan of site.rankSpanList) {
      // console.log("with url");
      $(node).after(getRankSpan(dblp_url, "url"));
    }
  }
}

function fetchFromDblpApi(query_url, node, title, authorA, year, site) {
  console.debug('fetch from API: %s (%s) "%s"', authorA, year, title);
  console.debug("query url: %s", query_url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", query_url, true);
  xhr.timeout = 12000;
  var handled = false;
  var resp_flag = true;
  var fail = function () {
    if (handled) return;
    handled = true;
    fetchMetaRank(node, title, year, site);
  };
  xhr.onerror = fail;
  xhr.ontimeout = fail;
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (handled) return;
      if (xhr.status < 200 || xhr.status >= 300) {
        fail();
        return;
      }
      let parsed;
      try {
        parsed = JSON.parse(xhr.responseText);
      } catch (e) {
        fail();
        return;
      }
      if (!parsed.result || !parsed.result.hits) {
        fail();
        return;
      }
      handled = true;
      var dblp_url = "";
      var resp = parsed.result.hits;
      if (resp["@total"] == 0) {
        dblp_url = "";
        resp_flag = false;
      } else if (resp["@total"] == 1) {
        let url = resp.hit[0].info.url;
        dblp_url = url.substring(
          url.indexOf("/rec/") + 4,
          url.lastIndexOf("/"),
        );
      } else {
        var year_last_check = 0;
        for (var h = 0; h < resp["@sent"]; h++) {
          let info = resp.hit[h].info;

          var cur_venue = info.type;
          if (cur_venue == "Informal Publications") continue;

          let author_1st;
          if (Array.isArray(info.authors.author)) {
            author_1st = info.authors.author[0].text;
          } else {
            author_1st = info.authors.author.text;
          }
          let year_fuzzy = info.year;
          // Note: Author matching is temporarily disabled due to inconsistent
          // author name formats from different platforms. We rely on title and
          // year matching instead, which provides good enough accuracy for most cases.
          if (
            (!year || Math.abs(Number(year) - year_fuzzy) <= 1) &&
            author_1st.toLowerCase().split(" ") &&
            year_fuzzy != year_last_check
          ) {
            year_last_check = year_fuzzy;
            let url = resp.hit[h].info.url;
            let dblp_url_last_check = url.substring(
              url.indexOf("/rec/") + 4,
              url.lastIndexOf("/"),
            );
            if (year_fuzzy == year + 1) {
              dblp_url = dblp_url_last_check;
            } else if (year_fuzzy == year) {
              dblp_url = dblp_url_last_check;
              break;
            } else {
              if (dblp_url == "") {
                dblp_url = dblp_url_last_check;
              }
            }
          }
        }
      }
      let raw_url = dblp_url;
      dblp_url = ccf.rankDb[dblp_url];
      apiCache.setItem(query_url, {
        dblp_url: dblp_url,
        raw_url: raw_url,
        resp: resp,
        flag: resp_flag,
      });

      //Find a new vul: rankDB lacks of `tacas` etc., but it does occur in file `dataGen`.
      if (typeof dblp_url == "undefined" && resp_flag != false) {
        let dblp_abbr = resp.hit[0].info.number;
        if (typeof dblp_abbr != "undefined" && isNaN(dblp_abbr)) {
        } else {
          dblp_abbr = resp.hit[0].info.venue;
        }
        for (let getRankSpan of site.rankSpanList) {
          // console.log("with abbr");
          $(node).after(getRankSpan(dblp_abbr, "abbr", raw_url));
        }
      }
      // Process PACM PL conferences using centralized helper function
      else if (dblp_url == "/journals/pacmpl/pacmpl") {
        dblp_url = processPacmPlJournal(resp);

        for (let getRankSpan of site.rankSpanList) {
          $(node).after(getRankSpan(dblp_url, "url"));
        }
      } else {
        if (resp_flag == false) {
          // dblp has no record (non-CS journals, truncated Scholar venues) —
          // resolve the journal via OpenAlex/Crossref metadata instead
          fetchMetaRank(node, title, year, site);
          return;
        }
        for (let getRankSpan of site.rankSpanList) {
          // console.log("with url");
          $(node).after(getRankSpan(dblp_url, "url"));
        }
      }
    }
  };
  xhr.send();
}
