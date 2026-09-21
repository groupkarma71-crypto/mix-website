import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

/* =========================================================
   CATEGORY SETTINGS
========================================================= */

const CATEGORY_CONFIG = {
  "women-ethnic": {
    name: "Women Ethnic",
    saleText: "ETHNIC SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/women-ethnic-1.webp",
      "/category-banners/women-ethnic-2.webp",
      "/category-banners/women-ethnic-3.webp",
    ],
  },

  "women-western": {
    name: "Women Western",
    saleText: "WESTERN WEAR SALE • UP TO 70% OFF",
    banners: [
      "https://i.ytimg.com/vi/hdQRWbXPvvQ/maxresdefault.jpg",
      "https://mulmul.com/cdn/shop/files/4_58f7751c-8e4a-4cab-b9a9-011625389c3f.jpg?v=1746424016&width=1880",
    ],
  },

  men: {
    name: "Men",
    saleText: "MEN'S FASHION SALE • UP TO 70% OFF",
    banners: [
      "https://vitalclothing.in/cdn/shop/files/WhatsApp_Image_2026-02-19_at_10.03.45_AM.jpg?v=1771475718&width=1366",
      "https://www.reprise.co.in/cdn/shop/files/ChatGPT_Image_Jun_10_2026_08_10_37_PM.png?v=1781102454",
      "https://uspoloassn.in/cdn/shop/files/DESKTOP_BANNER__1.2.png?v=1782720519&width=1500",
      "https://bepositiveclothing.in/cdn/shop/files/37_1.png?v=1782302087&width=1200",
    ],
  },

  kids: {
    name: "Kids",
    saleText: "KIDS FASHION SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/kids-1.webp",
      "/category-banners/kids-2.webp",
      "/category-banners/kids-3.webp",
    ],
  },

  "home-kitchen": {
    name: "Home & Kitchen",
    saleText: "HOME & KITCHEN SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/home-kitchen-1.webp",
      "/category-banners/home-kitchen-2.webp",
      "/category-banners/home-kitchen-3.webp",
    ],
  },

  "beauty-health": {
    name: "Beauty & Health",
    saleText: "BEAUTY SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/beauty-1.webp",
      "/category-banners/beauty-2.webp",
      "/category-banners/beauty-3.webp",
    ],
  },

  "jewellery-accessories": {
    name: "Jewellery & Accessories",
    saleText: "JEWELLERY SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/jewellery-1.webp",
      "/category-banners/jewellery-2.webp",
      "/category-banners/jewellery-3.webp",
    ],
  },

  "bags-footwear": {
    name: "Bags & Footwear",
    saleText: "BAGS & FOOTWEAR • UP TO 70% OFF",
    banners: [
      "/category-banners/bags-1.webp",
      "/category-banners/bags-2.webp",
      "/category-banners/bags-3.webp",
    ],
  },

  electronics: {
    name: "Electronics",
    saleText: "ELECTRONICS SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/electronics-1.webp",
      "/category-banners/electronics-2.webp",
      "/category-banners/electronics-3.webp",
    ],
  },
};

/* =========================================================
   CATEGORY PAGE
========================================================= */

function CategoryPage({ data = [] }) {
  const { category } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(60 * 60 + 37 * 60 + 58);

  const [activeBanner, setActiveBanner] = useState(0);

  const config = CATEGORY_CONFIG[category] || {
    name: "Products",
    saleText: "LAST DAY SALE • BEST PRICES",
    banners: [],
  };

  /* =========================================================
     SCROLL TOP
  ========================================================= */

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveBanner(0);
  }, [category]);

  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    setTimeLeft(60 * 60 + 37 * 60 + 58);

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          return 60 * 60 + 37 * 60 + 58;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [category]);

  const hours = String(
    Math.floor(timeLeft / 3600)
  ).padStart(2, "0");

  const minutes = String(
    Math.floor((timeLeft % 3600) / 60)
  ).padStart(2, "0");

  const seconds = String(
    timeLeft % 60
  ).padStart(2, "0");

  /* =========================================================
     CATEGORY DETECTION
  ========================================================= */

  const normalizeCategory = (value) => {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-");
  };

  const getProductCategory = (product) => {
    const savedCategory = normalizeCategory(
      product?.category
    );

    const allowedCategories = [
      "women-ethnic",
      "women-western",
      "men",
      "kids",
      "home-kitchen",
      "beauty-health",
      "jewellery-accessories",
      "bags-footwear",
      "electronics",
    ];

    if (
      allowedCategories.includes(
        savedCategory
      )
    ) {
      return savedCategory;
    }

    const text = `
      ${product?.title || ""}
      ${product?.desc || ""}
    `.toLowerCase();

    /* MEN */

    if (
      text.includes("men's") ||
      text.includes("mens ") ||
      text.includes("for men") ||
      text.includes("men shirt") ||
      text.includes("men jacket") ||
      text.includes("men kurta") ||
      text.includes("men tshirt") ||
      text.includes("men t-shirt") ||
      text.includes("polo")
    ) {
      return "men";
    }

    /* WOMEN ETHNIC */

    if (
      text.includes("kurti") ||
      text.includes("kurta set") ||
      text.includes("saree") ||
      text.includes("lehenga") ||
      text.includes("dupatta") ||
      text.includes("ethnic") ||
      text.includes("chanderi") ||
      text.includes("salwar") ||
      text.includes("suit set") ||
      text.includes("anarkali")
    ) {
      return "women-ethnic";
    }

    /* WOMEN WESTERN */

    if (
      text.includes("women") ||
      text.includes("woman") ||
      text.includes("ladies") ||
      text.includes("western") ||
      text.includes("crop top") ||
      text.includes("women dress") ||
      text.includes("women jacket") ||
      text.includes("women hoodie")
    ) {
      return "women-western";
    }

    /* KIDS */

    if (
      text.includes("kids") ||
      text.includes("kid ") ||
      text.includes("baby") ||
      text.includes("boys") ||
      text.includes("girls")
    ) {
      return "kids";
    }

    /* HOME */

    if (
      text.includes("kitchen") ||
      text.includes("home decor") ||
      text.includes("bedsheet") ||
      text.includes("curtain") ||
      text.includes("pillow") ||
      text.includes("storage")
    ) {
      return "home-kitchen";
    }

    /* BEAUTY */

    if (
      text.includes("beauty") ||
      text.includes("makeup") ||
      text.includes("lipstick") ||
      text.includes("face wash") ||
      text.includes("serum") ||
      text.includes("shampoo") ||
      text.includes("skin care")
    ) {
      return "beauty-health";
    }

    /* JEWELLERY */

    if (
      text.includes("jewellery") ||
      text.includes("jewelry") ||
      text.includes("necklace") ||
      text.includes("earring") ||
      text.includes("bracelet") ||
      text.includes("bangle")
    ) {
      return "jewellery-accessories";
    }

    /* BAGS */

    if (
      text.includes("bag") ||
      text.includes("handbag") ||
      text.includes("shoes") ||
      text.includes("sandal") ||
      text.includes("slipper") ||
      text.includes("footwear")
    ) {
      return "bags-footwear";
    }

    /* ELECTRONICS */

    if (
      text.includes("electronic") ||
      text.includes("earphone") ||
      text.includes("headphone") ||
      text.includes("charger") ||
      text.includes("speaker") ||
      text.includes("smart watch")
    ) {
      return "electronics";
    }

    return "other";
  };

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = data.filter(
    (product) =>
      getProductCategory(product) ===
      category
  );

  /* =========================================================
     PRODUCT CLICK
  ========================================================= */

  const openProduct = (product) => {
    navigate(
      `/productdetails/${
        product?.id
      }/${encodeURIComponent(
        product?.title || "product"
      )}`
    );
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f5f5f7]">

      {/* =========================
          CSS
      ========================== */}

      <style>{`

        @keyframes saleMarquee {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-100%);
          }

        }


        .sale-marquee {
          width: 100%;
          overflow: hidden;
          background: #a90082;
          white-space: nowrap;
        }


        .sale-marquee-track {
          display: flex;
          width: max-content;
        }


        .sale-marquee-content {
          display: flex;
          flex-shrink: 0;
          align-items: center;

          animation:
            saleMarquee
            18s
            linear
            infinite;
        }


        .sale-marquee-content span {
          padding: 9px 20px;

          color: white;

          font-size: 16px;
          line-height: 20px;

          font-weight: 800;
        }


        .sale-marquee-content b {
          color: white;

          font-size: 8px;
        }


        @media (max-width: 640px) {

          .sale-marquee-content {
            animation-duration: 12s;
          }

          .sale-marquee-content span {
            padding: 8px 15px;

            font-size: 13px;

            line-height: 18px;
          }

        }

      `}</style>


      <div className="mx-auto w-full max-w-[1280px] bg-white">


        {/* =====================================================
            PINK INFINITE SALE SLIDER
        ====================================================== */}

        <div className="sale-marquee">

          <div className="sale-marquee-track">

            {/* COPY 1 */}

            <div className="sale-marquee-content">

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (

                  <React.Fragment
                    key={`first-${item}`}
                  >

                    <span>
                      {config.saleText}
                    </span>

                    <b>●</b>

                  </React.Fragment>

                )
              )}

            </div>


            {/* COPY 2 */}

            <div
              className="sale-marquee-content"
              aria-hidden="true"
            >

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (

                  <React.Fragment
                    key={`second-${item}`}
                  >

                    <span>
                      {config.saleText}
                    </span>

                    <b>●</b>

                  </React.Fragment>

                )
              )}

            </div>

          </div>

        </div>


        {/* =====================================================
            CATEGORY BANNER AUTO SLIDER
        ====================================================== */}

        {config.banners?.length > 0 && (

          <section
            className="
              relative
              w-full
              overflow-hidden
              bg-[#f7f1e8]
            "
          >

            <Swiper
              key={category}

              modules={[
                Autoplay,
              ]}

              slidesPerView={1}

              spaceBetween={0}

              speed={650}

              loop={
                config.banners.length > 1
              }

              autoplay={{
                delay: 2500,

                disableOnInteraction:
                  false,

                pauseOnMouseEnter:
                  false,
              }}

              onSlideChange={(swiper) => {
                setActiveBanner(
                  swiper.realIndex
                );
              }}
            >

              {config.banners.map(
                (banner, index) => (

                  <SwiperSlide
                    key={`${category}-${index}`}
                  >

                    <div
                      className="
                        relative
                        w-full
                        overflow-hidden
                        bg-[#f5ead9]
                      "
                    >

                      <img
                        src={banner}

                        alt={`${config.name} banner ${
                          index + 1
                        }`}

                        className="
                          block
                          w-full
                          h-auto
                          object-cover
                          object-center
                        "
                      />

                    </div>

                  </SwiperSlide>

                )
              )}

            </Swiper>


            {/* BANNER DOTS */}

            {config.banners.length > 1 && (

              <div
                className="
                  absolute
                  bottom-[10px]
                  left-1/2
                  z-20
                  flex
                  -translate-x-1/2
                  items-center
                  gap-[7px]
                "
              >

                {config.banners.map(
                  (_, index) => (

                    <span
                      key={index}

                      className={`
                        block
                        h-[6px]
                        rounded-full
                        shadow-sm
                        transition-all
                        duration-300

                        ${
                          activeBanner ===
                          index
                            ? "w-[18px] bg-[#d0009b]"
                            : "w-[7px] bg-white/90"
                        }
                      `}
                    />

                  )
                )}

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            BENEFITS
        ====================================================== */}

        <section
          className="
            grid
            grid-cols-3
            border-b
            border-gray-200
            bg-[#fff8ee]
            px-1
            py-[17px]
            md:px-8
            md:py-[22px]
          "
        >


          {/* RETURN */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-[7px]
              border-r
              border-gray-200
            "
          >

            <div
              className="
                flex
                h-[34px]
                w-[34px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#9f2089]
                text-[18px]
                font-bold
                text-white

                md:h-[42px]
                md:w-[42px]
              "
            >
              ↩
            </div>


            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  leading-[13px]
                  text-[#9f2089]

                  sm:text-[12px]

                  md:text-[15px]
                  md:leading-[18px]
                "
              >
                Easy returns
              </p>

              <p
                className="
                  text-[10px]
                  font-semibold
                  leading-[13px]
                  text-[#9f2089]

                  sm:text-[12px]

                  md:text-[14px]
                "
              >
                & refunds
              </p>

            </div>

          </div>


          {/* COD */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-[7px]
              border-r
              border-gray-200
            "
          >

            <div
              className="
                flex
                h-[34px]
                w-[34px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#9f2089]
                text-[17px]
                font-bold
                text-white

                md:h-[42px]
                md:w-[42px]
              "
            >
              ₹
            </div>


            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  leading-[13px]
                  text-[#9f2089]

                  sm:text-[12px]

                  md:text-[15px]
                "
              >
                Cash on
              </p>

              <p
                className="
                  text-[10px]
                  font-semibold
                  leading-[13px]
                  text-[#9f2089]

                  sm:text-[12px]

                  md:text-[14px]
                "
              >
                delivery
              </p>

            </div>

          </div>


          {/* PRICE */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-[7px]
            "
          >

            <div
              className="
                flex
                h-[34px]
                w-[34px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#9f2089]
                text-[17px]
                font-bold
                text-white

                md:h-[42px]
                md:w-[42px]
              "
            >
              ₹
            </div>


            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  leading-[13px]
                  text-[#9f2089]

                  sm:text-[12px]

                  md:text-[15px]
                "
              >
                Lowest
              </p>

              <p
                className="
                  text-[10px]
                  font-semibold
                  leading-[13px]
                  text-[#9f2089]

                  sm:text-[12px]

                  md:text-[14px]
                "
              >
                price
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            DAILY DEALS
        ====================================================== */}

        <section
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-[7px]
            border-b
            border-gray-200
            bg-white
            px-2
            py-[17px]
          "
        >

          <h2
            className="
              text-[17px]
              font-bold
              text-[#5c6170]

              md:text-[22px]
            "
          >
            {config.name} Daily Deals
          </h2>


          <span className="text-[20px]">
            ⚡
          </span>


          <div
            className="
              rounded-md
              bg-[#fff0df]
              px-[8px]
              py-[4px]
              text-[11px]
              font-semibold
              text-[#ff6d3a]

              md:text-[13px]
            "
          >
            ⏱ {hours}h : {minutes}m :{" "}
            {seconds}s
          </div>

        </section>


        {/* =====================================================
            PRODUCT HEADING
        ====================================================== */}

        <section
          className="
            border-b
            border-gray-200
            bg-white
            px-3
            py-4

            md:px-5
          "
        >

          <div
            className="
              flex
              items-end
              justify-between
              gap-3
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  text-gray-400

                  md:text-[11px]
                "
              >
                Home / {config.name}
              </p>


              <h1
                className="
                  mt-[2px]
                  text-[18px]
                  font-semibold
                  text-[#353543]

                  md:text-[22px]
                "
              >
                {config.name}
              </h1>

            </div>


            <span
              className="
                text-[10px]
                text-gray-500

                md:text-[12px]
              "
            >
              {filteredProducts.length}{" "}
              Products
            </span>

          </div>

        </section>


        {/* =====================================================
            NO PRODUCTS
        ====================================================== */}

        {filteredProducts.length === 0 ? (

          <section
            className="
              flex
              min-h-[350px]
              flex-col
              items-center
              justify-center
              px-4
              text-center
            "
          >

            <div className="text-[45px]">
              🛍️
            </div>


            <h2
              className="
                mt-3
                text-[19px]
                font-semibold
                text-[#353543]
              "
            >
              No products found
            </h2>


            <p
              className="
                mt-1
                text-[12px]
                text-gray-500
              "
            >
              Products are not available
              in this category.
            </p>


            <button
              type="button"

              onClick={() =>
                navigate("/")
              }

              className="
                mt-5
                rounded-md
                bg-[#9f2089]
                px-6
                py-3
                text-[13px]
                font-semibold
                text-white
              "
            >
              Continue Shopping
            </button>

          </section>

        ) : (

          /* ===================================================
              PRODUCTS GRID
          ==================================================== */

          <section
            className="
              grid
              grid-cols-2
              bg-white

              sm:grid-cols-3

              md:grid-cols-4

              lg:grid-cols-5
            "
          >

            {filteredProducts.map(
              (product, index) => {

                const image =
                  Array.isArray(
                    product?.image
                  )
                    ? product.image[0]
                    : product?.image;

                return (

                  <article
                    key={
                      product?.id ||
                      index
                    }

                    onClick={() =>
                      openProduct(product)
                    }

                    className="
                      group
                      relative
                      cursor-pointer
                      border-b
                      border-r
                      border-gray-200
                      bg-white
                      p-[8px]
                      transition

                      hover:z-10
                      hover:shadow-md

                      md:p-[12px]
                    "
                  >


                    {/* PRODUCT IMAGE */}

                    <div
                      className="
                        relative
                        flex
                        aspect-[3/4]
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        bg-[#fafafa]
                      "
                    >

                      {image ? (

                        <img
                          src={image}

                          alt={
                            product?.title ||
                            "Product"
                          }

                          loading="lazy"

                          className="
                            h-full
                            w-full
                            object-contain
                            transition-transform
                            duration-300

                            group-hover:scale-[1.02]
                          "
                        />

                      ) : (

                        <span
                          className="
                            text-[11px]
                            text-gray-400
                          "
                        >
                          No Image
                        </span>

                      )}


                      {/* WISHLIST */}

                      <button
                        type="button"

                        onClick={(event) => {
                          event.stopPropagation();
                        }}

                        className="
                          absolute
                          right-2
                          top-2
                          flex
                          h-[32px]
                          w-[32px]
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          text-[20px]
                          shadow
                        "
                      >
                        ♡
                      </button>

                    </div>


                    {/* PRODUCT DETAILS */}

                    <div className="pt-[9px]">


                      {/* TITLE */}

                      <p
                        className="
                          truncate
                          text-[12px]
                          text-[#616173]

                          md:text-[13px]
                        "
                      >
                        {product?.title ||
                          "Product"}
                      </p>


                      {/* PRICE */}

                      <div
                        className="
                          mt-[5px]
                          flex
                          flex-wrap
                          items-baseline
                          gap-[6px]
                        "
                      >

                        <span
                          className="
                            text-[17px]
                            font-bold
                            text-[#353543]

                            md:text-[19px]
                          "
                        >
                          ₹
                          {product?.price ||
                            0}
                        </span>


                        {product?.cancelprice && (

                          <span
                            className="
                              text-[11px]
                              text-gray-400
                              line-through
                            "
                          >
                            ₹
                            {
                              product.cancelprice
                            }
                          </span>

                        )}

                      </div>


                      {/* DELIVERY */}

                      <span
                        className="
                          mt-[7px]
                          inline-block
                          rounded-full
                          bg-[#f5f5f5]
                          px-[8px]
                          py-[4px]
                          text-[10px]
                          font-medium
                          text-[#616173]
                        "
                      >
                        Free Delivery
                      </span>


                      {/* RATING */}

                      <div
                        className="
                          mt-[8px]
                          flex
                          items-center
                          gap-[4px]
                        "
                      >

                        <span
                          className="
                            inline-flex
                            items-center
                            rounded-full
                            bg-[#038d63]
                            px-[7px]
                            py-[3px]
                            text-[11px]
                            font-semibold
                            text-white
                          "
                        >
                          {product?.rate ||
                            "4.2"}

                          <span
                            className="
                              ml-[3px]
                              text-[9px]
                            "
                          >
                            ★
                          </span>

                        </span>


                        <span
                          className="
                            truncate
                            text-[10px]
                            text-gray-400
                          "
                        >
                          (
                          {Number(
                            product?.ratenum ||
                              1234
                          ).toLocaleString()}
                          )
                        </span>

                      </div>

                    </div>

                  </article>

                );
              }
            )}

          </section>

        )}

      </div>

    </main>
  );
}

export default CategoryPage;