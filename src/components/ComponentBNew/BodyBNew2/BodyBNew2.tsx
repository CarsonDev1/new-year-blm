"use client";
import React, { useEffect, useState } from "react";
import "./BodyBNew2.scss";
import { Col, Row } from "antd";
import Image from "next/image";
import test from "../../../../public/test.png";
import icUser from "../../../../public/ic-user-4.svg";
import { BlogPost, queryBNew } from "../../../app/utils/utils";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

interface ProductModalProps {
  activeTab2: number;
}
export default function BodyBNew2({ activeTab2 }: ProductModalProps) {
  const router = useRouter();
  const [newsData2, setNewsData2] = useState<BlogPost[] | null>(null);
  const [newsData3, setNewsData3] = useState<BlogPost[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(5); // State to track the number of visible posts
  const [visibleCountProduct, setVisibleCountProduct] = useState(5); // State to track the number of visible product posts
  const query = `query blogPosts( $filter: BlogPostsFilterInput $pageSize: Int $currentPage: Int $sortFiled: String $allPosts: Boolean $sort: [String] ) { blogPosts( filter: $filter pageSize: $pageSize currentPage: $currentPage sortFiled: $sortFiled allPosts: $allPosts sort: $sort ) { items { author { author_id author_url content creation_time custom_theme_to facebook_page_url featured_image filtered_content identifier instagram_page_url is_active layout_update_xml linkedin_page_url meta_description meta_title name page_layout relative_url title twitter_page_url type url } author_id canonical_url category_id content_heading creation_time end_time featured_image featured_img_alt featured_list_image featured_list_img_alt first_image identifier is_active page_layout position post_id post_url publish_time search title type update_time views_count categories { canonical_url category_id category_level category_url category_url_path content content_heading custom_layout custom_layout_update_xml custom_theme custom_theme_from custom_theme_to display_mode featured_img identifier include_in_menu is_active layout_update_xml meta_description meta_keywords meta_title page_layout parent_category_id path position posts_count posts_sort_by relative_url title type breadcrumbs { category_id category_level category_name category_uid category_url_key category_url_path } } filtered_content media_gallery { url } meta_description meta_keywords meta_title promotion_image tags { content custom_layout custom_layout_update_xml custom_theme custom_theme_from custom_theme_to identifier is_active layout_update_xml meta_description meta_keywords meta_robots meta_title page_layout relative_url tag_id tag_url title type } tag_id short_content short_filtered_content } total_count total_pages type } }`;
  const queryTest = `query blogPosts( $filter: BlogPostsFilterInput $pageSize: Int $currentPage: Int $sortFiled: String $allPosts: Boolean $sort: [String] ) { blogPosts( filter: $filter pageSize: $pageSize currentPage: $currentPage sortFiled: $sortFiled allPosts: $allPosts sort: $sort ) { items { author { author_id author_url content creation_time custom_theme_to facebook_page_url featured_image filtered_content identifier instagram_page_url is_active layout_update_xml linkedin_page_url meta_description meta_title name page_layout relative_url title twitter_page_url type url } author_id canonical_url category_id content_heading creation_time end_time featured_image featured_img_alt featured_list_image featured_list_img_alt first_image identifier is_active page_layout position post_id post_url publish_time search title type update_time views_count categories { canonical_url category_id category_level category_url category_url_path content content_heading custom_layout custom_layout_update_xml custom_theme custom_theme_from custom_theme_to display_mode featured_img identifier include_in_menu is_active layout_update_xml meta_description meta_keywords meta_title page_layout parent_category_id path position posts_count posts_sort_by relative_url title type breadcrumbs { category_id category_level category_name category_uid category_url_key category_url_path } } filtered_content media_gallery { url } meta_description meta_keywords meta_title promotion_image tags { content custom_layout custom_layout_update_xml custom_theme custom_theme_from custom_theme_to identifier is_active layout_update_xml meta_description meta_keywords meta_robots meta_title page_layout relative_url tag_id tag_url title type } tag_id short_content short_filtered_content } total_count total_pages type } }`;
  const variablesNew = {
    filter: {
      category_id: {
        eq: activeTab2,
      },
    },
    pageSize: 100,
    currentPage: 1,
    sortFiled: "publish_time",
    allPosts: false,
    sort: ["DESC"],
  };

  const variablesProduct = {
    filter: { category_id: { eq: 22 } },
    pageSize: 1000,
    currentPage: 1,
    allPosts: false,
    sort: ["DESC"],
    sortFiled: "publish_time",
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
          query: query,
          variables: variablesProduct,
        }),
      }
    );
    const data = await response.json();
    console.log("2222222222222", data);
    setNewsData3(data.data.blogPosts.items);
  }
  async function fetchBlogPostsDataNew() {
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryTest,
          variables: variablesNew,
        }),
      }
    );
    const data = await response.json();
    console.log("dataaaa1111", data);
    setNewsData2(data.data.blogPosts.items);
  }

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Increase the count by 3
  };

  const loadMoreProductPosts = () => {
    setVisibleCountProduct((prevCount) => prevCount + 5); // Increase the count by 5
  };

  useEffect(() => {
    fetchBlogPostsDataNew();
    setVisibleCount(5);
    fetchBlogPostsDataProduct();
  }, [activeTab2]);

  console.log("New news data 3:>>>>>>>>>>>>>>>>>>", newsData2);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <div className="header-BodyBNew2">
      {newsData2 && newsData2.length > 0 ? (
        <>
          <h2 className="header-BodyBNew2-title">TIN TỨC MỚI NHẤT</h2>
          <Row
            className="header-BodyBNew2-cardRow"
            style={{
              position: "relative", // Thay đổi từ "fixed" thành "relative"
            }}
          >
            <Col span={14} className="header-BodyBNew2-CardCol">
              {newsData2 &&
                newsData2.slice(5, newsData2.length).map(
                  (
                    post,
                    index // Chỉnh sửa ở đây
                  ) => (
                    <div
                      style={{ display: "flex", marginBottom: "10px" }}
                      key={index}
                    >
                      <a
                        style={{ display: "flex" }}
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
                        <img
                          className="header-BodyBNew2-img"
                          src={post.first_image}
                          alt=""
                        />
                        <div style={{ padding: "10px" }}>
                          <p>{post.categories[0].meta_title}</p>
                          <h2 className="header-BodyBNew2-titleSub">
                            {post.title}
                          </h2>
                          <div className="header-BodyBNew2-cardPostView-tabInfo">
                            <div className="author">
                              <Image
                                alt="User icon"
                                loading="lazy"
                                className="header-BodyBNew2-icUser"
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
                          <p className="header-BodyBNew2-cardPostView-view">
                            {post.views_count} lượt xem
                          </p>
                        </div>
                      </a>
                    </div>
                  )
                )}
            </Col>
            <Col
              span={10}
              className="header-BodyBNew2-CardCol"
              style={{ position: "sticky", top: "0px", height: "max-content" }}
            >
              <div>
                <div>
                  {newsData3 && newsData3.length > 0 ? (
                    <>
                      <h2
                        className=""
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          padding: "10px 0",
                        }}
                      >
                        ƯU ĐÃI THANH TOÁN
                      </h2>
                      {newsData3
                        .slice(0, visibleCountProduct)
                        .map((post, index) => (
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "10px",
                            }}
                            key={index}
                            className="sticky-col-item"
                          >
                            <a
                              style={{ display: "flex" }}
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
                              <img
                                className="header-BodyBNew2-imgProduct"
                                src={post.first_image}
                                alt=""
                              />
                              <div style={{ padding: " 0px 10px" }}>
                                <h2 className="header-BodyBNew2-titleSubProduct">
                                  {post.title}
                                </h2>
                                <p className="header-BodyBNew2-cardPostView-view">
                                  {post.views_count} lượt xem
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}
                      {visibleCountProduct < newsData3.length && (
                        <Link href="https://bachlongmobile.com/promotion/">
                          <button className="header-BodyBNew2-cardPostView-load-more-button">
                            Xem thêm
                          </button>
                        </Link>
                      )}
                    </>
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
}
