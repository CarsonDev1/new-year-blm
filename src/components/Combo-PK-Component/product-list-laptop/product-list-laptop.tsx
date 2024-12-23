/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import "./product-list-laptop.scss";
// import { Carousel } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import CardProduct from "../CardProductComboPK/CardProduct";
import imagesPK from "../../../../public/combo-pk/Đồ Chơi Công Nghệ.png";
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

const variablesCategory1 = {
  filter: {
    category_uid: {
      eq: "NzA=", // First category
    },
  },
  pageSize: 200,
  currentPage: 1,
};

const variablesCategory2 = {
  filter: {
    category_uid: {
      eq: "NzE=", // Second category
    },
  },
  pageSize: 200,
  currentPage: 1,
};
const variablesCategory3 = {
  filter: {
    category_uid: {
      eq: "NzM=", // Second category
    },
  },
  pageSize: 200,
  currentPage: 1,
};
async function fetchProductListDataLaptop() {
  const response1 = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variablesCategory1,
    }),
  });

  const response2 = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variablesCategory2,
    }),
  });
  const response3 = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variablesCategory3,
    }),
  });
  const data1 = await response1.json();
  const data2 = await response2.json();
  const data3 = await response3.json();
  console.log("data 1", data1);
  // Merge the two sets of data
  const productsCategory1 = data1.data.products.items as Product[];
  const productsCategory2 = data2.data.products.items as Product[];
  const productsCategory3 = data3.data.products.items as Product[];
  return [...productsCategory1, ...productsCategory2, ...productsCategory3];
}

const Section5: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataLaptop"],
    queryFn: fetchProductListDataLaptop,
    staleTime: 300000,
  });

  const [activeTab, setActiveTab] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(10);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(10);
  useEffect(() => {
    if (activeTab === "All") {
      setFilteredData(data || []);
    } else {
      const filtered = data?.filter((product) =>
        product.name.toLowerCase().includes(activeTab.toLowerCase())
      );
      setFilteredData(filtered || []);
    }
    setVisibleProducts(10);
    setIsExpanded(false);
  }, [activeTab, data]);

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
    <div className="OldForNew-Section-laptop" id="item-laptop">
      <div className="container">
        <div className="OldForNew-Section-Container-laptop">
          <Image src={imagesPK} alt="PK" className="images-pk" />
          {/* <div style={{ paddingBottom: "10px" }}>
            <h2 className="title-table-combo-pk">Đồ Chơi Công Nghệ</h2>
          </div>{" "} */}
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
