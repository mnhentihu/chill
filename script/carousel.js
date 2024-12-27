document.addEventListener("DOMContentLoaded", () => {
  fetch("script/landscape.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const carouselContainer = document.getElementById("carousel-container");

      data.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide realtive w-fit";
        slide.innerHTML = `
            <img
              src="${item.image}"
              alt="${item.title}"
              class="rounded-lg h-44 sm:h-32 object-cover w-[310px] sm:w-full"
            />
            <div
              class="flex justify-between items-end absolute inset-0 px-3 py-3.5 bg-gradient-to-t from-primary/80 to-transparent"
            >
              <span class="text-sm sm:text-sm">${item.title}</span>
              <span
                class="flex justify-center items-center gap-1 font-light text-xs sm:text-sm"
              >
                <span class="iconify" data-icon="material-symbols:star"></span>
                ${item.rating}/5
              </span>
            </div>
          `;
        carouselContainer.appendChild(slide);
      });

      new Swiper(".swiperLandscape", {
        slidesPerView: "auto",
        spaceBetween: 20,
        navigation: {
          nextEl: ".next",
          prevEl: ".prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 4,
            spaceBetweenSlides: 20,
          },
        },
      });
    })
    .catch((error) => console.error("Error loading JSON data:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("script/potrait.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const currentDate = new Date();
      const sixMonthsAgo = new Date(currentDate);
      sixMonthsAgo.setMonth(currentDate.getMonth() - 6); // mengambil data 6 bulan terakhir

      const topByRating = data.sort((a, b) => b.rating - a.rating).slice(0, 10);
      const topByRank = data.sort((a, b) => a.rank - b.rank).slice(0, 10);
      const topByUpdate = data
        .filter((item) => {
          const itemUpdateDate = new Date(item.update_at);
          return itemUpdateDate > sixMonthsAgo;
        })
        .slice(0, 10);

      // Ensure no duplicates by comparing unique IDs
      const topByUpdateIds = topByUpdate.map((item) => item.id); // Use item.id as a unique identifier
      const topByRankIds = topByRank.map((item) => item.id);

      // Function to create each carousel
      const createCarousel = (title, data, containerId) => {
        const container = document.createElement("div");
        container.className = "mb-10";

        // Create custom category title (h1)
        const h1 = document.createElement("h1");
        h1.className = "text-xl sm:text-3xl font-bold my-4 sm:my-10";
        h1.innerText = title;
        container.appendChild(h1);

        // Create swiper container
        const swiperContainer = document.createElement("div");
        swiperContainer.className = "swiper swiperPotrait";

        const swiperWrapper = document.createElement("div");
        swiperWrapper.className = "swiper-wrapper";

        data.forEach((item) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide relative w-fit";

          // mengecek apakah ada file yang duplikat
          const isTop10ByRank = topByRankIds.includes(item.id);
          const isTop10ByUpdate = topByUpdateIds.includes(item.id);

          slide.innerHTML = `
                <img
                  src="${item.image}"
                  alt="${item.title}"
                  class="rounded-lg h-44 sm:h-96 w-24 sm:w-full object-cover"
                />
                ${
                  isTop10ByUpdate &&
                  item.category === "series" &&
                  !isTop10ByRank
                    ? // Menampilkan Episode baru untuk kategori Series
                      `<div class="absolute inset-0 sm:inset-2 px-1.5 py-1 mt-2 ml-2 w-fit h-fit bg-button text-[8px] sm:text-sm rounded-full">
                    Episode Baru
                  </div>`
                    : isTop10ByRank
                    ? // Menampilkan top 10
                      `<div class="flex flex-col justify-center text-center absolute right-2 top-0 px-1.5 py-1 text-[8px] sm:text-sm bg-red-700 rounded-tr-lg rounded-bl-lg">
                      <span>Top</span>
                      <span>10</span>
                  </div>`
                    : ""
                }
              `;
          swiperWrapper.appendChild(slide);
        });

        swiperContainer.appendChild(swiperWrapper);
        container.appendChild(swiperContainer);

        // If needed, add navigation buttons
        const prevBtn = document.createElement("div");
        prevBtn.className =
          "prev absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 hidden sm:flex items-center justify-center z-10 cursor-pointer hover:bg-white hover:text-black";
        prevBtn.innerHTML =
          '<span class="iconify" data-icon="ant-design:arrow-left-outlined" data-width="24" data-height="24"></span>';
        swiperContainer.appendChild(prevBtn);

        const nextBtn = document.createElement("div");
        nextBtn.className =
          "next absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 hidden sm:flex items-center justify-center z-10 cursor-pointer hover:bg-white hover:text-black";
        nextBtn.innerHTML =
          '<span class="iconify" data-icon="ant-design:arrow-right-outlined" data-width="24" data-height="24"></span>';
        swiperContainer.appendChild(nextBtn);

        // Append to the main container
        document.getElementById(containerId).appendChild(container);
      };

      // Generate 3 carousels based on data categories
      createCarousel(
        "Top Rating Film dan Series Hari ini",
        topByRating,
        "potrait-carousel-container"
      );
      createCarousel("Film Trending", topByRank, "potrait-carousel-container");
      createCarousel("Rilis Baru", topByUpdate, "potrait-carousel-container");

      // Initialize Swiper for all carousels
      new Swiper(".swiperPotrait", {
        slidesPerView: "auto",
        spaceBetween: 20,
        navigation: {
          nextEl: ".next",
          prevEl: ".prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 5,
            spaceBetweenSlides: 20,
          },
        },
      });
    })
    .catch((error) => console.error("Error loading JSON data:", error));
});
