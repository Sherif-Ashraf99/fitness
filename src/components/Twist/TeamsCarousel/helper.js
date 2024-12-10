export const settings = {
  arrows: true,
  infinite: false,
  speed: 1200,
  slidesToShow: 15,
  slidesToScroll: 15,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 10,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
  ],
};
