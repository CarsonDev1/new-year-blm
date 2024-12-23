"use client";
import React, { useEffect, useState } from "react";
import "./BodyOldAutumn.scss";
import Image from "next/image";
import icsSearch from "../../../public/ic-search.png";
import { useQuery } from "@tanstack/react-query";
import CardProductTreference from "../../ComponenTreference/CardProducTreference/CardProduct";
import { Spin, Pagination } from "antd";
export interface ProductData {
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
export interface Product {
  item: {
    title: string;
    name: string;
    oldprice: number;
    pricetype1: number;
    pricetype2: number;
    pricetype3: number;
  };
}

const BodyOldAutumn = () => {
  const [phoneCondition, setPhoneCondition] = useState("normal");
  const [batteryStatus, setBatteryStatus] = useState("above_90");
  const [selectedSeries, setSelectedSeries] = useState<string>("iPhone 15");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productType, setProductType] = useState<string>("iPhone 15");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [priceForModal2, setPriceForModal2] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const handleChange = (value: string) => {
    setSelectedSeries(value);
    setProductType(value);
    setActiveButton(value);
  };
  const [activeButton, setActiveButton] = useState<string>("iPhone 15");
  const [iphoneModels, setIphoneModels] = useState<string[]>([
    "iPhone 15",
    "iPhone 14",
    "iPhone 13",
    "iPhone 12",
    "iPhone 11",
    "iPhone Xs",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyk9SIAxTIM--HkPzDuOYbWzplDnLC1n527jwOW4-0m-uHehJtjr_PcH8U1coh-4hs/exec?sheet=BANG GIA TRADE IN1"
      );
      const data = await response.json();
      setFilteredProducts(data);
      console.log("data thu cu", data);
      setLoading(false);
      return data;
    };

    fetchData();
  }, []);

  const itemsPerPage = 100; // Tổng số sản phẩm hiển thị trên mỗi trang
  const itemsPerRow = 4; // Sản phẩm trên mỗi hàng

  // Filter products based on the selected product type
  const filteredByType = productType
    ? filteredProducts.filter((product) =>
        product.item.name.includes(productType)
      )
    : filteredProducts;

  // Lấy sản phẩm cho trang hiện tại
  const currentProducts = filteredByType.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{ backgroundColor: "#FFFEED", padding: "20px 0", height: "100vh" }}
    >
      <div className="container">
        <div className="BodyReference-card">
          <h2 className="BodyOldAutumn-title">
            {currentProducts.length > 0 && (
              <div>{currentProducts[0].item.title}</div>
            )}
          </h2>

          <div className="BodyOldAutumn-tab-button">
            {iphoneModels.map((model) => (
              <button
                key={model}
                className={`BodyOldAutumn-button ${
                  activeButton === model ? "active" : ""
                }`}
                onClick={() => handleChange(model)}
              >
                {model}
              </button>
            ))}
          </div>

          {loading && (
            <div
              className="loading container-spin flex items-center justify-center"
              style={{
                height: "300px",
              }}
            >
              <Spin />
            </div>
          )}
          <div className="BodyOldAutumn-tab-item">
            {currentProducts.map((product: any, index: number) => (
              <div key={index}>
                <CardProductTreference
                  name={product?.item.name}
                  image={product?.item.img}
                  price={Number(product?.item.oldprice)}
                  price1={Number(product?.item.pricetype1)}
                  price2={Number(product?.item.pricetype2)}
                  price3={Number(product?.item.pricetype3)}
                />
              </div>
            ))}
          </div>
          <h2
            style={{
              color: "red",
              fontWeight: "600",
              padding: "20px 0px",
              textAlign: "center",
            }}
          >
            Lưu ý : Tất cả các loại máy thẩm định trực thuộc vào quản lý shop
            kiểm trả trực tiếp
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BodyOldAutumn;
