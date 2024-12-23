"use client";
import React, { useEffect, useRef, useState } from "react";
import Banner from "../../components/ComponentSale1212/banner/index";
import Image from "next/image";
import ProductList from "../../components/ComponentSale1212/product/index";
import AppleList from "../../components/ComponentSale1212/apple/index";
import ProductPercent from "../../components/ComponentSale1212/99percent/index";
import AndroidList from "../../components/ComponentSale1212/android/index";
import LaptopList from "../../components/ComponentSale1212/laptop/index";
import ToyList11 from "../../components/ComponentSale1212/toy11/index";
import ToyList12 from "../../components/ComponentSale1212/toy/index";
import IpadList from "../../components/ComponentSale1212/ipad/index";
import WatchList from "../../components/ComponentSale1212/watch/index";
import img from "../../../public/black-friday/bacground.webp";
import imgRocket from "../../../public/black-friday/bongbong.webp";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const categories = [
  // { id: "item-hot", name: "Giá sốc" },
  // { id: "item-toy11", name: "Mua 1 tăng 1" },

  { id: "item-iphone", name: "Sản phẩm nổi bật" },
  // { id: "item-ipad", name: "iPad/Macbook" },
  { id: "item-airpods", name: "Máy 99%" },

  { id: "item-mac", name: "Samsung" },
  { id: "item-android", name: "Oppo/Xiaomi/Laptop" },
  { id: "item-toy", name: "Phụ Kiện" },
];
export default function Page() {
  const swiperRef = useRef<any>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollThreshold = 500;

  const handleClick = (id: string, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveCategory(id);
    }
  };

  const handleScrollToRules = () => {
    const customOffset = 500;
    handleClick("item-rules", customOffset);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > scrollThreshold);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    const observeSections = () => {
      categories.forEach((category, index) => {
        const element = document.getElementById(category.id);
        if (element) {
          sectionObserver.observe(element);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    const timeoutId = setTimeout(observeSections, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
      categories.forEach((category) => {
        const element = document.getElementById(category.id);
        if (element) {
          sectionObserver.unobserve(element);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      const activeIndex = categories.findIndex(
        (category) => category.id === activeCategory
      );
      if (activeIndex !== -1) {
        swiperRef.current.slideTo(activeIndex, 300, true);
      }
    }
  }, [activeCategory]);
  return (
    <div
      className="page-sale-thang-12-12"
      style={{
        backgroundColor: "#000b6b",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* <Image className="background-home-black-friday" src={img} alt="" />
        <div className="rocket">
          <Image className="rocket-fly shake" src={imgRocket} alt="" />
        </div> */}
        <div>
          <Banner />
        </div>
        {/* <div id="item-hot">
          <ProductList />
        </div> */}
        {/* <div id="item-toy11">
          <ToyList11 />
        </div> */}

        <div id="item-iphone">
          <AppleList />
        </div>
        {/* <div id="item-ipad">
          <IpadList />
        </div> */}
        <div id="item-airpods">
          <ProductPercent />
        </div>

        <div id="item-mac">
          <LaptopList />
        </div>
        {/* <div id="item-watch">
          <WatchList />
        </div> */}
        <div id="item-android">
          <AndroidList />
        </div>
        <div id="item-toy">
          <ToyList12 />
        </div>
        <div
          className={`sticky-category ${
            isStickyVisible ? "visible" : "hidden"
          }`}
        >
          <div className="category-desktop">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-item ${
                  activeCategory === category.id ? "active" : "default"
                }`}
                onClick={() => handleClick(category.id)}
              >
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
          <div className="category-mobile">
            <Swiper
              slideToClickedSlide={true}
              spaceBetween={10}
              watchSlidesProgress={true}
              onSwiper={(swiperInstance) => {
                swiperRef.current = swiperInstance; // Store swiper instance in ref
              }}
              onSlideChange={(swiperInstance) => {
                setActiveCategory(categories[swiperInstance.activeIndex].id);
                swiperInstance.slideTo(swiperInstance.activeIndex, 300, true); // Center the active slide when scrolling
              }}
              breakpoints={{
                300: {
                  slidesPerView: 3.5,
                },
                850: {
                  slidesPerView: 5,
                },
              }}
              slidesPerView="auto"
              initialSlide={0}
            >
              {categories.map((category, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => {
                    setActiveCategory(category.id);
                    swiperRef.current?.slideTo(index, 300, true); // Center the clicked slide
                    handleClick(category.id);
                  }}
                >
                  <div
                    className={`swiper-slide ${
                      activeCategory === category.id ? "active" : "default"
                    }`}
                  >
                    <span className="category-name">{category.name}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
