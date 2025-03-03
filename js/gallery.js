document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const gallery = document.getElementById("gallery");

  // Create Lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className =
    "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center hidden";
  document.body.appendChild(lightbox);

  const lightboxImg = document.createElement("img");
  lightboxImg.id = "lightbox-img";
  lightboxImg.className =
    "max-w-full max-h-[90vh] rounded-lg shadow-lg transform scale-0 transition-transform duration-300";
  lightbox.appendChild(lightboxImg);

  const lightboxClose = document.createElement("button");
  lightboxClose.id = "lightbox-close";
  lightboxClose.className = "absolute top-5 right-5 text-white text-3xl";
  lightboxClose.innerHTML = "&times;";
  lightbox.appendChild(lightboxClose);

  // Fetch Images
  fetch("img/gallery.json")
    .then((response) => response.json())
    .then((images) => {
      images.forEach((image) => {
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("photo-wrapper");

        const imgElement = document.createElement("img");
        imgElement.src = image.src;
        imgElement.alt = "Portfolio Image";
        imgElement.classList.add(
          "photo",
          "w-full",
          "rounded-lg",
          "shadow-md",
          "bg-gray-900",
          "cursor-pointer",
          "transition-all",
          "duration-100"
        );
        imgElement.setAttribute("data-category", image.category);

        // Tilt Effect - Optimized for Speed
        imgElement.addEventListener("mousemove", (e) => {
          const { offsetX, offsetY, target } = e;
          const { offsetWidth, offsetHeight } = target;

          const rotateX = (offsetY / offsetHeight - 0.5) * 20;
          const rotateY = (offsetX / offsetWidth - 0.5) * -20;

          target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        imgElement.addEventListener("mouseleave", () => {
          imgElement.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
        });

        imgElement.addEventListener("mouseenter", () => {
          //imgElement.style.boxShadow = "0 0 20px #ff57c7, 0 0 40px #00ffff";

          // Apply blur only to other elements in the gallery, not the hovered image
          document.querySelectorAll(".photo-wrapper").forEach((wrapper) => {
            if (wrapper !== imgElement.parentElement) {
              wrapper.classList.add("blur-effect");
            }
          });
        });

        imgElement.addEventListener("mouseleave", () => {
          imgElement.style.boxShadow = "";

          // Remove blur from all other images when hover ends
          document.querySelectorAll(".photo-wrapper").forEach((wrapper) => {
            wrapper.classList.remove("blur-effect");
          });
        });

        // Lightbox Click Event
        imgElement.addEventListener("click", () => {
          if (!imgElement.classList.contains("hidden")) {
            lightboxImg.src = imgElement.src;
            lightbox.classList.remove("hidden");
            setTimeout(() => {
              lightboxImg.classList.remove("scale-0");
              lightboxImg.classList.add("scale-100");
            }, 50);
          }
        });

        imgWrapper.appendChild(imgElement);
        gallery.appendChild(imgWrapper);
      });

      // Filtering Logic
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const category = button.getAttribute("data-category");

          buttons.forEach((btn) =>
            btn.classList.remove("active", "bg-red-500")
          );
          button.classList.add("active", "bg-red-500");

          document.querySelectorAll(".photo").forEach((photo) => {
            if (
              category === "all" ||
              photo.getAttribute("data-category") === category
            ) {
              photo.classList.remove("hidden");
            } else {
              photo.classList.add("hidden");
            }
          });
        });
      });

      // Lightbox Close Events
      lightboxClose.addEventListener("click", () => {
        lightboxImg.classList.add("scale-0");
        setTimeout(() => {
          lightbox.classList.add("hidden");
        }, 200);
      });

      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
          lightboxImg.classList.add("scale-0");
          setTimeout(() => {
            lightbox.classList.add("hidden");
          }, 200);
        }
      });
    })
    .catch((error) => {
      console.error("Error loading image data:", error);
    });
});
