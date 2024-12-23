/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import "./ProductAndroidNew.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import imagesTitle from "../../../../public/warehouse-discharge/PC_anroid giảm đến 8tr.png";
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

const variables1 = {
  filter: {
    category_uid: {
      eq: "Mzkx",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

const variables2 = {
  filter: {
    category_uid: {
      eq: "Mzkz",
    },
  },
  pageSize: 200,
  currentPage: 1,
};
const variables3 = {
  filter: {
    category_uid: {
      eq: "Mzky",
    },
  },
  pageSize: 200,
  currentPage: 1,
};
async function fetchProductListDataAndroidNew(selectedVariable: any) {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: selectedVariable,
    }),
  });

  const data = await response.json();
  console.log("Fetched data:", data);
  return data.data.products.items as Product[];
}

const ProductListIphone: React.FC = () => {
  const [mainTab, setMainTab] = useState("Apple");
  const [visibleCount, setVisibleCount] = useState(10);

  // Use variables1 for Apple and variables2 for Android
  const selectedVariable =
    mainTab === "Apple"
      ? variables1
      : mainTab === "Android"
      ? variables2
      : variables3;

  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataAndroidNew", mainTab],
    queryFn: () => fetchProductListDataAndroidNew(selectedVariable),
    staleTime: 300000,
  });

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div
      className="container-iphone-ProductOld-android-new"
      style={{ padding: "20px 0px 20px 0px" }}
    >
      <div className="container">
        <div
          className="OldForNew-Section-Container-leather-case-a1"
          id="item-leather-case"
        >
          <Image
            src={imagesTitle}
            alt=""
            style={{ padding: "0px 0px 20px 0px" }}
          />
          <div className="header-table-combo-pk">
            {/* <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">Phụ Kiện</h2>
            </div> */}
            <div className="tab-button-table-combo-pk">
              <button
                className={`btn-tab-buyPhone ${
                  mainTab === "Apple" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setMainTab("Apple")}
              >
                OPPO
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  mainTab === "iPad" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setMainTab("iPad")}
              >
                Samsung
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  mainTab === "Android" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setMainTab("Android")}
              >
                Xiaomi
              </button>
            </div>
          </div>

          {isLoading ? (
            <div
              className="loading container-spin flex h-28 items-center justify-center"
              style={{ height: "300px" }}
            >
              <Spin />
            </div>
          ) : data && data.length === 0 ? (
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
                {data?.slice(0, visibleCount).map((product) => (
                  <CardProduct
                    key={product?.id}
                    name={product?.name}
                    url_key={product?.url_key}
                    image={product?.image}
                    price_range={product.price_range}
                  />
                ))}
              </div>
              {visibleCount < (data?.length || 0) && (
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

export default ProductListIphone;
