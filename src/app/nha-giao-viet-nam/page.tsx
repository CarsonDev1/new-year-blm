"use client";
import React, { useEffect, useRef, useState } from "react";
import Banner from "../../components/ComponentTeacherDay/Banner/Banner";
import Image from "next/image";
import ProductList from "../../components/ComponentTeacherDay/product/index";
import AppleList from "../../components/ComponentTeacherDay/apple/index";
import ProductPercent from "../../components/ComponentTeacherDay/99percent/index";
import AndroidList from "../../components/ComponentTeacherDay/android/index";
import LaptopList from "../../components/ComponentTeacherDay/laptop/index";
import ToyList from "../../components/ComponentTeacherDay/toy/index";
import IpadList from "../../components/ComponentTeacherDay/ipad";
import WatchList from "../../components/ComponentTeacherDay/watch/index";
import img from "../../../public/2011/giay.png";
import "./style.scss";
import img10 from "../../../public/2011/10.png";
import img11 from "../../../public/2011/11.png";
import img12 from "../../../public/2011/12.png";
import img13 from "../../../public/2011/13.png";
import img14 from "../../../public/2011/14.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const categories = [
  { id: "item-hot", name: "Giá sốc" },
  { id: "item-iphone", name: "iPhone" },
  { id: "item-airpods", name: "Máy 99%" },
  { id: "item-ipad", name: "iPad/Macbook/Watch" },
  { id: "item-mac", name: "Samsung" },
  { id: "item-android", name: "Oppo/Xiaomi/Laptop" },
  { id: "item-toy", name: "Phụ kiện" },
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
      className="page-20-11"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#D1BB99",
      }}
    >
      {/* <Image className="book" src={img} alt="" />
      <Image className="book2" src={img} alt="" /> */}

      {/* <div id="item-hot">
        <ProductList />
      </div> */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* <div className="leaf">
          <div>
            <img src={img10.src} height="75px" width="75px" alt="fall leaves" />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src={img12.src}
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src={img13.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
        </div> */}

        <div className="leaf leaf1">
          <div>
            <img src={img12.src} height="75px" width="75px" alt="fall leaves" />
          </div>
          <div>
            <img
              src={img13.src}
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
        </div>

        <div className="leaf leaf2">
          <div>
            <img src={img12.src} height="75px" width="75px" alt="fall leaves" />
          </div>
          <div>
            <img
              src={img13.src}
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="autumn leaves"
            />
          </div>
        </div>
        {/* <Image
          src={imgBackground}
          alt=""
          style={{ position: "absolute", zIndex: "" }}
        /> */}
        <div>
          <Banner />
        </div>
        <div id="item-hot">
          <ProductList />
        </div>
        <div id="item-iphone">
          <AppleList />
        </div>
        <div id="item-airpods">
          <ProductPercent />
        </div>
        <div id="item-ipad">
          <IpadList />
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
          <ToyList />
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
