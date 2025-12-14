import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const Slider = () => {
  // Slider Data Array(3)
  const slides = [
    {
      id: 1,
      title: "Discover Amazing Books",
      description: "Find hand-picked books from your favorite authors.",
      img: "https://i.ibb.co/hJHYLDCp/slider3-1.jpg",
    },
    {
      id: 2,
      title: "New Arrivals Every Week",
      description: "Explore newly added books and trending stories.",
      img: "https://i.ibb.co/KjjFWyBq/slider1-2.jpg",
    },
    {
      id: 3,
      title: "Read Smart, Live Better",
      description: "Upgrade your reading experience with BookCourier.",
      img: "https://i.ibb.co/tMWNSd3Z/slider3-2.jpg",
    },
  ];

  return (
    <div className="my-14 px-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Keyboard, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="card bg-base-100 image-full shadow-sm">
              <figure>
                <img
                  src={slide?.img}
                  alt="Image"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">{slide?.title }</h2>
                <p>
                  {slide?.description}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/books`}
                    className="btn btn-primary">All Books</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
