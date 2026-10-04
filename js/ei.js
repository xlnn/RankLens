/**
 * Optional EI Compendex source-snapshot badge.
 *
 * This badge means the venue appears in a locally generated official source
 * list snapshot. It does NOT assert that a particular paper is indexed.
 */

const ei = {};

ei.runtimeMetaByName = {};

ei.normTitle = function (value) {
  return String(value || "")
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
};

ei.normId = function (value) {
  return String(value || "")
    .replace(/[^0-9Xx]/g, "")
    .toUpperCase();
};

ei.getMetaByName = function (name) {
  if (!name || !ccf.eiIndex) return null;
  const key = ei.normTitle(name);
  if (ei.runtimeMetaByName[key]) return ei.runtimeMetaByName[key];
  let row = ccf.eiIndex.serialByName[key];
  if (!row) row = ccf.eiIndex.proceedingByName[key];
  if (row) return ei.rowToMeta(row, name);

  // Proceedings are often stored with a year/publisher suffix. Accept only
  // the longest unique source-title containment match and mark it as a
  // source-list match, not a paper-level indexing claim.
  let best = null;
  for (const sourceKey in ccf.eiIndex.proceedingByName) {
    if (sourceKey.length < 12) continue;
    if (key.includes(sourceKey) || sourceKey.includes(key)) {
      if (!best || sourceKey.length > best.key.length) {
        best = { key: sourceKey, row: ccf.eiIndex.proceedingByName[sourceKey], ambiguous: false };
      } else if (sourceKey.length == best.key.length && best.row !== ccf.eiIndex.proceedingByName[sourceKey]) {
        best.ambiguous = true;
      }
    }
  }
  if (best && !best.ambiguous) return ei.rowToMeta(best.row, name);
  return null;
};

ei.getMetaByIssn = function (issn, name) {
  if (!ccf.eiIndex) return null;
  const row = ccf.eiIndex.serialByIssn[ei.normId(issn)];
  if (!row) return null;
  const meta = ei.rowToMeta(row, name || row[0]);
  if (name) ei.runtimeMetaByName[ei.normTitle(name)] = meta;
  return meta;
};

ei.rowToMeta = function (row, displayName) {
  return {
    n: displayName || row[0],
    sourceName: row[0],
    type: row[1],
    sheet: row[2],
    status: row[3],
    coverage: row[4] || null,
  };
};

ei.getRankSpan = function (refine, type) {
  let meta = null;
  if (type == "publication") {
    meta = ei.getMetaByName(refine);
  } else if (type == "url") {
    const fullName = ccf.rankFullName && ccf.rankFullName[refine];
    if (fullName) meta = ei.getMetaByName(fullName);
  }
  const indexReady =
    ccf.eiIndex &&
    ccf.eiIndex.meta &&
    ccf.eiIndex.meta.sourceFile &&
    (Object.keys(ccf.eiIndex.serialByIssn).length ||
      Object.keys(ccf.eiIndex.serialByName).length);
  if (!indexReady || !meta) return $("<span>").addClass("ccf-rank-hidden");

  const discontinued = meta.status == "discontinued";
  const conflict = meta.status == "conflict";
  const span = $("<span>")
    .addClass("ccf-rank")
    .addClass(conflict ? "ei-conflict" : discontinued ? "ei-discontinued" : "ei-listed")
    .text(conflict ? "EI?" : discontinued ? "EI Stop" : "EI");

  let info = meta.sourceName + "\n";
  info += conflict
    ? "Conflicting active/discontinued records in the official snapshot\n"
    : discontinued
      ? "Compendex official discontinued-source snapshot\n"
      : "Listed in the official Compendex source snapshot\n";
  info += "Sheet: " + meta.sheet + "\n";
  info += "Snapshot: " + (ccf.eiIndex.meta.sourceFile || "local") + "\n";
  if (meta.coverage && meta.coverage.year) {
    info += "Final coverage year: " + meta.coverage.year + "\n";
  }
  info += "This is a source-list match, not proof that this individual paper is indexed.";
  span
    .addClass("ccf-tooltip")
    .append($("<pre>").addClass("ccf-tooltiptext").text(info));
  return span;
};
