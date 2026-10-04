RankLens Website

包含：
- docs/index.html
- docs/styles.css
- docs/app.js
- .github/workflows/pages.yml

推荐放入现有 RankLens 仓库根目录，然后执行：

git add docs .github/workflows/pages.yml
git commit -m "Add RankLens website"
git push origin main

接着进入 GitHub：
Settings -> Pages

如果使用本包内 workflow：
Source 选择 GitHub Actions。

公开访问地址通常为：
https://xlnn.github.io/RankLens/
