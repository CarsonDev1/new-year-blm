"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Spin } from "antd";
import "./product.scss";
import DecorProduct from "../../../../public/flase-sale/IC-DECOR.png";
import DecorWomen from "../../../../public/flase-sale/maycu.png";
import FrameProduct from "../../../../public/flase-sale/f5.png";
import { useProductSaleData } from "../../../app/hooks/useProductSaleData";
import DecorProduct2 from "../../../../public/halloween/ICON-DRAGON.png";
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
    aggregations {
      attribute_code
      count
      label
      options {
        count
        label
        value
        swatch_data {
          type
          value
        }
      }
      position
    }
    sort_fields {
      default
      options {
        label
        value
      }
    }
    total_count
    page_info {
      current_page
      page_size
      total_pages
    }  }
}
fragment ProductInterfaceField on ProductInterface {
 image_banner
  __typename
  sku
  uid
  name
  url_key
  url_suffix
  canonical_url
  stock_status
  categories {
    __typename
    name
    url_key
    url_path
    level
    uid
    position
    icon_image
    image
    path
  }
  id
  meta_description
  meta_keyword
  meta_title
  new_from_date
  new_to_date
  rating_summary
  review_count
  thumbnail {
    url
    position
  }
  image {
    url
  }
  price_range {
    ...PriceRangeField
  }
  ...CustomField
}
fragment CustomField on ProductInterface {
  color
  country_of_manufacture
  daily_sale {
    end_date
    entity_id
    sale_price
    sale_qty
    saleable_qty
    sold_qty
    start_date
    __typename
  }
  rating_summary_start {
    star_1
    star_2
    star_3
    star_4
    star_5
  }
  attributes {
    attribute_code
    label
    value
  }
}
fragment PriceRangeField on PriceRange {
  __typename
  maximum_price {
    ...ProductPriceField
  }
  minimum_price {
    ...ProductPriceField
  }
}
fragment ProductPriceField on ProductPrice {
  discount {
    amount_off
    percent_off
  }
  final_price {
    currency
    value
  }
  regular_price {
    currency
    value
  }
}
`;

const variables = {
  filter: {
    category_uid: {
      eq: "Mzc3",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListData() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  return data.data.products.items as Product[];
}

const ProductPercent: React.FC = () => {
  const {
    data: DataPercent,
    error,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["productPercentData"],
    queryFn: fetchProductListData,
    staleTime: 300000,
  });
  const { data } = useProductSaleData();
  const filteredDatassss = data?.filter(
    (item: any) => item.title === "SP Máy cũ 20/11"
  );

  const productSale = data?.[0]?.items;

  const productSaleNames = productSale?.map(
    (productSale: any) => productSale.product.name
  );
  const productSalePrices = productSale?.map(
    (productSale: any) => productSale.sale_price
  );

  const getProductSalePrice = (productName: string, originalPrice: number) => {
    if (productSaleNames && productSalePrices) {
      const saleIndex = productSaleNames.findIndex(
        (name: string) => name === productName
      );
      if (saleIndex !== -1) {
        return productSalePrices[saleIndex].toLocaleString("vi-VN");
      }
    }
    return originalPrice.toLocaleString("vi-VN");
  };

  const [activeTab, setActiveTab] = useState<string>("iPhone");
  const [activeSubTab, setActiveSubTab] = useState<string>("");
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
                  eq: "banner-nha-giao-viet-nam",
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
  const tabs = [
    {
      name: "iPhone",
    },
    {
      name: "Samsung",
    },
  ];

  useEffect(() => {
    const filtered = DataPercent?.filter((product) => {
      const matchesTab =
        (activeTab === "iPhone 16" && activeSubTab === "iPhone 16") ||
        (activeTab === "iPhone 15" && activeSubTab === "iPhone 15") ||
        (activeTab === "iPhone 14" && activeSubTab === "iPhone 14")
          ? product.name.includes(activeTab) &&
            !product.name.includes("Pro") &&
            !product.name.includes("Plus")
          : product.name.includes(activeTab);

      const matchesSubTab = activeSubTab
        ? activeSubTab.includes("Pro Max")
          ? product.name.includes("Pro Max")
          : activeSubTab.includes("Pro")
          ? product.name.includes("Pro") && !product.name.includes("Pro Max")
          : product.name.includes(activeSubTab)
        : true;

      return matchesTab && matchesSubTab;
    });
    setFilteredData(filtered || []);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(4);
      } else {
        setVisibleCount(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [DataPercent, activeTab, activeSubTab]);

  if (isLoading) {
    return (
      <div className="container-spin">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

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
            <div
              style={{
                padding: "10px",
                backgroundColor: "rgb(179 111 0)",
                borderRadius: "5px",
              }}
            >
              <div style={{ backgroundColor: "#004b20", padding: "10px" }}>
                <div className="women-decor">
                  {dataTitle ? (
                    dataTitle?.data?.Slider?.items[0]?.Banner?.items
                      .filter((item) =>
                        item.name.includes("title máy 99 nhà giáo")
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
                {/* <div className="tabs">
                  {tabs.map((tab) => (
                    <div key={tab.name}>
                      <button
                        onClick={() => {
                          setActiveTab(tab.name);
                        }}
                        className={
                          activeTab === tab.name ? "tab active" : "tab"
                        }
                        style={{
                          color: activeTab === tab.name ? "#fff" : "#000",
                          backgroundColor:
                            activeTab === tab.name ? "#ff7518" : "#fff",
                          padding: "12px 24px",
                          margin: "8px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow:
                            activeTab === tab.name
                              ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                              : "none",
                        }}
                      >
                        {tab.name}
                      </button>
                    </div>
                  ))}
                </div> */}

                {/* <div style={{ display: 'flex', marginBottom: '12px' }} className='sub-tab-list'>
						{tabs
							.find((tab) => tab.name === activeTab)
							?.subTabs.map((subTab) => (
								<button
									key={subTab}
									onClick={() => setActiveSubTab(subTab)}
									className={activeSubTab === subTab ? 'sub-tab active' : 'sub-tab'}
									style={{
										color: activeSubTab === subTab ? 'white' : '#000',
										backgroundColor: activeSubTab === subTab ? '#ef373e' : '#f1f1f1',
										border: activeSubTab === subTab ? '1px solid #ef373e' : '1px solid #ccc',
										padding: '5px 10px',
										margin: '5px',
										borderRadius: '5px',
										cursor: 'pointer',
									}}
								>
									{subTab}
								</button>
							))}
					</div> */}

                {filteredDatassss && filteredDatassss.length > 0 ? (
                  <div className="upgrade">
                    {filteredDatassss?.[0]?.items
                      ?.slice(0, visibleCount)
                      .map((product: any, index: number) => (
                        <Link
                          key={index}
                          href={`https://bachlongmobile.com/products/${product?.product?.url_key}`}
                          passHref
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="upgrade-item">
                            <div className="upgrade-item-header">
                              <span className="percent">Trả góp 0%</span>
                            </div>
                            <div className="upgrade-item-img">
                              <div className="img-content">
                                <Image
                                  src={product?.product?.image?.url}
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
                                {product?.product?.name}
                              </h4>
                              <div className="upgrade-item-content-body">
                                <div className="upgrade-item-content-body-price">
                                  {product?.sale_price?.toLocaleString("vi-VN")}{" "}
                                  VNĐ
                                </div>
                                <div className="upgrade-item-content-body-reduced">
                                  <div className="price-reduced">
                                    {Number(
                                      product?.price_original
                                    )?.toLocaleString("vi-VN")}
                                    VNĐ
                                  </div>
                                  <div className="percent">
                                    -
                                    {Math.ceil(
                                      100 -
                                        (product.sale_price /
                                          product.price_original) *
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                      flexDirection: "column",
                    }}
                  >
                    <Spin />
                  </div>
                )}
                {visibleCount < filteredDatassss?.[0]?.items.length && (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={loadMore}
                      style={{
                        backgroundColor: "#ff7518",
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPercent;
