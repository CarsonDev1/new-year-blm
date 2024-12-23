"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import DecorWomen from "../../../../public/flase-sale/giovang.png";
import Access10k from "../accessories20_10/acess-10k/index";
import Access20k from "../accessories20_10/acess-20k/index";
import Access110 from "../accessories20_10/acess-110/index";
import AccessTo210 from "../accessories20_10/acess-to210/index";
import Access310 from "../accessories20_10/acess-310/index";
import Access290 from "../accessories20_10/acess-290/index";
import Access210 from "../accessories20_10/acess-210/index";
import "swiper/css";
import "./product.scss";

// Define the current date outside the component to avoid re-calculation on each render
const currentDate = new Date();

const ProductList: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const tabs = [
    {
      index: 0,
      name: <span>NGÀY 03/11</span>,
      component: <Access10k />,
      date: new Date("2024-11-03"),
    },
    {
      index: 1,
      name: <span>NGÀY 04/11</span>,
      component: <Access20k />,
      date: new Date("2024-11-04"),
    },
    {
      index: 2,
      name: <span>NGÀY 05/11</span>,
      component: <Access110 />,
      date: new Date("2024-11-05"),
    },
    {
      index: 3,
      name: <span>NGÀY 06/11</span>,
      component: <Access210 />,
      date: new Date("2024-11-05"),
    },
    {
      index: 4,
      name: <span>NGÀY 07/11</span>,
      component: <Access310 />,
      date: new Date("2024-11-05"),
    },
    // {
    //   index: 5,
    //   name: <span>NGÀY 30/10</span>,
    //   component: <AccessTo210 />,
    //   date: new Date("2024-10-30"),
    // },
    // {
    //   index: 6,
    //   name: <span>NGÀY 31/10</span>,
    //   component: <Access290 />,
    //   date: new Date("2024-10-31"),
    // },
  ];

  const initialActiveTab = tabs.findIndex(
    (tab) => currentDate.toDateString() === tab.date.toDateString()
  );
  const [activeTab, setActiveTab] = useState<number>(
    initialActiveTab === -1 ? 0 : initialActiveTab
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [disabledTabs, setDisabledTabs] = useState<number[]>([]);

  useEffect(() => {
    // Determine which tabs should be disabled based on the current date
    const disabled = tabs
      .filter(
        (tab) =>
          currentDate >
          new Date(
            tab.date.getFullYear(),
            tab.date.getMonth(),
            tab.date.getDate() + 1
          )
      )
      .map((tab) => tab.index);
    setDisabledTabs(disabled);

    // Set up a listener to detect if the screen width changes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check for mobile view
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener
    };
  }, []); // Remove dependencies that could cause re-renders

  useEffect(() => {
    // Scroll to the active tab on mobile if swiperRef is available
    if (isMobile && swiperRef.current) {
      swiperRef.current.slideTo(activeTab);
    }
  }, [isMobile, activeTab]);

  return (
    <div className="product-list-sale">
      <div className="container">
        <div className="upgrade-list-sale bg-01">
          <div className="women-decor">
            <Image
              src={DecorWomen}
              width={1400}
              height={1200}
              quality={100}
              priority
              alt="product-banner-01"
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, (min-width: 1200px) 33vw"
            />
          </div>

          {isMobile ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={2.8}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {tabs.map((tab) => (
                <SwiperSlide key={tab.index} style={{ padding: "1.2rem 0" }}>
                  <button
                    onClick={() => setActiveTab(tab.index)}
                    className={
                      activeTab === tab.index
                        ? "tab-halloween active"
                        : "tab-halloween"
                    }
                    style={{
                      width: "100%",
                      backgroundColor:
                        activeTab === tab.index ? "#0979cb" : "#fff",
                      color: activeTab === tab.index ? "#ffff" : "#000",
                      border:
                        activeTab === tab.index
                          ? "2px solid #ff4d4f"
                          : "2px solid #eee",
                      borderRadius: "8px",
                      cursor: disabledTabs.includes(tab.index)
                        ? "not-allowed"
                        : "pointer",
                      transition: "all 0.3s ease",
                      boxShadow:
                        activeTab === tab.index
                          ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                          : "none",
                      fontSize: "1.2rem",
                      minHeight: "4rem",
                    }}
                    disabled={disabledTabs.includes(tab.index)}
                  >
                    {tab.name}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="tabs-grid">
              {tabs.map((tab) => (
                <div key={tab.index} style={{ flex: 1 }}>
                  <button
                    onClick={() => setActiveTab(tab.index)}
                    className={
                      activeTab === tab.index
                        ? "tab-halloween active"
                        : "tab-halloween"
                    }
                    style={{
                      width: "100%",
                      backgroundColor:
                        activeTab === tab.index ? "#0979cb" : "#fff",
                      color: activeTab === tab.index ? "#ffff" : "#000",
                      borderRadius: "8px",
                      cursor: disabledTabs.includes(tab.index)
                        ? "not-allowed"
                        : "pointer",
                      transition: "all 0.3s ease",
                      boxShadow:
                        activeTab === tab.index
                          ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                          : "none",
                    }}
                    disabled={disabledTabs.includes(tab.index)}
                  >
                    {tab.name}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>{tabs[activeTab]?.component}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
