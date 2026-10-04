/**
 * MIT License
 *
 * Copyright (c) 2019-2024 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const filter = {
  currentFilter: "ALL",
  processedEntries: new Set(),
  MAX_PROCESSED_ENTRIES: 1000,

  init() {
    if (!window.location.hostname.startsWith("dblp")) {
      return;
    }

    this.createFilterButtons();
    this.bindEvents();
    this.setupInfiniteScrollHandler();
  },

  createFilterButtons() {
    const filterDiv = document.createElement("div");
    filterDiv.className = "ccf-filter";
    filterDiv.innerHTML = `
      <button data-rank="ALL" class="active">ALL</button>
      <button data-rank="A">CCF A</button>
      <button data-rank="B">CCF B</button>
      <button data-rank="C">CCF C</button>
      <button data-rank="S1">SCI 1区</button>
      <button data-rank="S12">SCI 1-2区</button>
      <button data-rank="X1">新锐1区</button>
    `;
    document.body.appendChild(filterDiv);
  },

  setupInfiniteScrollHandler() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.applyFilter(true);
        }
      });
    });

    const trigger = document.querySelector("#completesearch-publs");
    if (trigger) {
      observer.observe(trigger);
    }

    window.addEventListener(
      "scroll",
      this.debounce(() => {
        this.applyFilter(true);
      }, 200),
    );
  },

  applyFilter(preserveExisting = false) {
    const entries = document.querySelectorAll(
      "#completesearch-publs > div > ul > li",
    );
    entries.forEach((entry) => {
      const link = entry.querySelector("a");
      const entryId = (link && link.href) || entry.innerHTML;
      if (this.processedEntries.has(entryId) && preserveExisting) {
        return;
      }

      this.processedEntries.add(entryId);

      if (this.processedEntries.size > this.MAX_PROCESSED_ENTRIES) {
        const firstKey = this.processedEntries.values().next().value;
        this.processedEntries.delete(firstKey);
      }

      const text = entry.textContent;
      const hasCCFC = text.includes("CCF C");
      const hasCCFB = text.includes("CCF B");
      const hasCCFA = text.includes("CCF A");
      const hasSCI1 = text.includes("SCI 1区");
      const hasSCI2 = text.includes("SCI 2区");
      const hasXR1 = text.includes("新锐1区");

      let shouldShow = false;

      if (this.currentFilter === "ALL") {
        shouldShow = true;
      } else if (this.currentFilter === "C" && hasCCFC) {
        shouldShow = true;
      } else if (this.currentFilter === "B" && hasCCFB) {
        shouldShow = true;
      } else if (this.currentFilter === "A" && hasCCFA) {
        shouldShow = true;
      } else if (this.currentFilter === "S1" && hasSCI1) {
        shouldShow = true;
      } else if (this.currentFilter === "S12" && (hasSCI1 || hasSCI2)) {
        shouldShow = true;
      } else if (this.currentFilter === "X1" && hasXR1) {
        shouldShow = true;
      }

      const currentlyVisible = entry.style.display !== "none";
      if (currentlyVisible !== shouldShow || !preserveExisting) {
        entry.style.display = shouldShow ? "" : "none";
      }
    });
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  bindEvents() {
    document.querySelector(".ccf-filter").addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        document.querySelectorAll(".ccf-filter button").forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");

        this.currentFilter = e.target.dataset.rank;
        this.applyFilter(false);
      }
    });
  },
};
