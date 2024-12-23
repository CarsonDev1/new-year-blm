"use client";
import React, { useEffect, useState } from "react";
import "./BodyBNew.scss";
import { Col, Row, Spin } from "antd";
import Image from "next/image";
import icUser from "../../../../public/ic-user-4.svg";
import { Author, BlogPost, queryBNew } from "../../../app/utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import BodyBnew2 from "../BodyBNew2/BodyBNew2";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import logo from "../../../../public/logo-nav.png";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

export default function BodyBNew() {
  const [activeTab, setActiveTab] = useState("Trang Chủ");
  const [activeTab2, setActiveTab2] = useState(19);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const tabIds: { [key: string]: number } = {
    "Trang Chủ": 19,
    "Tin Công Nghệ": 9,
    // "Khám Phá": 10,
    "Đánh Giá": 12,
    "Thủ Thuật, Q&A": 14,
    "Khuyến Mãi": 20,
    "Tin Tức Sự Kiện": 27,
    "Tuyển Dụng": 21,
  };

  const [newsData, setNewsData] = useState<BlogPost[] | null>(null);
  const [newsData2, setNewsData2] = useState<BlogPost[] | null>(null);

  const variables = {
    filter: {
      category_id: {
        eq: tabIds[activeTab], // Updated to handle multiple IDs
      },
    },
    pageSize: 100,
    currentPage: 1,
    sortFiled: "publish_time",
    allPosts: false,
    sort: ["DESC"],
  };

  const variablesNew = {
    filter: {
      category_id: {
        eq: tabIds[activeTab], // này truyền cứng id của danh mục bài viết
      },
      ...(tabIds[activeTab] === 19
        ? {}
        : {
            // Kiểm tra nếu activeTab là 19
            is_featured: {
              eq: 1, //set cứng là 1 để để ra bài viết nổi bật
            },
          }),
    },
    pageSize: 1000,
    currentPage: 1,
    sortFiled: "publish_time",
    allPosts: false,
    sort: ["DESC"],
  };
  // Fetch data for the main blog posts based on the active tab
  async function fetchBlogPostsData() {
    setLoading(true); // Set loading to true before fetching
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryBNew,
          variables,
        }),
      }
    );
    const data = await response.json();
    setNewsData(data.data.blogPosts.items);
    setLoading(false); // Set loading to false after fetching
  }

  // Fetch data for the new blog posts based on the active tab2
  async function fetchBlogPostsDataNew() {
    setLoading(true); // Set loading to true before fetching
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryBNew,
          variables: variablesNew,
        }),
      }
    );
    const data = await response.json();
    setNewsData2(data.data.blogPosts.items);
    setLoading(false); // Set loading to false after fetching
  }

  useEffect(() => {
    fetchBlogPostsData(); // Fetch main posts when activeTab changes
    fetchBlogPostsDataNew(); // Fetch new posts based on activeTab2
  }, [activeTab, activeTab2]);

  const tabs = [
    "Trang Chủ",
    "Tin Công Nghệ",
    // "Khám phá",
    "Đánh Giá",
    "Thủ Thuật, Q&A",
    "Khuyến Mãi",
    "Tin Tức Sự Kiện",
    "Tuyển Dụng",
  ];

  return (
    <div className="header-BodyBNew">
      <nav>
        <ul className="BodyBNew-tab-list">
          <Link href="https://bachlongmobile.com/">
            <img src={logo.src} alt="Logo" className="BodyBNew-tab-list-img" />
          </Link>

          {tabs.map((tab) => (
            <li
              key={tab}
              className={`BodyBNew-tab-item ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
                setActiveTab2(tabIds[tab]);
              }}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>
      {loading ? ( // Show loading spinner while loading
        <div className="loading-containerBnew">
          {" "}
          {/* Centering container */}
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="header-BodyBNew-CardRow-test">
              <div className="header-BodyBNew-CardRow">
                <div className="header-BodyBNew-CardRow-col-6">
                  {newsData &&
                    newsData.slice(3, 5).map((post, index) => (
                      <div key={index} className="header-BodyBNew-news-box">
                        <div className="header-BodyBNew-news-image">
                          <a
                            className="inner-img"
                            onClick={() =>
                              router.push(
                                `/chi-tiet-tin-tuc?page=${new URL(
                                  post.post_url
                                ).pathname
                                  .split("/")
                                  .pop()}`
                              )
                            }
                          >
                            <img alt={post.title} src={post.first_image} />
                          </a>
                        </div>
                        <div className="header-BodyBNew-news-content">
                          <h2 className="news-title relative">
                            <a
                              className="inner-img"
                              onClick={() =>
                                router.push(
                                  `/chi-tiet-tin-tuc?page=${new URL(
                                    post.post_url
                                  ).pathname
                                    .split("/")
                                    .pop()}`
                                )
                              }
                            >
                              {post.title}
                            </a>
                          </h2>
                          <p style={{ padding: "6px 0px", color: "blue" }}>
                            {post.categories[0].meta_title}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="header-BodyBNew-CardCol">
                  {newsData && newsData.length > 0 && (
                    <div className="header-BodyBNew-news-first-box">
                      <a
                        className="header-BodyBNew-card-a"
                        onClick={() =>
                          router.push(
                            `/chi-tiet-tin-tuc?page=${new URL(
                              newsData[0].post_url
                            ).pathname
                              .split("/")
                              .pop()}`
                          )
                        }
                      >
                        <img
                          className="header-BodyBNew-news-first-image"
                          alt={newsData[0].title}
                          src={newsData[0].first_image}
                        />
                      </a>
                      <div className="header-BodyBNew-news-first-content">
                        <h1 className="header-BodyBNew-news-first-title header-BodyBNew-t-title header-BodyBNew-c-white relative">
                          <a
                            className="header-BodyBNew-card-a2"
                            onClick={() =>
                              router.push(
                                `/chi-tiet-tin-tuc?page=${new URL(
                                  newsData[newsData.length].post_url
                                ).pathname
                                  .split("/")
                                  .pop()}`
                              )
                            }
                          >
                            {newsData[0].title}
                          </a>
                        </h1>
                        <p style={{ padding: "6px 0px", color: "blue" }}>
                          {newsData[0].categories[0].meta_title}
                        </p>
                        <div className="header-BodyBNew-news-first-created">
                          <div className="author">
                            <Image
                              alt="User icon"
                              loading="lazy"
                              className="header-BodyBNew-icUser"
                              src={icUser}
                            />
                          </div>
                          <span>{newsData[0].author?.name}</span>
                          <div>
                            <span>
                              {new Date(
                                newsData[0].creation_time
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <span>{newsData[0].views_count} lượt xem</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="header-BodyBNew-CardCol2">
                  {newsData &&
                    newsData.slice(1, 3).map((post, index) => (
                      <div key={index} className="header-BodyBNew-news-box">
                        <div className="header-BodyBNew-news-image">
                          <a
                            className="inner-img"
                            onClick={() =>
                              router.push(
                                `/chi-tiet-tin-tuc?page=${new URL(
                                  post.post_url
                                ).pathname
                                  .split("/")
                                  .pop()}`
                              )
                            }
                          >
                            <img alt={post.title} src={post.first_image} />
                          </a>
                        </div>
                        <div className="header-BodyBNew-news-content">
                          <h2 className="news-title relative">
                            <a
                              className="inner-img"
                              onClick={() =>
                                router.push(
                                  `/chi-tiet-tin-tuc?page=${new URL(
                                    post.post_url
                                  ).pathname
                                    .split("/")
                                    .pop()}`
                                )
                              }
                            >
                              {post.title}
                            </a>
                          </h2>
                          <p style={{ padding: "6px 0px", color: "blue" }}>
                            {post.categories[0].meta_title}
                          </p>
                          {/* <div className="header-BodyBNew-news-first-created2">
                            <div className="author">
                              <Image
                                alt=""
                                loading="lazy"
                                className="header-BodyBNew-icUser"
                                src={icUser}
                              />
                            </div>
                            <span>{post.author?.name}</span>
                            <div>
                              <span>
                                {new Date(
                                  post.creation_time
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="header-BodyBNew-newHot">
              {newsData2 &&
                newsData2.length > 0 && ( // Check if newsData2 has items
                  <>
                    <h2 className="header-BodyBNew-titleNew">TIN NỔI BẬT</h2>
                    <Swiper
                      breakpoints={{
                        240: {
                          slidesPerView: 2,
                        },
                        768: {
                          slidesPerView: 3,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        1141: {
                          slidesPerView: 3,
                        },
                        1200: {
                          slidesPerView: 4.6,
                        },
                        1300: {
                          slidesPerView: 4,
                        },
                        1500: {
                          slidesPerView: 3.6,
                        },
                        1700: {
                          slidesPerView: 3.15,
                        },
                      }}
                      autoplay={{ delay: 3000 }}
                      modules={[Pagination, Autoplay]}
                      className="mySwiper"
                    >
                      {newsData2
                        .sort(
                          (a, b) =>
                            new Date(b.creation_time).getTime() -
                            new Date(a.creation_time).getTime()
                        )
                        .map((post, index) => (
                          <SwiperSlide key={index}>
                            <a
                              onClick={() =>
                                router.push(
                                  `/chi-tiet-tin-tuc?page=${new URL(
                                    post.post_url
                                  ).pathname
                                    .split("/")
                                    .pop()}`
                                )
                              }
                            >
                              <div className="header-BodyBNew-cardPostView">
                                <img
                                  className="header-BodyBNew-cardPostView-img"
                                  src={post.first_image}
                                  alt={post.title}
                                />
                                <h2 className="header-BodyBNew-cardPostView-title">
                                  {post.title}
                                </h2>
                                <div className="header-BodyBNew-cardPostView-tabInfo">
                                  <div className="author">
                                    <Image
                                      alt="User icon"
                                      loading="lazy"
                                      className="header-BodyBNew-icUser"
                                      src={icUser}
                                    />
                                  </div>
                                  <span>{post.author?.name}</span>
                                  <div>
                                    <span>
                                      {new Date(
                                        post.creation_time
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <p
                                  style={{ padding: "10px 0px", color: "blue" }}
                                >
                                  {post.categories[0].meta_title}
                                </p>
                              </div>
                            </a>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </>
                )}
            </div>
            <BodyBnew2 activeTab2={activeTab2} />
          </div>
        </>
      )}
    </div>
  );
}
