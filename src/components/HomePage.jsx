import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import bomb from "../images/bomb.png";
import thustedimg from "../images/thrustedimg2.png";
import heart from "../images/wishlist.svg";
import LazyImage from "./LazyImage";
import LazyloaderImage from "./LazyloaderImage";

function HomePage({ data }) {
  const initialTime = 15 * 60;
  const [time, setTime] = useState(initialTime);
  const [activebanner, setActivebanner] = useState(0);
  const [homeimagesilder, setHomeimagesilder] = useState([]);
  const [homepagebigbannersilder, setHomepagebigbannersilder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : initialTime));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/slider-config.json")
      .then((r) => r.json())
      .then((config) => {
        setHomeimagesilder(config.topSlider || []);
        setHomepagebigbannersilder(config.bigBannerSlider || []);
      })
      .catch((e) => console.error("Slider config error:", e));
  }, []);

  const formatTime = (seconds) => ({
    min: String(Math.floor(seconds / 60)).padStart(2, "0"),
    sec: String(seconds % 60).padStart(2, "0"),
  });

  const openProduct = (product) => {
    navigate(
      "/productdetails/" +
        product.id +
        "/" +
        encodeURIComponent(product.title || "product")
    );
  };

  return (
    <main className="min-h-screen bg-[#f6f6f8]">
      <div className="mx-auto w-full max-w-[1280px] bg-white">

        {/* {homeimagesilder.length > 0 && (
          <section className="border-b border-gray-100 px-2 py-3 md:px-5">
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 14 },
                900: { slidesPerView: 9, spaceBetween: 16 },
                1200: { slidesPerView: 11, spaceBetween: 18 },
              }}
            >
              {homeimagesilder.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="flex justify-center">
                    <LazyImage
                      src={img}
                      className="h-[64px] w-[64px] rounded-full object-cover md:h-[72px] md:w-[72px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )} */}

        {homepagebigbannersilder.length > 0 && (
          <section className="py-2">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={homepagebigbannersilder.length > 1}
              slidesPerView={1}
              onSlideChange={(swiper) => setActivebanner(swiper.realIndex)}
            >
              {homepagebigbannersilder.map((img, i) => (
                <SwiperSlide key={i}>
                  <LazyImage
                    src={img}
                    className="block h-auto max-h-[350px] w-full object-cover md:object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-2 flex justify-center gap-1.5">
              {homepagebigbannersilder.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full ${
                    activebanner === i
                      ? "w-4 bg-[#9f2089]"
                      : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </section>
        )}

        <div className="bg-[#570d48] px-3 py-2 text-center text-[13px] font-medium text-white md:text-[15px]">
          Buy 2 Get 1 Free (Add 3 item to cart)
        </div>

        <section className="border-b border-gray-100 px-3 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="text-[18px] font-bold text-[#353543] md:text-[21px]">
              Daily Deals ⚡
            </h2>

            <div className="inline-flex h-[25px] items-center rounded-md border border-orange-400 bg-orange-100 px-2">
              <LazyImage src={bomb} className="h-4 w-4 object-contain" />
              <span className="ml-1 text-[12px] font-semibold text-[#570d48]">
                00h : {formatTime(time).min}m : {formatTime(time).sec}s
              </span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between border-b border-gray-100 px-3 py-4 md:px-5">
            <h1 className="text-[18px] font-semibold text-[#353543] md:text-[22px]">
              Products For You
            </h1>
            <span className="hidden text-[12px] text-gray-500 md:block">
              {data?.length || 0} Products
            </span>
          </div>

          <div className="grid grid-cols-2 bg-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data?.map((product, index) => (
              <article
                key={product?.id || index}
                onClick={() => openProduct(product)}
                className="group relative cursor-pointer border-b border-r border-gray-200 bg-white p-2.5 hover:z-10 hover:shadow-md md:p-3"
              >
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm"
                >
                  <img src={heart} alt="" className="h-[18px] w-[18px]" />
                </button>

                <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-[#fafafa]">
                  <LazyloaderImage
                    src={product?.image?.[0]}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="pt-2.5">
                  <p className="truncate text-[12px] text-[#616173] md:text-[13px]">
                    {product?.title}
                  </p>

                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[17px] font-bold text-[#353543] md:text-[19px]">
                      ₹{product?.price}
                    </span>

                    {product?.cancelprice && (
                      <span className="text-[11px] text-gray-400 line-through md:text-[12px]">
                        ₹{product.cancelprice}
                      </span>
                    )}
                  </div>

                  <span className="mt-2 inline-block rounded-full bg-[#f5f5f5] px-2 py-1 text-[10px] font-medium text-[#616173] md:text-[11px]">
                    Free Delivery
                  </span>

                  <div className="mt-2 flex min-h-[24px] items-center justify-between gap-1">
                    <div className="flex min-w-0 items-center">
                      <span className="inline-flex items-center rounded-full bg-[#038d63] px-1.5 py-[3px] text-[11px] font-semibold text-white md:text-[12px]">
                        {product?.rate || "4.2"}
                        <span className="ml-1 text-[9px]">★</span>
                      </span>

                      <span className="ml-1 truncate text-[10px] text-gray-400 md:text-[11px]">
                        ({product?.ratenum?.toLocaleString?.() || "1,234"})
                      </span>
                    </div>

                    <img
                      src={thustedimg}
                      alt=""
                      className="h-[18px] max-w-[55px] object-contain md:h-[21px]"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
