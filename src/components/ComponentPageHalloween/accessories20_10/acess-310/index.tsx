"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Spin } from "antd";
import DecorProduct from "../../../../../public/halloween/ic-to.png";
import DecorWomen from "../../../../../public/halloween/decor-women-01.png";
import FrameProduct from "../../../../../public/halloween/frame-product.png";
import "./acess-women.scss";
import Gift from "../../../../../public/old/gift.png";
import { useProductSaleData } from "../../../../app/hooksHalloween/useProductSaleData";
import DecorProduct2 from "../../../../../public/halloween/ICON-DRAGON.png";
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
      eq: "MzY5",
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

const Access310: React.FC = () => {
  const {
    data: Access310,
    error,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["Access310Data"],
    queryFn: fetchProductListData,
    staleTime: 300000,
  });

  const { data } = useProductSaleData();
  const productSale = data?.[0]?.items;

  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(10);

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

  useEffect(() => {
    setFilteredData(Access310 || []);

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
  }, [Access310]);

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

  const visibleProducts = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="upgrade-list">
      <div className="upgrade">
        {visibleProducts.map((product, index) => (
          <Link
            key={index}
            href={`https://bachlongmobile.com/products/${product.url_key}`}
            passHref
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="upgrade-item">
              <div className="upgrade-item-header">
                <Image
                  src={DecorProduct}
                  width={80}
                  height={80}
                  quality={100}
                  alt="decor-product"
                  className="decor-product"
                />
                <Image
                  src={DecorProduct2}
                  width={80}
                  height={80}
                  quality={100}
                  alt="decor-product"
                  className="decor-product2"
                />
                <span></span>
                <span className="percent">Trả góp 0%</span>
              </div>
              <div className="upgrade-item-img">
                <div className="img-content">
                  <Image
                    src={product.image.url}
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
                <h4 className="upgrade-item-content-tt">{product.name}</h4>
                <div className="upgrade-item-content-body">
                  <div className="upgrade-item-content-body-price">
                    {getProductSalePrice(
                      product.name,
                      product.price_range.minimum_price.final_price.value
                    )}{" "}
                    {product.price_range.minimum_price.final_price.currency}
                  </div>
                  <div className="upgrade-item-content-body-reduced">
                    <div className="price-reduced">
                      {product.attributes && product.attributes[0]?.value
                        ? Number(product.attributes[0].value).toLocaleString(
                            "vi-VN"
                          )
                        : ""}{" "}
                      {product.attributes[0].value &&
                        product.price_range.minimum_price.final_price.currency}
                    </div>

                    {product.attributes[0].value && (
                      <div className="percent">
                        -
                        {Math.ceil(
                          ((product.attributes[0].value -
                            product.price_range.minimum_price.final_price
                              .value) /
                            product.attributes[0].value) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleCount < filteredData.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={loadMore}
            style={{
              backgroundColor: "#ef373e",
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
  );
};

export default Access310;
