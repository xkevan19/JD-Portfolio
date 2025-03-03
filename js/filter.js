document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const columnButtons = document.querySelectorAll(".column-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const allFilterButton = document.querySelector("[data-category='all']"); // The "All" filter button
  const filterNav = document.getElementById("filter-nav"); // Bottom filter nav

  // Function to check and update visibility of column buttons and the "All" filter button based on screen size
  function updateVisibility() {
    const screenWidth = window.innerWidth;

    // Hiding the "All" filter button on mobile
    if (screenWidth < 640) {
      if (allFilterButton) {
        allFilterButton.style.display = "none";
      }
      // Add more space to the bottom bar on mobile
      filterNav.style.paddingTop = "40px"; // Increase padding on mobile
    } else {
      if (allFilterButton) {
        allFilterButton.style.display = "inline-block"; // Show "All" button on larger screens
      }
      // Reset padding when not on mobile
      filterNav.style.paddingBottom = "30px"; // Default padding
    }

    // Column Buttons Visibility Logic (Already discussed)
    if (screenWidth < 640) {
      // Hide 5 and 6 column buttons on mobile
      document.querySelector("[data-columns='5']").style.display = "none";
      document.querySelector("[data-columns='6']").style.display = "none";
      // Default to 2 columns on mobile
      gallery.className = "columns-2 gap-6 space-y-6";
    } else {
      // Show 5 and 6 column buttons on larger screens
      document.querySelector("[data-columns='5']").style.display =
        "inline-block";
      document.querySelector("[data-columns='6']").style.display =
        "inline-block";
      // Default to 4 columns on large screens
      if (!localStorage.getItem("gallery-columns")) {
        gallery.className = "columns-4 gap-6 space-y-6";
      }
    }
  }

  // Check for saved preferences in localStorage and apply them
  const savedColumns = localStorage.getItem("gallery-columns");
  if (savedColumns) {
    gallery.className = `columns-${savedColumns} gap-6 space-y-6`;
  }

  // Initial visibility check
  updateVisibility();

  // Column View Toggle
  columnButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const columns = button.getAttribute("data-columns");
      gallery.className = `columns-${columns} gap-6 space-y-6`;

      // Save the user's column preference in localStorage
      localStorage.setItem("gallery-columns", columns);
    });
  });

  // Filter Buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Add/remove active class for buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Implement filtering logic
      filterGallery(category);
    });
  });

  function filterGallery(category) {
    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item) => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Listen for window resize to update visibility dynamically
  window.addEventListener("resize", updateVisibility);
});
