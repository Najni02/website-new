
  const swiper = new Swiper(".swiper", {
    centeredSlides: true,
    slidesPerView: 1.5,  // Slides passen sich an
    spaceBetween: 500,
    grabCursor: true,
    loop: true,
    effect: "coverflow",

    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 500,
      modifier: 1,
      slideShadows: false,
    },
  //  breakpoints: {
  //    320: { slidesPerView: 1.1 },
  //    640: { slidesPerView: 1.5 },
  //    1024: { slidesPerView: 2.5 },
  //  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination"
  }
  });

