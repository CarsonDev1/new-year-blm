"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Spin } from "antd";
import DecorProduct from "../../../../public/flase-sale/IC-DECOR.png";
import DecorWomen from "../../../../public/flase-sale/PC_phukienapple.png";
// import FrameProduct from "../../../../public/black-friday/f80.png";
import "./apple.scss";
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
      eq: "Mzg2",
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

const ToyList: React.FC = () => {
  const {
    data: DataToy,
    error,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["productToy"],
    queryFn: fetchProductListData,
    staleTime: 300000,
  });

  const { data } = useProductSaleData();
  const filteredDatassss = data?.filter(
    (item: any) => item.title === "SP PK Flash Sale Tuần"
  );

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
                  eq: "banner-page-black-friday",
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
  useEffect(() => {
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
  }, [DataToy]);

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

  const sendDataToSheet = async (product: any) => {
    try {
      const formattedProduct = {
        id: product?.product.sku,
        name: product.product.name,
        price: product.sale_price,
        url: `https://bachlongmobile.com/products/${product.product.url_key}`,
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby1FLauF5ueVPviTiibysZqLcCWabJsgMmjen7w6kMb5wkM6aMgOPGG7-KxoCj_VxDf/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedProduct),
        }
      );
      console.log("Data sent successfully:", response);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const loadMore = () => {
    const productsToSend = visibleProducts;
    productsToSend.forEach((product) => {
      sendDataToSheet(product);
    });
    setVisibleCount((prevCount) => prevCount + 10);
  };
  const seeee = () => {
    const productsToSend = filteredDatassss?.[0]?.items;
    productsToSend.forEach((product: any) => {
      sendDataToSheet(product);
    });
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
            <div>
              <div className="border_black_friday">
                <div className="women-decor" style={{ paddingBottom: "20px" }}>
                  {dataTitle ? (
                    dataTitle?.data?.Slider?.items[0]?.Banner?.items
                      .filter((item) =>
                        item.name.includes(
                          "title sản phẩm phụ kiện page black friday"
                        )
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

                {filteredDatassss && filteredDatassss.length > 0 ? (
                  <div className="upgrade">
                    {filteredDatassss?.[0]?.items
                      ?.slice(0, visibleCount)
                      .sort((a: any, b: any) => a.sale_price - b.sale_price)
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
                              {/* <span className="percent">Trả góp 0%</span> */}
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
                                {/* <Image
                                  src={FrameProduct}
                                  width={500}
                                  height={500}
                                  quality={100}
                                  alt="frame-product"
                                /> */}
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
                                    )?.toLocaleString("vi-VN")}{" "}
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
                {visibleCount < filteredDatassss?.[0]?.items?.length ? (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={loadMore}
                      style={{
                        backgroundColor: "rgb(255 0 0)",
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
              <button
                onClick={seeee}
                style={{
                  backgroundColor: "rgb(255 0 0)",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                gyui
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="phu-kien-black-friday" />
    </div>
  );
};

export default ToyList;
