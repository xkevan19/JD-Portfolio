document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const columnButtons = document.querySelectorAll(".column-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const allFilterButton = document.querySelector("[data-category='all']");
  const filterNav = document.getElementById("filter-nav");

  function updateVisibility() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 640) {
      allFilterButton?.classList.add("hidden");
      filterNav.style.paddingTop = "40px";
    } else {
      allFilterButton?.classList.remove("hidden");
      filterNav.style.paddingTop = "0";
    }

    const columns5 = document.querySelector("[data-columns='5']");
    const columns6 = document.querySelector("[data-columns='6']");

    if (screenWidth < 640) {
      columns5?.classList.add("hidden");
      columns6?.classList.add("hidden");
      gallery.className = "columns-2 gap-6 space-y-6";
    } else {
      columns5?.classList.remove("hidden");
      columns6?.classList.remove("hidden");
      if (!localStorage.getItem("gallery-columns")) {
        gallery.className = "columns-4 gap-6 space-y-6";
      }
    }
  }

  const savedColumns = localStorage.getItem("gallery-columns");
  if (savedColumns) {
    gallery.className = `columns-${savedColumns} gap-6 space-y-6`;
  }

  updateVisibility();

  columnButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const columns = button.getAttribute("data-columns");
      gallery.className = `columns-${columns} gap-6 space-y-6`;
      localStorage.setItem("gallery-columns", columns);
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      filterGallery(category);
    });
  });

  function filterGallery(category) {
    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item) => {
      if (category === "all" || item.classList.contains(category)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  window.addEventListener("resize", updateVisibility);
});
