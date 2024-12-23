/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./product-list-loudspeaker.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import imagesPK from "../../../../public/combo-pk/Phụ Kiện Tai nghe.png";

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

const variablesTaiNghe = {
  filter: {
    category_uid: {
      eq: "MTU2", // UID for Loa
    },
  },
  pageSize: 200,
  currentPage: 1,
};

const variablesLoa = {
  filter: {
    category_uid: {
      eq: "MjU=", // UID for Tai Nghe
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListDataLoa(activeTab: string) {
  const variables = activeTab === "Loa" ? variablesLoa : variablesTaiNghe;
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

const Section5: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Tai Nghe");
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataLoa", activeTab],
    queryFn: () => fetchProductListDataLoa(activeTab),
    staleTime: 300000,
  });

  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(10);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setFilteredData(data || []);
    setVisibleProducts(10);
    setIsExpanded(false);
  }, [data]);

  const toggleProducts = () => {
    if (isExpanded) {
      setVisibleProducts(10);
      setIsExpanded(false);
    } else {
      setVisibleProducts(filteredData.length);
      setIsExpanded(true);
    }
  };

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 10);
    setVisibleProducts((prevVisible) => prevVisible + 10);
  };

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="OldForNew-Section-loudspeaker" id="item-loudspeaker">
      <div className="container">
        <div className="OldForNew-Section-Container-loudspeaker">
          <Image src={imagesPK} alt="PK" className="images-pk" />
          <div className="header-table-combo-pk-loa">
            <button
              className={`btn-tab-buyPhone-loa ${
                activeTab === "Tai Nghe" ? "btn-tab-buyPhone_active" : ""
              }`}
              onClick={() => setActiveTab("Tai Nghe")}
            >
              Tai Nghe
            </button>
            <button
              className={`btn-tab-buyPhone-loa ${
                activeTab === "Loa" ? "btn-tab-buyPhone_active" : ""
              }`}
              onClick={() => setActiveTab("Loa")}
            >
              Loa
            </button>
          </div>

          {isLoading && (
            <div
              className="loading container-spin flex h-28 items-center justify-center"
              style={{ height: "300px" }}
            >
              <Spin />
            </div>
          )}

          {filteredData.length === 0 && !isLoading ? (
            <div className="no-products-message">
              <Image
                src={noProducts}
                alt="no-products"
                className="no-products-image"
              />
              <span>Không có sản phẩm</span>
            </div>
          ) : (
            <>
              <div className="OldForNew-Section5-ItemSlider">
                {filteredData.slice(0, visibleProducts).map((product) => (
                  <CardProduct
                    key={product?.id}
                    name={product?.name}
                    url_key={product?.url_key}
                    image={product?.image}
                    price_range={product?.price_range}
                  />
                ))}
              </div>

              {visibleCount < (filteredData?.length || 0) && (
                <div className="load-more-container">
                  <button onClick={loadMorePosts}>Xem thêm</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section5;
