"use client";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
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
function Banner() {
  const [endDate, setEndDate] = useState(new Date("2024-12-30T21:30:00"));
  const [timeArray, setTimeArray] = useState([
    { date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
  ]);
  const [isEventOver, setIsEventOver] = useState(false);
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
                  eq: "banner-page-black-friday",
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

  return (
    <div className="HeaderBlackFriday">
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
          <div id="countdown">
            <div id="header"> Black Friday vẫn còn:</div>
            <div id="tiles">
              <span>{timeArray[0].days}</span>
              <span>{timeArray[0].hours}</span>
              <span>{timeArray[0].minutes}</span>
              <span>{timeArray[0].seconds}</span>
            </div>
            <div className="labels">
              <div>
                <p></p>
                <li>Ngày</li>
                <li>Giờ</li>
                <li>Phút</li>
                <li>Giây</li>
              </div>
            </div>
          </div>
        )}
        <div
          className="HeaderHalloween-promotion-header"
          style={{ fontWeight: 400 }}
        >
          {`${
            data?.data?.Slider?.items[0]?.Banner?.items.filter((item) =>
              item.name.includes("ưu đãi black friday")
            ).length
          } đặc quyền mua hàng tại `}
          <span style={{ fontWeight: 700 }}>Bạch Long Mobile</span>
        </div>
        <div className="HeaderHalloween-promotion-list-privilege">
          {data?.data?.Slider?.items[0]?.Banner?.items
            .filter((item) => item.name.includes("ưu đãi black friday"))
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

export default Banner;
