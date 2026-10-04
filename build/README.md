# Build notes 构建说明

The `data/sciRankUrl*.js` / `data/xrRankUrl*.js` files are generated, not
hand-maintained. To rebuild them:

`data/sciRankUrl*.js` 与 `data/xrRankUrl*.js` 为生成文件，重建步骤如下。

## 1. Inputs 输入

| File | Source |
|------|--------|
| `FQBJCR2025-UTF8.csv`, `XR2026-UTF8.csv`, `XR2026Conferences-UTF8.csv` | [hitfyd/ShowJCR](https://github.com/hitfyd/ShowJCR) release (repo dir `中科院分区表及JCR原始数据文件/`). Set its path via the `SHOWJCR_DIR` env var. |
| `../raw/journals_pos_*.json` | dblp journal browse crawl (step 2) |
| `../raw/journal_titles.json` | optional: `{dblpKey: fullTitle}` for venues whose browse name is truncated/merged |
| `../data/ccf*.js` | the extension's own CCF data (match seeds) |

## 2. dblp journal crawl

`https://dblp.org/db/journals/index.html?pos=N` lists 100 journal entries per
page (N = 1, 101, …, 4501; 4585 slots / ~1900 distinct journals, entries repeat
under renamed variants). Save each page's `#browse-journals-output` links as
`raw/journals_pos_{N}.json`:

```json
{"pos": 1, "links": [{"href": "https://dblp.org/db/journals/tocs/", "text": "ACM Transactions on Computer Systems"}]}
```

The pages sit behind the Anubis bot check — use a real browser (solve the
challenge once, then fetch with `fetch()` from page context) and pace requests
(~1 req/s; bursty parallel fetches get throttled). `test/page.html` doubles as a
manual check of the generated data files.

## 3. CCF list updates

`build/update_ccf_2026.py` applies the CCF 2026 recommended-list diff to the
generated ccf*.js files and regenerates dataGen.js's ccfRankList. It is
idempotent — adjust RANK_CHANGES / ADDITIONS / REMOVALS for future list
releases, then re-run:

```bash
python build/update_ccf_2026.py
```

## 4. EI Compendex snapshot (optional 本地生成)

Elsevier publishes the official Compendex Source List workbook from the
[Engineering Village / Compendex product page](https://www.elsevier.com/products/engineering-village/databases/compendex)
(e.g. `COMPENDEX_Source-list-082026.xlsx`). Download it yourself, then build a
local lookup index — the repository does not redistribute the official list:

```bash
python build/gen_ei_data.py path/to/COMPENDEX_Source-list-082026.xlsx
# writes data/eiIndex.js (serial ISSN/name + proceedings ISBN/title keys,
# workbook filename, sheet dates, SHA-256)
```

Badge semantics (see `js/ei.js`):

- `EI` — venue listed in the active serial-source snapshot.
- `EI Stop` — listed in the official discontinued-source sheet (final coverage shown when available).
- `EI?` — both an active and a discontinued record exist in the snapshot (conflict); verify manually.
- no EI badge — not found in the installed snapshot; this is **not** proof of non-indexing, and a badge is a source-list match, not proof that an individual paper is indexed.

Keep Elsevier's current terms in mind before redistributing a generated index.

## 5. Generate 生成

```bash
python build/gen_sci_data.py       # writes data/sciRankUrl*.js, data/xrRankUrl*.js, build/build_report.json
python build/find_near_miss.py     # optional: audit unmatched keys (build/near_miss.json)
```

Review `build_report.json` (`ambiguous_dblp_keys` = dblp keys matched to
neither table) and the suspicious-match audit before shipping. Adjust
`MANUAL_NAME_OVERRIDES` / `BLACKLIST_KEYS` in `gen_sci_data.py` for renamed or
ambiguous journals, then re-run.
