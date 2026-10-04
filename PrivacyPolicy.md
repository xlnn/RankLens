# RankLens Privacy Policy

## English

RankLens reads visible search results and venue metadata on supported pages to place local ranking badges next to papers and venues.

### Data used

- Page titles, venue names, citation metadata, ISSN/EISSN, ISBN, author names, and publication years may be read locally.
- Local ranking indexes contain CCF, CAS/Sci, XinRui, and (when the user generates it) an Elsevier Compendex source-list snapshot.
- RankLens does not collect browsing history, account credentials, full page contents, or personal profiles.

### Network requests

Most matches are completed locally. When a paper is not present in dblp or Google Scholar truncates the venue name, RankLens may send the paper title to DBLP, OpenAlex, or Crossref for the lookup flows described in the README. These requests are made directly by the extension to the named service. Responses used for matching are cached locally for 24 hours. RankLens does not operate an analytics server and does not upload browsing history to the project authors.

If you generate `data/eiIndex.js`, the file is produced locally from an Elsevier Compendex Source List workbook that you download yourself. The workbook and its derived data remain subject to Elsevier's terms. RankLens does not ship the official workbook by default.

### Permissions

The extension requests access to supported search, publisher, proceedings, and DBLP pages so that it can read venue metadata and insert badges. DBLP, OpenAlex, and Crossref are used only for the lookup flows described above.

### Third-party policies

- [Google Privacy Policy](https://policies.google.com/privacy)
- [Elsevier Engineering Village / Compendex](https://www.elsevier.com/products/engineering-village/databases/compendex)
- [OpenAlex](https://openalex.org/)
- [Crossref](https://www.crossref.org/)

---

## 中文

RankLens 会读取受支持网页中的可见检索结果和期刊/会议元数据，在论文或刊物标题旁显示本地排名徽标。

### 使用的数据

- 页面标题、期刊/会议名称、citation 元数据、ISSN/EISSN、ISBN、作者名和发表年份可能会在本地读取。
- 本地排名索引包含 CCF、中科院/SCI、新锐分区，以及用户自行生成的 EI Compendex 官方来源表快照（如果用户启用）。
- RankLens 不收集浏览历史、账户凭据、完整网页内容或个人画像。

### 网络请求

大多数匹配在本地完成。当论文不在 dblp 中，或 Google 学术截断了期刊名时，RankLens 可能会把论文标题发送给 DBLP、OpenAlex 或 Crossref，用于 README 中说明的匹配流程。请求由扩展直接发送给对应服务。用于匹配的响应在本地缓存 24 小时。RankLens 不运行分析服务器，也不会把浏览历史上传给项目作者。

如果生成 `data/eiIndex.js`，该文件来自用户自行下载的 Elsevier Compendex Source List 工作簿。工作簿及其派生数据受 Elsevier 条款约束；RankLens 默认不随扩展分发官方工作簿。

### 权限说明

扩展需要访问支持的搜索网站、出版社页面、会议论文集页面和 dblp 页面，以读取期刊/会议元数据并插入徽标。DBLP、OpenAlex 和 Crossref 仅用于上述匹配流程。

### 第三方政策

- [Google 隐私政策](https://policies.google.com/privacy)
- [Elsevier Engineering Village / Compendex](https://www.elsevier.com/products/engineering-village/databases/compendex)
- [OpenAlex](https://openalex.org/)
- [Crossref](https://www.crossref.org/)
