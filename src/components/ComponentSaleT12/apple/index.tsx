"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DecorProduct from "../../../../public/flase-sale/IC-DECOR.png";
import DecorWomen from "../../../../public/flase-sale/ap-author.webp";
import FrameProduct from "../../../../public/2011/f1v1.png";
import { Skeleton, Spin } from "antd";
import "./apple.scss";
import Link from "next/link";
import Image from "next/image";
import { useProductSaleData } from "../../../app/hooks/useProductSaleData";
import DecorProduct2 from "../../../../public/flase-sale/dragon-sale.png";
export interface Product {
  id: number;
  name: string;
  url_key: string;
  image: {
    url: string;
  };
  attributes: any;
  price_range: {
    minimum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
  };
}
interface DailySalesData {
  data: {
    DailySales: {
      items: DailySale[];
      page_info: PageInfo;
      total_count: number;
    };
  };
}

interface DailySale {
  end_date: string;
  start_date: string;
  color_code: string;
  meta_image: string;
  meta_image_mobile: string;
  meta_image_product?: string | null;
  list_item: any[];
  identifier?: string | null;
  entity_id: number;
  items: SaleItem[];
  priority: string;
  show_in_home?: boolean | null;
  status: number;
  title: string;
}

interface PageInfo {
  current_page: number;
  page_size: number;
  total_pages: number;
}

interface SaleItem {
  rating_summary_daily_sale?: string | null;
  price_original: string;
  entity_id: number;
  product: Products;
  product_id: number;
  sale_price: number;
  sale_qty: number;
  saleable_qty: number;
  sold_qty: number;
  start_date?: string | null;
  image_banner_sale?: string | null;
}

interface Products {
  __typename: string;
  sku: string;
  uid: string;
  name: string;
  url_key: string;
  categories: Category[];
  new_from_date?: string | null;
  new_to_date?: string | null;
  rating_summary: number;
  review_count: number;
  image: ProductImage;
  price_range: PriceRange;
  color?: number | null;
  country_of_manufacture?: string | null;
  daily_sale?: any | null;
}

interface Category {
  name: string;
  url_key: string;
  url_path: string;
  level: number;
  uid: string;
  path: string;
}

interface ProductImage {
  url: string;
}

interface PriceRange {
  __typename: string;
  maximum_price: PriceDetails;
  minimum_price: PriceDetails;
}

interface PriceDetails {
  discount: Discount;
  final_price: Price;
  regular_price: Price;
}

interface Discount {
  amount_off: number;
  percent_off: number;
}

interface Price {
  currency: string;
  value: number;
}

const query = `
 query getProducts(
  $search: String
  $filter: ProductAttributeFilterInput
  $sort: ProductAttributeSortInput
  $pageSize: Int
  $currentPage: Int
) {
  products(
    search: $search
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      ...ProductInterfaceField
    }
  }
}
fragment ProductInterfaceField on ProductInterface {
  name
  url_key
  image {
    url
  }
  attributes {
    attribute_code
    value
  }
  price_range {
    minimum_price {
      final_price {
        value
        currency
      }
    }
  }
}
`;

const variables = {
  filter: {
    category_uid: {
      eq: "NDA2",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

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

const AppleList: React.FC = () => {
  async function fetchProductListDataApple() {
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    const data = await response.json();
    return data.data.products.items as Product[];
  }
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataAppleBlackFriday"],
    queryFn: fetchProductListDataApple,
    staleTime: 300000,
  });

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredData(data || []);
    } else {
      const filtered = data?.filter((product) =>
        product.name.toLowerCase().includes(activeTab.toLowerCase())
      );
      const sortedFiltered = filtered?.sort((a, b) => {
        return (
          a.price_range.minimum_price.final_price.value -
          b.price_range.minimum_price.final_price.value
        );
      });

      setFilteredData(sortedFiltered || []);
    }
  }, [data]);

  const [activeTab, setActiveTab] = useState<string>("iPhone");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [dataTitle, setDataTitle] = useState<ApiResponse | null>(null);
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
                  eq: "banner-page-deal-dau-thang-12",
                },
              },
            },
          }),
        }
      );

      const result = await response.json();
      setDataTitle(result);
    } catch (err) {}
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);

  const visibleProducts = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div
      className="product-20-11"
      style={{
        marginBottom: "20px",
      }}
    >
      <div>
        <div className="upgrade-list">
          <div className="container">
            <div style={{ border: "3px solid #fff", borderRadius: "20px" }}>
              <div
                style={{ border: "10px solid #F68F3E", borderRadius: "20px" }}
              >
                <div className="women-decor" style={{ paddingBottom: "20px" }}>
                  {dataTitle ? (
                    dataTitle?.data?.Slider?.items[0]?.Banner?.items
                      .filter((item) =>
                        item.name.includes("title iphone deal đầu tháng")
                      )
                      .map((item, index) => (
                        <div key={index}>
                          <img
                            src={item.media || ""}
                            alt={`privilege-${index + 1}`}
                          />
                        </div>
                      ))
                  ) : (
                    <Spin>
                      <div style={{ width: 200, height: 200 }} />
                    </Spin>
                  )}
                </div>
                {filteredData && filteredData.length > 0 ? (
                  <div className="upgrade">
                    {filteredData
                      .slice(0, visibleCount)
                      .map((product: any, index: number) => (
                        <Link
                          key={index}
                          href={`https://bachlongmobile.com/products/${product?.url_key}`}
                          passHref
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="upgrade-item">
                            <div className="upgrade-item-header">
                              <span className="percent">Trả góp 0%</span>
                              {/(iphone|ipad|macbook|watch)/i.test(
                                product?.product?.name
                              ) && (
                                <Image
                                  className="ic-auth"
                                  src={DecorWomen}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="upgrade-item-img">
                              <div className="img-content">
                                <Image
                                  src={product?.image?.url}
                                  width={1400}
                                  height={1200}
                                  quality={100}
                                  alt={`product-${index}`}
                                />
                              </div>
                              <div className="frame-product">
                                <Image
                                  src={FrameProduct}
                                  width={500}
                                  height={500}
                                  quality={100}
                                  alt="frame-product"
                                />
                              </div>
                            </div>
                            <div className="upgrade-item-content">
                              <h4 className="upgrade-item-content-tt">
                                {product?.name}
                              </h4>
                              <div className="upgrade-item-content-body">
                                <div className="upgrade-item-content-body-price">
                                  {Number(
                                    product?.price_range?.minimum_price
                                      ?.final_price?.value
                                  )?.toLocaleString("vi-VN")}{" "}
                                  VNĐ
                                </div>
                                <div className="upgrade-item-content-body-reduced">
                                  <div className="price-reduced">
                                    {Number(
                                      product?.attributes[0]?.value
                                    )?.toLocaleString("vi-VN")}{" "}
                                    VNĐ
                                  </div>
                                  <div className="percent">
                                    -
                                    {Math.ceil(
                                      100 -
                                        (product.price_range?.minimum_price
                                          ?.final_price?.value /
                                          product.attributes[0]?.value) *
                                          100
                                    )}
                                    %
                                  </div>
                                </div>
                                <div
                                  style={{
                                    backgroundColor: "rgba(215, 0, 24, .08)",
                                    borderRadius: "0.4rem",
                                    color: "#d70018",
                                    padding: "0.8rem",
                                    textAlign: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.2rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    Giá thu bằng giá bán - Trợ giá lên đến 100%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <div className="upgrade">
                    {[...Array(10)].map((_, index) => (
                      <div
                        key={index}
                        className="upgrade-item"
                        style={{ padding: "10px" }}
                      >
                        <div className="">
                          <Skeleton.Image
                            active
                            style={{
                              width: "210px",
                              height: "210px",
                              marginBottom: "10px",
                            }}
                          />
                        </div>
                        <div className="upgrade-item-content">
                          <Skeleton.Input
                            active
                            block
                            style={{
                              width: "100%",
                              marginBottom: "8px",
                            }}
                          />
                          <Skeleton.Input
                            active
                            block
                            style={{
                              width: "100%",
                              marginBottom: "8px",
                            }}
                          />
                          <Skeleton.Input
                            active
                            block
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {visibleCount < filteredData?.length ? (
                  <div style={{ textAlign: "center", margin: "10px 0px" }}>
                    <button
                      onClick={loadMore}
                      style={{
                        backgroundColor: "rgb(246 143 62)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Xem thêm
                    </button>
                  </div>
                ) : (
                  <div style={{ height: "50px" }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleList;
