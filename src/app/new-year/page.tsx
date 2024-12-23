"use client";
import React, { useEffect, useRef, useState } from "react";
import Banner from "../../components/ComponentSaleNewYear/banner/index";
import AppleList from "../../components/ComponentSaleNewYear/apple/index";
import ProductPercent from "../../components/ComponentSaleNewYear/99percent/index";
import AndroidList from "../../components/ComponentSaleNewYear/android/index";
import LaptopList from "../../components/ComponentSaleNewYear/laptop/index";
import ToyList12 from "../../components/ComponentSaleNewYear/toy/index";
import Snowfall from "../../components/ComponentSaleNewYear/snow/Snowfall";
import Noel from "../../components/ComponentSaleNewYear/Noel/index";
import SnowFall from "../../components/ComponentSaleNewYear/snow/Snowfall";
import background from "../../../public/sale-12/5c3b4e476d3d0.webp";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
const categories = [
  { id: "item-iphone", name: "iPhone" },
  { id: "item-airpods", name: "Máy 99%" },
  { id: "item-mac", name: "Samsung" },
  { id: "item-android", name: "Android" },
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
  function letsSpin() {
    var x = 1024;
    var y = 9999;
    var deg = Math.floor(Math.random() * (x - y)) + y;

    const wheelSpin = document.getElementById("wheelSpin");
    if (wheelSpin) {
      wheelSpin.style.transform = "rotate(" + deg + "deg)";
    }
  }
  return (
    <div className="page-sale-thang-12-12">
      <Image
        src={background}
        alt=""
        style={{
          position: "absolute",
          zIndex: "-1",
          height: "100%",
          objectFit: "fill",
        }}
      />
      {/* <Snowfall /> */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div>
          <Banner />
        </div>

        <div id="item-iphone">
          <AppleList />
        </div>

        <div id="item-airpods">
          <ProductPercent />
        </div>

        <div id="item-mac">
          <LaptopList />
        </div>

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
        {/* <div
          id="main"
          className={`main-spin ${isStickyVisible ? "visible" : "hidden"}`}
          style={{
            zIndex: 1000,
            position: "fixed",
          }}
        >
          <div id="wheelSpin" className="wheel-spin">
            <div>
              <span className="span1-spin span-spin">
                <p>😊</p>
              </span>
              <span className="span2-spin span-spin">
                <p>😝</p>
              </span>
              <span className="span3-spin span-spin">
                <p>😍</p>
              </span>
              <span className="span4-spin span-spin">
                <p>😎</p>
              </span>

              <span className="span5-spin span-spin">
                <p>🍩</p>
              </span>
              <span className="span6-spin span-spin">
                <p>🍭</p>
              </span>
              <span className="span7-spin span-spin">
                <p>🍰</p>
              </span>
              <span className="span8-spin span-spin ">
                <p>🍬</p>
              </span>
            </div>
          </div>

          <button className="spin-spin" onClick={letsSpin}>
            SPIN
          </button>
        </div> */}
        {/* <Noel /> */}
        <Snowfall />
      </div>
    </div>
  );
}
