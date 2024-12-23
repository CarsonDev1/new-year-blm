/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./product-list-leather-case.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import imagesPK from "../../../../public/combo-pk/bao da pc.png";
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
      eq: "MTg=",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListDataBaoDa() {
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
  console.log("data", data);
  return data.data.products.items as Product[];
}

const SectionBaoDa: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataBaoDa", variables.filter.category_uid.eq], // Thêm category_uid vào queryKey
    queryFn: fetchProductListDataBaoDa,
    staleTime: 300000,
  });

  const [activeTab, setActiveTab] = useState<string>("Apple"); // Đặt giá trị mặc định là "All"
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [filteredDataSub, setFilteredDataSub] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(10);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(10);
  // Danh sách các hãng
  const brands = ["Apple", "Jinya", "Mipow", "UNIQ", "Spigen"];
  const [subActiveTab, setSubActiveTab] = useState<string>("16");
  useEffect(() => {
    setSubActiveTab("16");
  }, []);

  useEffect(() => {
    const filtered = data?.filter(
      (product) =>
        product?.name.toLowerCase().includes(activeTab.toLowerCase()) ||
        (activeTab === "Apple" &&
          (product?.name.toLowerCase().includes("Silicone") ||
            product?.name.toLowerCase().includes("finewoven") ||
            product?.name.toLowerCase().includes("silicon") ||
            product?.name.toLowerCase().includes("suốt ma") ||
            product?.name.toLowerCase().includes("beats")))
    );
    setFilteredData(filtered || []);
    setVisibleCount(10);
    setVisibleProducts(10);
    setIsExpanded(false);
    setSubActiveTab("16"); // Ensure subActiveTab is set correctly
    console.log("t test", filtered);
  }, [activeTab, data]);

  // New useEffect to filter by subActiveTab

  useEffect(() => {
    let filtered = filteredData.filter((product) =>
      product?.name.toLowerCase().includes(subActiveTab.toLowerCase())
    );

    // If there are no products for iPhone 16, fall back to iPhone 15
    if (subActiveTab === "16" && filtered.length === 0) {
      setSubActiveTab("15");
      filtered = filteredData.filter((product) =>
        product?.name.toLowerCase().includes("15")
      );
    }

    setFilteredDataSub(filtered || []);
    setVisibleCount(10);
    setVisibleProducts(10);
  }, [subActiveTab, filteredData]);
  if (error) {
    return <div>Error loading data</div>;
  }

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Increase the count by 6
    setVisibleProducts((prevVisible) => prevVisible + 10); // Update visibleProducts to show more items
  };
  return (
    <div className="OldForNew-Section-leather-case" id="item-leather-case">
      <div className="container">
        <div className="OldForNew-Section-Container-leather-case">
          <Image src={imagesPK} alt="PK" className="images-pk" />
          <div className="header-table-combo-pk">
            {/* <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">Phụ Kiện Bao Da, Ốp Lưng</h2>
            </div> */}
            <div>
              <div className="tab-button-table-combo-pk">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    className={`btn-tab-buyPhone ${
                      activeTab === brand ? "btn-tab-buyPhone_active" : ""
                    }`}
                    onClick={() => {
                      setActiveTab(brand);
                      setSubActiveTab("All"); // Reset sub-tab when changing main tab
                    }}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              <div className="tab-button-table-combo-pk-sub">
                {filteredData &&
                  filteredData.length > 0 && ( // Check if there is data
                    <>
                      {filteredData.some((product) =>
                        product.name.toLowerCase().includes("16")
                      ) && ( // Check for iPhone 16
                        <button
                          key="16"
                          className={`btn-tab-buyPhone-sub ${
                            subActiveTab === "16"
                              ? "btn-tab-buyPhone_active"
                              : ""
                          }`}
                          onClick={() => setSubActiveTab("16")}
                        >
                          iPhone 16
                        </button>
                      )}
                      {filteredData.some((product) =>
                        product.name.toLowerCase().includes("15")
                      ) && ( // Check for iPhone 15
                        <button
                          key="15"
                          className={`btn-tab-buyPhone-sub ${
                            subActiveTab === "15"
                              ? "btn-tab-buyPhone_active"
                              : ""
                          }`}
                          onClick={() => setSubActiveTab("15")}
                        >
                          iPhone 15
                        </button>
                      )}
                      {filteredData.some((product) =>
                        product.name.toLowerCase().includes("14")
                      ) && ( // Check for iPhone 14
                        <button
                          key="14"
                          className={`btn-tab-buyPhone-sub ${
                            subActiveTab === "14"
                              ? "btn-tab-buyPhone_active"
                              : ""
                          }`}
                          onClick={() => setSubActiveTab("14")}
                        >
                          iPhone 14
                        </button>
                      )}
                    </>
                  )}
              </div>
            </div>
          </div>
          {isLoading && (
            <div
              className="loading container-spin flex h-28 items-center justify-center"
              style={{
                height: "300px",
              }}
            >
              <Spin />
            </div>
          )}
          {filteredDataSub && filteredDataSub.length === 0 && !isLoading ? (
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
                {filteredDataSub?.slice(0, visibleProducts).map((product) => (
                  <CardProduct
                    key={product?.id}
                    name={product?.name}
                    url_key={product?.url_key}
                    image={product?.image}
                    price_range={product?.price_range}
                  />
                ))}
              </div>

              {visibleCount < (filteredDataSub?.length || 0) && ( // Check if more products are available
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

export default SectionBaoDa;
