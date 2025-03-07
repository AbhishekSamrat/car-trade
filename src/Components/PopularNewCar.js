import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PopularNewCars = ({ products }) => {
  return (
    <section className="py-10 px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Popular New Cars</h2>
        <p className="text-gray-500 mt-2">
          Discover the latest and most popular cars available.
        </p>
      </div>

      {/* Swiper Slider */}
      <div className="mt-8 relative max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 1 }, // Mobile
            768: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 }, // Small desktop
            1280: { slidesPerView: 4 }, // Large desktop (4 columns)
          }}
          className="pb-10"
        >
          {products.map((car) => (
            <SwiperSlide key={car._id}>
              <div className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-full h-56 flex justify-center items-center">
                  <img
                    src={car.image}
                    alt={car.brand}
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-3">{car.name}</h3>
                <p className="text-gray-600">Brand: {car.brand}</p>
                <p className="text-gray-500">Model: {car.model}</p>
                <p className="text-blue-600 font-semibold text-lg mt-2">
                  $ {car.price ? Number(car.price).toLocaleString() : "N/A"}
                </p>

                <Link
                  className="mt-5 block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition text-center"
                  to={`/product/${car._id}`}
                >
                  View Details
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
          <button className="swiper-button-prev bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700">
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
          <button className="swiper-button-next bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularNewCars;
