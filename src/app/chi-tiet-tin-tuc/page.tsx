"use client";

import React, { useEffect, useState } from "react";
import { queryBNewDetail } from "../utils/utils";
import "./NewSub.scss";
import icBachLong from "../../../public/ic-bachlong.webp";
import { Col, Row, Spin, Breadcrumb } from "antd";
import { BlogPost, queryBNew } from "../utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import icUser from "../../../public/ic-user-4.svg";
import parse from "html-react-parser";
import Link from "next/link";
export interface Author {
  author_id: number;
  author_url: string;
  content: string | null;
  creation_time: string | null;
  custom_layout: string | null;
  custom_layout_update_xml: string | null;
  custom_theme: string | null;
  custom_theme_from: string | null;
  custom_theme_to: string | null;
  facebook_page_url: string | null;
  featured_image: string | null;
  filtered_content: string | null;
  identifier: string;
  instagram_page_url: string | null;
  is_active: number;
  layout_update_xml: string | null;
  linkedin_page_url: string | null;
  meta_description: string;
  meta_title: string;
  name: string;
  page_layout: string | null;
  relative_url: string | null;
  role: string | null;
  short_content: string | null;
  short_filtered_content: string | null;
  title: string;
  twitter_page_url: string | null;
  type: string | null;
  url: string | null;
}

export interface BlogPosts {
  author: Author;
  author_id: number;
  canonical_url: string;
  categories: Array<{
    canonical_url: string;
    category_id: number;
    category_level: number;
    category_url: string;
    category_url_path: string;
    content: string | null;
    content_heading: string | null;
    custom_layout: string | null;
    custom_layout_update_xml: string | null;
    custom_theme: string | null;
    custom_theme_from: string | null;
    custom_theme_to: string | null;
    display_mode: number;
    identifier: string;
    include_in_menu: number;
    is_active: number;
    layout_update_xml: string | null;
    meta_description: string;
    meta_keywords: string | null;
    meta_title: string;
    page_layout: string | null;
    parent_category_id: number | null;
    path: string | null;
    position: number;
    posts_count: number;
    posts_sort_by: number;
    relative_url: string | null;
    title: string;
    type: string | null;
  }>;
  category_id: number | null;
  content_heading: string | null;
  creation_time: string;
  custom_layout: string | null;
  custom_layout_update_xml: string | null;
  custom_theme: string | null;
  custom_theme_from: string | null;
  custom_theme_to: string | null;
  end_time: string | null;
  featured_list_image: string;
  featured_list_img_alt: string | null;
  filtered_content: string;
  first_image: string;
  include_in_recent: number;
  is_active: number;
  is_recent_posts_skip: string | null;
  layout_update_xml: string | null;
  media_gallery: Array<{ url: string }>;
  meta_description: string;
  meta_keywords: string | null;
  meta_title: string;
  og_description: string;
  og_image: string;
  og_title: string;
  og_type: string;
  page_layout: string | null;
  publish_time: string;
  related_posts: Array<any>;
  relatedproduct_id: number | null;
  relative_url: string | null;
  search: string | null;
  secret: string | null;
  short_content: string | null;
  short_filtered_content: string;
  tag_id: number | null;
  tags: Array<any>;
  type: string | null;
  update_time: string;
  views_count: number;
  featured_image: string;
  featured_img_alt: string | null;
  identifier: string;
  position: number;
  post_id: number;
  post_url: string;
  title: string;
}
// ... existing code ...
export default function PostDetail() {
  const [dataParam, setDataParam] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<BlogPosts | null>(null);
  const [activeTab2, setActiveTab2] = useState(19);
  const [newsData1, setNewsData1] = useState<BlogPost | null>(null);
  const [visibleItems, setVisibleItems] = useState(3); // New state for visible items
  const [newsData2, setNewsData2] = useState<BlogPost[] | null>(null);
  const [newsData3, setNewsData3] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const tabIds: { [key: string]: number } = {
    "Trang Chủ": 19,
    "Tin Công Nghệ": 9,
    "Khám Phá": 10,
    "Đánh Giá": 12,
    "Thủ Thuật, Q&A": 14,
    "Khuyến Mãi": 20,
    "Tin Tức Sự Kiện": 27,
    "Tuyển Dụng": 21,
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running in the browser
      const queryParams = new URLSearchParams(window.location.search);
      const dataValue = queryParams.get("page");
      const activeTab2Value = queryParams.get("activeTab2");
      setDataParam(dataValue);
      setActiveTab2(activeTab2Value ? parseInt(activeTab2Value) : 19);
    }
  }, [typeof window !== "undefined" ? window.location.search : null]); // Update only if in the browser

  useEffect(() => {
    if (dataParam) {
      // Kiểm tra nếu dataParam không null
      fetchBlogPostsData(); // Gọi hàm fetchBlogPostsData khi dataParam thay đổi
    }
  }, [dataParam]);
  console.log(dataParam);
  const variables = {
    url_key: dataParam,
  };

  async function fetchBlogPostsData() {
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryBNewDetail,
          variables,
        }),
      }
    );
    const data = await response.json();
    console.log("data data", data);

    // Check if data exists before setting state
    if (data && data.data && data.data.blogPostByUrlKey) {
      setNewsData(data.data.blogPostByUrlKey);
    } else {
      console.error("No data found for the given URL key.");
    }
  }

  useEffect(() => {
    if (dataParam) {
      fetchBlogPostsData(); // Load data again after changing URL
    }
  }, [dataParam]);
  const variablesNew = {
    filter: {
      category_id: {
        eq: tabIds[activeTab2],
      },
    },
    pageSize: 100,
    currentPage: 1,
    sortFiled: "publish_time",
    allPosts: false,
    sort: ["DESC"],
  };
  const variablesHot = {
    filter: {
      category_id: {
        eq: activeTab2,
      },
      is_featured: {
        eq: 1,
      },
    },
    pageSize: 100,
    currentPage: 1,
    sortFiled: "publish_time",
    allPosts: false,
    sort: ["DESC"],
  };

  async function fetchBlogPostsDataProduct() {
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
    setNewsData1(data.data.blogPosts.items);
  }
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
    fetchBlogPostsDataProduct();
    fetchBlogPostsDataNew();
    fetchBlogPostsDataHot();
  }, [activeTab2]);
  console.log("dataaaaaaaaaa", newsData);
  async function fetchBlogPostsDataHot() {
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
          variables: variablesHot,
        }),
      }
    );
    const data = await response.json();
    setNewsData3(data.data.blogPosts.items);
    setLoading(false); // Set loading to false after fetching
  }
  useEffect(() => {
    fetchBlogPostsDataProduct();
    fetchBlogPostsDataNew();
    fetchBlogPostsDataHot();
  }, [activeTab2]);
  console.log("dataaaaa new 3", newsData3);
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 5); // Load 5 more items
  };
  const handlePostClick = (postUrl: string) => {
    const newDataParam = new URL(postUrl).pathname.split("/").pop() || "";
    setDataParam(newDataParam); // Update dataParam immediately
    router.push(`/chi-tiet-tin-tuc?page=${newDataParam}`); // Updated to remove activeTab2 from the URL
    setVisibleItems(5);
  };

  return (
    <div className="NewSub-pageNew">
      <div className="container">
        <Breadcrumb
          items={[
            {
              title: <Link href="https://bachlongmobile.com/">Trang Chủ</Link>,
            },
            {
              title: <Link href="/TinTuc">Tin tức</Link>,
            },
            {
              title: (
                <Link
                  href=""
                  style={
                    {
                      // whiteSpace: "nowrap",
                      // overflow: "hidden",
                      // textOverflow: "ellipsis",
                      // display: "block",
                      // maxWidth: "100%",
                    }
                  }
                >
                  {newsData?.title || "Loading..."}
                </Link>
              ), // Chỉ hiển thị dòng đầu tiên
            },
          ]}
        />
        {loading ? ( // Show spinner while loading
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Spin size="large" /> {/* Ant Design Spin component */}
          </div>
        ) : (
          <Row className="NewSub-box-container">
            <Col span={16} className="NewSub-box-container-Col">
              <div className="NewSub-box-shadow">
                {newsData && ( // Render title only when newsData is available
                  <>
                    <p className="NewSub-title">{newsData.title}</p>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <img
                        className="NewSub-img-author"
                        src={icBachLong.src}
                        alt=""
                      />
                      <div style={{ padding: "10px" }}>
                        <p style={{ paddingBottom: "6px" }}>
                          {newsData.author?.name}
                        </p>
                        <p>
                          {newsData.update_time
                            ? new Date(
                                newsData.update_time
                              ).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div
                      className="test-css-NewsSub"
                      contentEditable="false"
                      dangerouslySetInnerHTML={{
                        __html: `${newsData?.filtered_content}`,
                      }}
                    ></div>
                  </>
                )}
              </div>
            </Col>
            <Col
              span={8}
              className="NewSub-box-container-Col"
              style={{ position: "relative" }}
            >
              <div className="sticky-col">
                <h2
                  className="newSubHot-newTitle"
                  style={{ padding: "0px 10px 10px" }}
                >
                  Tin mới nhất
                </h2>
                {Array.isArray(newsData1) &&
                  newsData1.length > 0 && // Check if newsData1 has items
                  newsData1
                    .sort(
                      (a, b) =>
                        new Date(b.publish_time).getTime() -
                        new Date(a.publish_time).getTime()
                    )
                    .slice(0, visibleItems) // Show only visible items
                    .map((post, index) => (
                      <div
                        key={index}
                        className="NewSub-NewHot"
                        onClick={() => handlePostClick(post.post_url)}
                      >
                        <img
                          style={{ borderRadius: "10px" }}
                          src={post.first_image}
                          alt=""
                        />
                        <h3 className="NewSub-titleNewHot">{post.title}</h3>
                      </div>
                    ))}

                <div style={{ textAlign: "center", marginTop: "0px" }}>
                  <Link href="/TinTuc">
                    <button
                      style={{
                        color: "red",
                        border: "1px solid red",
                        padding: "10px 16px",
                        borderRadius: "10px",
                      }}
                    >
                      Xem thêm
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {newsData2 && newsData2.length > 0 && (
          <>
            <h2 className="newSubHot-newTitle">Tin xem nhiều nhất</h2>
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
                .sort((a, b) => b.views_count - a.views_count)
                .map((post, index) => (
                  <SwiperSlide key={index}>
                    <a onClick={() => handlePostClick(post.post_url)}>
                      <div className="NewSubHot-cardPostView">
                        <img
                          className="NewSubHot-cardPostView-img"
                          src={post.first_image}
                          alt={post.title}
                        />
                        <h2 className="NewSubHot-cardPostView-title">
                          {post.title}
                        </h2>
                        <div>
                          <div className="NewSubHot-cardPostView-tabInfo">
                            <div className="author">
                              <Image
                                alt="User icon"
                                loading="lazy"
                                className="NewSubHot-icUser"
                                src={icUser}
                              />
                            </div>
                            <span>{post?.author?.name}</span>
                            <div>
                              <span>
                                {new Date(
                                  post.creation_time
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        )}

        {/* <div className="newSubHot-container">
          {Array.isArray(newsData3) &&
            newsData3.length > 0 && ( // Check if newsData3 has items
              <>
                <h2
                  className="newSubHot-newTitle"
                  style={{ padding: "10px 10px" }}
                >
                  Tin nổi bật
                </h2>
                {newsData3
                  .sort(
                    (a, b) =>
                      new Date(b.publish_time).getTime() -
                      new Date(a.publish_time).getTime()
                  )
                  .slice(0, visibleItems) // Show only visible items
                  .map((post, index) => (
                    <div
                      key={index}
                      className="NewSub-NewHot"
                      onClick={() => handlePostClick(post.post_url)}
                    >
                      <img
                        style={{ borderRadius: "10px" }}
                        src={post.first_image}
                        alt=""
                      />
                      <h3 className="NewSub-NewHot-titleNewHot">
                        {post.title}
                      </h3>
                    </div>
                  ))}
                {visibleItems <
                  (Array.isArray(newsData3) ? newsData3.length : 0) && (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={handleLoadMore}
                      style={{
                        color: "red",
                        border: "1px solid red",
                        padding: "10px 16px",
                        borderRadius: "10px",
                      }}
                    >
                      Xem thêm
                    </button>
                  </div>
                )}
              </>
            )}
        </div> */}
      </div>
    </div>
  );
}
