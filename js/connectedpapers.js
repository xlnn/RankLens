/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), purplewall1206 (https://github.com/purplewall1206), mra42 (https://github.com/mra42)
 */

const connectedpapers = {};

connectedpapers.rankSpanList = [];
connectedpapers._processed = new WeakSet();
connectedpapers._mainProcessed = new WeakSet();
connectedpapers._pollInterval = null;

connectedpapers.run = function () {
  connectedpapers._pollInterval = setInterval(function () {
    if (window.location.pathname.indexOf("/main") != -1) {
      connectedpapers.appendRank();
      connectedpapers.appendRanks();
    }
  }, 700);
};

connectedpapers.stop = function () {
  if (connectedpapers._pollInterval !== null) {
    clearInterval(connectedpapers._pollInterval);
    connectedpapers._pollInterval = null;
  }
};

connectedpapers.appendRank = function () {
  let element = $(".list-group-item-mod.minilist-main-paper.main");
  if (!element.length || connectedpapers._mainProcessed.has(element[0])) return;
  let nodes = element.find(".horizontal-flexbox");
  let titlenode = nodes[1];
  let datanode = $(nodes[2]).find("div");
  if (!titlenode || !datanode.length) return;
  connectedpapers._mainProcessed.add(element[0]);

  let title = titlenode.innerText;
  let author = datanode[0].innerText.split(/[\s.,]+/)[1];
  let year = datanode[1] ? datanode[1].innerText : "";
  fetchRank($(titlenode).find("h5"), title, author, year, connectedpapers);
};

connectedpapers.appendRanks = function () {
  let elements = $(".list-group-item-mod.minilist-list-entry");
  elements.each(function (index) {
    if (connectedpapers._processed.has(this)) return;
    let nodes = $(this).find(".horizontal-flexbox");
    let titlenode = nodes[0];
    let datanode = $(nodes[1]).find("div");
    if (!titlenode || !datanode.length) return;
    connectedpapers._processed.add(this);

    let title = titlenode.innerText;
    let author = datanode[0].innerText.split(/[\s.,]+/)[1];
    let year = datanode[1] ? datanode[1].innerText : "";
    setTimeout(function () {
      fetchRank($(titlenode).find("h5"), title, author, year, connectedpapers);
    }, 100 * index);
  });
};
