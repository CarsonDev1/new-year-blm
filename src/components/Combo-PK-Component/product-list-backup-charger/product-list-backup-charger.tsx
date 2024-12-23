/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./product-list-backup-charger.scss";
// import { Carousel } from "antd";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import imagesPK from "../../../../public/combo-pk/Phụ Kiện Sạc Dự Phòng.png";
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
      eq: "MTk=",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListDataSacDuPhong() {
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
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataSacDuPhong", variables.filter.category_uid.eq],
    queryFn: fetchProductListDataSacDuPhong,
    staleTime: 300000,
  });

  const [activeTab, setActiveTab] = useState<string>("Pisen");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(10);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(10);
  useEffect(() => {
    if (activeTab === "All") {
      setFilteredData(data || []);
    } else {
      const filtered = data?.filter((product) =>
        product?.name.toLowerCase().includes(activeTab.toLowerCase())
      );
      setFilteredData(filtered || []);
    }

    setVisibleCount(10);
    setVisibleProducts(10);
    setIsExpanded(false);
  }, [activeTab, data]);
  useEffect(() => {
    switch (activeTab) {
      case "Pisen":
        variables.filter.category_uid.eq = "MjMz";
        break;
      case "Innostyle":
        variables.filter.category_uid.eq = "MjMy";
        break;
      case "Energizer":
        variables.filter.category_uid.eq = "MTQx";
        break;
      case "Khác":
        variables.filter.category_uid.eq = "MjM0";
        break;
      case "Samsung":
        variables.filter.category_uid.eq = "ODE=";
        break;

      default:
        variables.filter.category_uid.eq = "MjMz";
    }
    setVisibleCount(10);
    setVisibleProducts(10);
  }, [activeTab]);
  const toggleProducts = () => {
    if (isExpanded) {
      setVisibleProducts(10);
      setIsExpanded(false);
    } else {
      setVisibleProducts(filteredData.length);
      setIsExpanded(true);
    }
  };

  const loadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 5);
  };

  // if (isLoading) {
  // 	return (
  // 		<div className='loading container-spin'>
  // 			<Spin />
  // 		</div>
  // 	);
  // }

  if (error) {
    return <div>Error loading data</div>;
  }

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Increase the count by 6
    setVisibleProducts((prevVisible) => prevVisible + 10); // Update visibleProducts to show more items
  };
  return (
    <div className="OldForNew-Section-backup-charger" id="item-backup-charger">
      <div className="container">
        <div className="OldForNew-Section-Container-backup-charger">
          <Image src={imagesPK} alt="PK" className="images-pk" />
          <div className="header-table-combo-pk">
            {/* <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">Phụ Kiện Sạc Dự Phòng</h2>
            </div> */}
            <div className="tab-button-table-combo-pk">
              {" "}
              <button
                className={`btn-tab-buyPhone ${
                  activeTab === "Pisen" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setActiveTab("Pisen")}
              >
                Pisen
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  activeTab === "Energizer" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setActiveTab("Energizer")}
              >
                Energizer
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  activeTab === "Innostyle" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setActiveTab("Innostyle")}
              >
                Innostyle
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  activeTab === "Samsung" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setActiveTab("Samsung")}
              >
                Samsung
              </button>
            </div>
          </div>
          {isLoading && (
            <div
              className="loading container-spin flex items-center justify-center"
              style={{
                height: "300px",
              }}
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
              {visibleCount < (data?.length || 0) && ( // Check if more products are available
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
