/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import "./Body.scss";
import CardProduct from "../CardProduct/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import Privilege01 from "../../../../public/warehouse-discharge/privilege-01.png";
import Privilege02 from "../../../../public/warehouse-discharge/privilege-02.png";
import Privilege03 from "../../../../public/warehouse-discharge/privilege-03.png";
import Privilege04 from "../../../../public/warehouse-discharge/privilege-04.png";
import Privilege05 from "../../../../public/warehouse-discharge/privilege-05.png";
import Promotion01 from "../../../../public/warehouse-discharge/promotion-01.png";
import Promotion02 from "../../../../public/warehouse-discharge/promotion-02.png";
import Promotion03 from "../../../../public/warehouse-discharge/promotion-03.png";
import Promotion04 from "../../../../public/warehouse-discharge/promotion-04.png";
import Promotion05 from "../../../../public/warehouse-discharge/promotion-05.png";
import Promotion06 from "../../../../public/warehouse-discharge/promotion-06.png";
import Promotion07 from "../../../../public/warehouse-discharge/promotion-07.png";
import Promotion08 from "../../../../public/warehouse-discharge/promotion-08.png";
import ModalInfo from "../ModalInfo/ModalInfo";
import Link from "next/link";
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

const fetchProductListDataBuyPhone = async (category_uid: string) => {
  const variables = {
    filter: {
      category_uid: {
        eq: category_uid,
      },
    },
    pageSize: 200,
    currentPage: 1,
  };

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
};

const Section5: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("iPhone");
  const [visibleProducts, setVisibleProducts] = useState<number>(15);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const categoryUid = activeTab === "iPhone" ? "MzI2" : "MzI4";

  const { data, error, isLoading } = useQuery({
    queryKey: ["productListDataBuyPhone", activeTab],
    queryFn: () => fetchProductListDataBuyPhone(categoryUid),
    staleTime: 300000,
  });

  const toggleProducts = () => {
    setIsExpanded((prev) => !prev);
    setVisibleProducts((prev) => (isExpanded ? 15 : data?.length || 0));
  };

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
  const showModal = () => {
    setIsModalVisible(true); // Show the modal
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Hide the modal
  };
  return (
    <div className="warehouse-discharge-Section5">
      <div className="container">
        {/* <div className="promotion">
          <div className="promotion-header">
            5 đặc quyền mua hàng tại Bạch Long Mobile
          </div>
          <div className="promotion-list-privilege">
            <div style={{ cursor: "pointer" }} className="privilege-img">
              <Image
                src={Privilege01}
                alt="privilege-01"
                width={270}
                height={117}
              />
            </div>
            <Link
              href="https://bachlongmobile.com/thu-cu-doi-moi/"
              className="privilege-img"
            >
              <Image
                src={Privilege02}
                alt="privilege-02"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/promotion/tet-apple-bao-hanh-toan-dien/"
              className="privilege-img"
            >
              <Image
                src={Privilege03}
                alt="privilege-03"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/combo-phu-kien/"
              className="privilege-img"
            >
              <Image
                src={Privilege04}
                alt="privilege-04"
                width={270}
                height={117}
              />
            </Link>
            <div style={{ cursor: "pointer" }} className="privilege-img">
              <Image
                src={Privilege05}
                alt="privilege-05"
                width={270}
                height={117}
              />
            </div>
          </div>

          <div className="promotion-header">Ưu đãi trả góp siêu hời</div>
          <div className="promotion-list">
            <Link
              href="https://bachlongmobile.com/news/tin-cong-nghe/cung-mpos-x-bach-long-mobile-so-huu-iphone-16-series-gia-tot-qua-tang-khung/"
              className="promotion-img"
            >
              <Image
                src={Promotion01}
                alt="promotion-01"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/promotion/home-pay-later/"
              className="promotion-img"
            >
              <Image
                src={Promotion02}
                alt="promotion-02"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/promotion/tra-gop-kredivo/"
              className="promotion-img"
            >
              <Image
                src={Promotion03}
                alt="promotion-03"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/tra-gop-muadee/"
              className="promotion-img"
            >
              <Image
                src={Promotion04}
                alt="promotion-04"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
              className="promotion-img"
            >
              <Image
                src={Promotion05}
                alt="promotion-05"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
              className="promotion-img"
            >
              <Image
                src={Promotion06}
                alt="promotion-06"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
              className="promotion-img"
            >
              <Image
                src={Promotion07}
                alt="promotion-07"
                width={270}
                height={117}
              />
            </Link>
            <Link
              href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
              className="promotion-img"
            >
              <Image
                src={Promotion08}
                alt="promotion-08"
                width={270}
                height={117}
              />
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Section5;
