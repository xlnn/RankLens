<h1 align="center">
  <img src="./icon/32x32.png" height="22" alt="RankLens logo"> RankLens
</h1>

<p align="center">
  Academic venue rankings on search results, publisher pages, and conference proceedings.
</p>

<p align="center"><a href="#english">English</a> · <a href="#中文">中文</a></p>

---

<a id="english"></a>

# English

## Overview

**RankLens** is an enhanced fork of [CCFrank](https://github.com/WenyanLiu/CCFrank4dblp). It places venue badges next to papers and journal/conference titles:

- **CCF recommended rank**: A, B, or C, aligned with the CCF 2026 list.
- **CAS journal partition (SCI)**: Zone 1–4, Top flag, category, position, WoS indexing, and warnings.
- **XinRui journal partition**: Zone 1–4, Top flag, category, database coverage, and review warnings.
- **EI Compendex source-list status**: shown only from a locally generated, traceable Elsevier snapshot. It means the venue is listed in that source snapshot; it does **not** prove that an individual paper was indexed by EI.

Hover a badge to see its details.

## Ranking data and coverage

| Badge | Source | Local coverage |
|---|---|---:|
| `CCF A` … `CCF C` | CCF Recommended List 2026 | International computer-science venues |
| `SCI 1区` … `SCI 4区` | CAS partition table 2025 | 1,237 dblp mappings, 21,771 journal names, 38,449 ISSNs |
| `新锐1区` … `新锐4区` | XinRui partition table 2026 | 1,253 dblp mappings, 22,292 journal names, 20,629 ISSNs, 15 conferences |
| `EI` / `EI Stop` | Elsevier Compendex official source-list snapshot | Only when a local official snapshot is installed |

The CAS/XinRui indexes cover all disciplines represented by their source tables, including medicine, materials, chemistry, biology, management, and economics. CCF itself remains computer-science-focused.

## Supported sites

**Search and discovery**

- dblp and mirrors
- Google Scholar
- Connected Papers
- Semantic Scholar
- Web of Science

**Publisher and repository pages**

- ScienceDirect, SpringerLink, IEEE Xplore, ACM Digital Library
- Wiley Online Library, Taylor & Francis, MDPI, Nature, arXiv

**Conference and proceedings pages**

- ACL Anthology, OpenReview, PMLR
- NeurIPS proceedings (`papers.nips.cc`, `proceedings.neurips.cc`)
- CVF Open Access, USENIX, AAAI OJS

## Matching and fallback behavior

RankLens uses the most reliable identifier available:

1. Exact dblp stream URL.
2. Exact ISSN/EISSN.
3. Normalized full venue name.
4. Longest unique containment match for proceedings titles such as “Proceedings of the 62nd Annual Meeting …”.
5. Paper-title lookup in dblp.
6. For non-dblp papers or truncated Google Scholar venues such as `Advanced …`, OpenAlex is queried first and Crossref second to recover a full journal title and ISSN.

OpenAlex/Crossref results are accepted only when the returned work title has sufficient word overlap with the requested paper title. Successful metadata responses are cached locally for 24 hours.

## EI Compendex: verified-only workflow

Elsevier publishes an official **Compendex Source List** workbook from the [Engineering Village / Compendex product page](https://www.elsevier.com/products/engineering-village/databases/compendex). The current official download is a workbook such as `COMPENDEX_Source-list-082026.xlsx` with `SERIALS`, `NON-SERIALS`, `DISCONTINUED`, and related sheets.

RankLens does not silently claim EI coverage from Scopus, SCI, CCF, or a publisher name. To enable the optional EI badge:

1. Download the official workbook yourself from Elsevier.
2. Run:

   ```bash
   python build/gen_ei_data.py path/to/COMPENDEX_Source-list-082026.xlsx
   ```

3. Reload the extension.

The generated local file is `data/eiIndex.js`. This checkout contains a locally generated snapshot from the official workbook; before redistributing the repository, verify that your use and distribution comply with Elsevier's current terms or obtain permission. The file stores normalized title/ISSN/ISBN lookup keys, the workbook filename, sheet dates, and SHA-256.

- `EI`: listed in the active serial-source snapshot.
- `EI Stop`: present in the official discontinued-source sheet, with final coverage when available.
- no EI badge: not found in the installed snapshot, which is **not** proof of non-indexing.

The official workbook is dynamic and its terms do not clearly grant permission to redistribute a complete or substantial derived list. RankLens provides a local generator so users can rebuild the snapshot themselves; do not publish a generated file without checking Elsevier's current terms or obtaining permission.

## Installation

### Load this enhanced build

1. Download or clone this repository.
2. Open `chrome://extensions` in Chrome or Edge.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the directory containing `manifest.json`.
6. Click **Reload** after updating the source.

### Upstream store listings

The original CCFrank listings are available at the [Chrome Web Store](https://chrome.google.com/webstore/detail/ccfrank/pfcajmbenomfbjnbjhgbnbdjmiklnkie), [Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/ccfrank/), and [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/ccfrank/pboigbpepikdoeindehghnpojjblhjmm). Those upstream listings may not contain the RankLens enhancements in this repository.

## Rebuilding data and assets

```bash
# Apply the CCF 2026 diff
python build/update_ccf_2026.py

# Rebuild CAS/XinRui URL, name, and ISSN indexes
python build/gen_sci_data.py

# Optionally build a local EI snapshot after downloading the official XLSX
python build/gen_ei_data.py path/to/COMPENDEX_Source-list-082026.xlsx

# Regenerate browser icons
python build/make_icon.py
```

Generated files include `data/ccf*.js`, `data/sciRankUrl*.js`, `data/xrRankUrl*.js`, `data/rankNameIdx.js`, and the optional local `data/eiIndex.js`.

## Privacy and network access

Most matching is local. Network requests occur only when local metadata cannot identify a venue:

- dblp: paper-title lookup
- OpenAlex: journal title and ISSN recovery
- Crossref: metadata fallback

Responses used for matching are cached locally for 24 hours. RankLens does not upload browsing history.

## Attribution and license

RankLens is an enhanced fork of [WenyanLiu/CCFrank4dblp](https://github.com/WenyanLiu/CCFrank4dblp). Original authors and contributors retain attribution. See [LICENSE](./LICENSE) and the upstream repository for the complete history.

---

<a id="中文"></a>

# 中文

## 项目简介

**RankLens** 是 [CCFrank](https://github.com/WenyanLiu/CCFrank4dblp) 的增强分支，在论文和期刊/会议标题旁显示多种学术等级徽标：

- **CCF 推荐等级**：A、B、C，已对齐 CCF 2026 目录。
- **中科院期刊分区（SCI）**：1–4 区、Top 标记、大类、排名位次、WoS 收录和预警信息。
- **新锐期刊分区**：1–4 区、Top 标记、大类、数据库覆盖和审核警告。
- **EI Compendex 来源表状态**：仅在本地安装了可追溯的 Elsevier 官方快照后显示。它只表示期刊/论文集出现在该官方来源快照中，**不代表某一篇论文已经被 EI 收录**。

将鼠标悬停在徽标上可以查看详细信息。

## 排名数据与覆盖范围

| 徽标 | 数据来源 | 本地覆盖 |
|---|---|---:|
| `CCF A` … `CCF C` | CCF 推荐目录 2026 | 计算机领域国际期刊与会议 |
| `SCI 1区` … `SCI 4区` | 中科院期刊分区表升级版 2025 | 1,237 个 dblp 映射、21,771 个期刊名称、38,449 个 ISSN |
| `新锐1区` … `新锐4区` | 新锐期刊分区表 2026 | 1,253 个 dblp 映射、22,292 个期刊名称、20,629 个 ISSN、15 个会议 |
| `EI` / `EI Stop` | Elsevier Compendex 官方来源表快照 | 仅在安装本地官方快照后显示 |

中科院和新锐索引覆盖原始数据表中的所有学科，包括医学、材料、化学、生物、管理和经济等。CCF 本身仍然以计算机领域为主。

## 支持的网站

**检索与发现**

- dblp 及镜像
- Google 学术
- Connected Papers
- Semantic Scholar
- Web of Science

**出版社与论文仓库**

- ScienceDirect、SpringerLink、IEEE Xplore、ACM Digital Library
- Wiley Online Library、Taylor & Francis、MDPI、Nature、arXiv

**会议与论文集**

- ACL Anthology、OpenReview、PMLR
- NeurIPS 论文集（`papers.nips.cc`、`proceedings.neurips.cc`）
- CVF Open Access、USENIX、AAAI OJS

## 匹配与回退逻辑

RankLens 按以下优先级使用最可靠的标识：

1. 精确的 dblp 期刊/会议流 URL。
2. 精确的 ISSN/EISSN。
3. 规范化后的完整期刊/会议名称。
4. 对“Proceedings of the 62nd Annual Meeting …”这类论文集标题进行最长唯一包含匹配。
5. 通过论文标题查询 dblp。
6. 对不在 dblp 中的论文，或 Google 学术中被截断成 `Advanced …` 的期刊名，先查询 OpenAlex，再用 Crossref 兜底恢复完整期刊名和 ISSN。

只有在元数据返回论文标题与当前查询标题具有足够词汇重合时才接受结果。成功的元数据响应会在本地缓存 24 小时。

## EI Compendex：仅显示可验证状态

Elsevier 会在 [Engineering Village / Compendex 产品页](https://www.elsevier.com/products/engineering-village/databases/compendex)提供官方 **Compendex Source List** 工作簿。当前官方下载文件类似 `COMPENDEX_Source-list-082026.xlsx`，包含 `SERIALS`、`NON-SERIALS`、`DISCONTINUED` 等工作表。

RankLens 不会把 Scopus、SCI、CCF 或出版社名称推测成 EI。启用可选 EI 徽标的步骤：

1. 从 Elsevier 官方页面自行下载官方工作簿。
2. 执行：

   ```bash
   python build/gen_ei_data.py path/to/COMPENDEX_Source-list-082026.xlsx
   ```

3. 重新加载扩展。

脚本会生成 `data/eiIndex.js`。当前工作区包含一份根据官方工作簿本地生成的快照；在重新分发仓库前，请确认使用和分发行为符合 Elsevier 最新条款，或取得书面许可。文件保存规范化的期刊名称、ISSN、会议论文集 ISBN、工作簿文件名、工作表日期和 SHA-256。徽标含义：

- `EI`：出现在活动的连续出版物来源快照中。
- `EI Stop`：出现在官方停收来源表中；如果官方提供最终收录范围，也会显示该信息。
- 没有 EI 徽标：当前安装的官方快照中没有找到，不等于确认“未被 EI 收录”。

官方工作簿是动态维护的，现有条款没有明确授予完整名单或实质性派生名单的再分发许可。RankLens 提供本地生成器，方便用户自行重建快照；发布生成后的文件前，请确认 Elsevier 最新条款或取得书面许可。

## 安装

### 加载本增强版

1. 下载或克隆本仓库。
2. 在 Chrome 或 Edge 中打开 `chrome://extensions`。
3. 开启 **开发者模式**。
4. 点击 **加载已解压的扩展程序**。
5. 选择包含 `manifest.json` 的目录。
6. 更新源码后，在扩展卡片上点击 **重新加载**。

### 上游应用商店版本

原始 CCFrank 可从 [Chrome 网上应用店](https://chrome.google.com/webstore/detail/ccfrank/pfcajmbenomfbjnbjhgbnbdjmiklnkie)、[Firefox 附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/ccfrank/) 和 [Microsoft Edge 加载项](https://microsoftedge.microsoft.com/addons/detail/ccfrank/pboigbpepikdoeindehghnpojjblhjmm)安装。应用商店中的上游版本可能不包含本仓库的 RankLens 增强功能。

## 数据与资源重建

```bash
# 应用 CCF 2026 更新
python build/update_ccf_2026.py

# 重建中科院/新锐 URL、名称和 ISSN 索引
python build/gen_sci_data.py

# 下载官方 XLSX 后，生成本地 EI 快照索引
python build/gen_ei_data.py path/to/COMPENDEX_Source-list-082026.xlsx

# 重新生成浏览器图标
python build/make_icon.py
```

生成文件包括 `data/ccf*.js`、`data/sciRankUrl*.js`、`data/xrRankUrl*.js`、`data/rankNameIdx.js`，以及可选的本地 `data/eiIndex.js`。

## 隐私与网络请求

大部分匹配在本地完成。只有本地元数据无法识别期刊/会议时才会发起网络请求：

- dblp：按论文标题查询
- OpenAlex：恢复完整期刊名和 ISSN
- Crossref：元数据兜底

用于匹配的响应会在本地缓存 24 小时。RankLens 不上传浏览历史。

## 归属与许可

RankLens 是 [WenyanLiu/CCFrank4dblp](https://github.com/WenyanLiu/CCFrank4dblp) 的增强分支，保留原作者与贡献者署名。完整许可和上游历史见 [LICENSE](./LICENSE) 及上游仓库。
