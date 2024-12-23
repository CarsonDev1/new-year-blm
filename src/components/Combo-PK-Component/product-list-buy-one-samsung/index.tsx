"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Spin } from "antd";
import "./product-list.scss";

export interface Product {
  id: number;
  name: string;
  url_key: string;
  image: {
    url: string;
  };
  price_range: {
    minimum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
  };
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
  id
  name
  url_key
  image {
    url
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
      eq: "MzI4",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListDataBuyiPad() {
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

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataiPad"],
    queryFn: fetchProductListDataBuyiPad,
    staleTime: 300000,
  });

  const [activeTab, setActiveTab] = useState<string>("All");
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredData(data || []);
    } else {
      const filtered = data?.filter((product) =>
        product.name.toLowerCase().includes(activeTab.toLowerCase())
      );
      setFilteredData(filtered || []);
    }
  }, [activeTab, data]);

  if (isLoading) {
    return (
      <div className="loading container-spin">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }



  return (
    <div className="product-list" >
      <div className="upgrade-list">
        <div className="container">
          <div className="upgrade">
            <div className="upgrade-header">
              <h3 className="banner-slide-combo-title">iPad</h3>
            </div>


            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView="auto"
              speed={1000}
              navigation
              breakpoints={{
                300: {
                  slidesPerView: 2,
                },
                576: {
                  slidesPerView: 3,
                },
                850: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
              }}
            >
              {filteredData.map((product, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`https://bachlongmobile.com/products/${product.url_key}`}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="upgrade-item">
                      <div className="upgrade-item-img">
                        <Image
                          src={product.image.url}
                          width={1400}
                          height={1200}
                          quality={100}
                          alt={`product-${index}`}
                        />
                      </div>
                      <div className="upgrade-item-content">
                        <h4 className="upgrade-item-content-tt">
                          {product.name}
                        </h4>
                        <div className="upgrade-item-content-body">
                          <span className="upgrade-item-content-body-tt">
                            Giá:{" "}
                          </span>
                          <div className="upgrade-item-content-body-price">
                            {product.price_range.minimum_price.final_price.value.toLocaleString(
                              "vi-VN"
                            )}{" "}
                            {
                              product.price_range.minimum_price.final_price
                                .currency
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
