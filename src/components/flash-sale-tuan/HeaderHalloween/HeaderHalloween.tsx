"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./HeaderHalloween.scss";
import bannerPC from "../../../../public/combo-pk/Head 1200x450.png";
import bannerMB from "../../../../public/combo-pk/Head 900x900.png";
import Privilege01 from "../../../../public/halloween/privilege-01.png";
import Privilege02 from "../../../../public/halloween/privilege-02.png";
import Privilege03 from "../../../../public/halloween/privilege-03.png";
import Privilege04 from "../../../../public/halloween/privilege-04.png";
import Privilege05 from "../../../../public/halloween/privilege-05.png";
import Privilege06 from "../../../../public/halloween/privilege-06.png";
import { Spin } from "antd";
import Link from "next/link";

function HeaderHalloween() {
  const [endDate, setEndDate] = useState(new Date("2024-11-20T21:30:00"));
  const [timeArray, setTimeArray] = useState([
    { date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
  ]);
  const [isEventOver, setIsEventOver] = useState(false);
  interface BannerItem {
    banner_id: number;
    caption: string;
    link: string;
    media: string;
    media_alt: string;
    name: string;
    slider_id: number;
  }

  interface Banner {
    __typename: string;
    items: BannerItem[];
    page_info: {
      current_page: number;
      page_size: number;
      total_pages: number;
    };
  }

  interface SliderItem {
    title: string;
    identifier: string;
    Banner: Banner;
  }

  interface SliderData {
    Slider: {
      items: SliderItem[];
      total_count: number;
    };
  }

  interface ApiResponse {
    data: SliderData;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setIsEventOver(true);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeArray([
        { date: endDate.toDateString(), days, hours, minutes, seconds },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);
  const [data, setData] = useState<ApiResponse | null>(null);

  const fetchBannerHeader = async () => {
    try {
      const response = await fetch(
        "https://beta-api.bachlongmobile.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
                query getSlider($filter: SliderFilterInput) {
                  Slider(filter: $filter) {
                    items {
                      title
                      identifier
                      Banner {
                        __typename
                        items {
                          banner_id
                          caption
                          link
                          media
                          media_alt
                          name
                          slider_id
                        }
                        page_info {
                          current_page
                          page_size
                          total_pages
                        }
                      }
                    }
                    total_count
                  }
                }
              `,
            variables: {
              filter: {
                identifier: {
                  eq: "banner-page-flash-sale-tuan",
                },
              },
            },
          }),
        }
      );

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);
  console.log("data", data);
  return (
    <div className="HeaderHalloweens1">
      <div>
        {data?.data?.Slider?.items[0]?.Banner?.items[0]?.media ? (
          <img
            src={data.data.Slider.items[0].Banner.items[0].media}
            alt="Banner PC"
            className="HeaderCombo-bannerPC"
          />
        ) : (
          <Spin>
            <div style={{ width: 1820, height: 500 }} />
          </Spin>
        )}
        {data?.data?.Slider?.items[0]?.Banner?.items[1]?.media ? (
          <img
            src={data.data.Slider.items[0].Banner.items[1].media}
            alt="Banner Mobile"
            className="HeaderCombo-bannerMB"
          />
        ) : (
          <Spin>
            <div style={{ width: 1820, height: 500 }} />
          </Spin>
        )}
      </div>
      <div
        className="banner-HeaderHalloween shine-banner"
        style={{ position: "relative", overflow: "hidden" }}
      ></div>
      <div className="container">
        {isEventOver ? (
          <div className="HeaderHalloween-time-line">
            <p
              className="HeaderHalloween-time-line-end-text"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 0px",
                color: "#ff000e",
                fontSize: "32px",
                fontWeight: "600",
              }}
            >
              Hết thời gian sự kiện
            </p>
          </div>
        ) : (
          <div className="HeaderHalloween-time-line">
            <div className="HeaderHalloween-time-line-container">
              <div className="HeaderHalloween-time-line-card-container">
                {timeArray.map((time, index) => (
                  <div
                    className="HeaderHalloween-time-line-card-key"
                    key={index}
                  >
                    <div className="HeaderHalloween-time-line-card">
                      <div className="content-card">
                        <p className="HeaderHalloween-time-line-count">{`${time.days} `}</p>
                        <p className="HeaderHalloween-time-line-subtext">
                          Ngày
                        </p>
                      </div>
                    </div>
                    <div className="HeaderHalloween-time-line-card">
                      <div className="content-card">
                        <p className="HeaderHalloween-time-line-count">{`${time.hours} `}</p>
                        <p className="HeaderHalloween-time-line-subtext">Giờ</p>
                      </div>
                    </div>
                    <div className="HeaderHalloween-time-line-card">
                      <div className="content-card">
                        <p className="HeaderHalloween-time-line-count">{`${time.minutes} `}</p>
                        <p className="HeaderHalloween-time-line-subtext">
                          Phút
                        </p>
                      </div>
                    </div>
                    <div className="HeaderHalloween-time-line-card">
                      <div className="content-card">
                        <p className="HeaderHalloween-time-line-count">{`${time.seconds} `}</p>
                        <p className="HeaderHalloween-time-line-subtext">
                          Giây
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="#item-rules">
                <button className="Halloween-button">Xem thể lệ</button>
              </Link>
            </div>
          </div>
        )}
        <div
          className="HeaderHalloween-promotion-header"
          style={{ fontWeight: 400 }}
        >
          6 đặc quyền mua hàng tại{" "}
          <span style={{ fontWeight: 700 }}>Bạch Long Mobile</span>
        </div>
        <div className="HeaderHalloween-promotion-list-privilege">
          {data?.data?.Slider?.items[0]?.Banner?.items
            .filter((item) => item.name.includes("ưu đãi flash sale tuần"))
            .map((item, index) => (
              <div
                key={index}
                className="privilege-img"
                style={{ cursor: "pointer" }}
              >
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={item.media || ""}
                      alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
                      width={1200}
                      height={1000}
                    />
                  </a>
                ) : (
                  <Image
                    src={item.media || ""}
                    alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
                    width={1200}
                    height={1000}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderHalloween;
