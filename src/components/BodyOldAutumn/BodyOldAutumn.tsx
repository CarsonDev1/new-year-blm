"use client";
import React, { useEffect, useState } from "react";
import "./BodyOldAutumn.scss";
import CardProduct from "../../components/CardProductOldAutumn/CardProductOldAutumn";
import { Spin, Pagination } from "antd";
import ProductModal from "../../components/ProductModalComponent1/ProductModalComponent1";
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
    name: string;
    price1: number;
    price2: number;
    price3: number;
    img: string;
  };
  loaisp: string;
}

const BodyOldAutumn = () => {
  const [phoneCondition, setPhoneCondition] = useState("normal");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productType, setProductType] = useState<string>("iPhone");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const handleChange = (value: string) => {
    setProductType(value);
    setActiveButton(value);
  };
  const [activeButton, setActiveButton] = useState<string>("iPhone");
  const showModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setPhoneCondition("warranty_mobile");
  };
  useEffect(() => {
    if (selectedProduct) {
      handlePriceChange(phoneCondition);
    }
  }, [selectedProduct, phoneCondition]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal2 = () => {
    setIsModalOpen(false); // Close the first modal
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyk9SIAxTIM--HkPzDuOYbWzplDnLC1n527jwOW4-0m-uHehJtjr_PcH8U1coh-4hs/exec"
      );
      const data = await response.json();
      setFilteredProducts(data);
      console.log("data thu cu", data);
      setLoading(false);
      return data;
    };

    fetchData();
  }, []);

  const itemsPerPage = 15; // Tổng số sản phẩm hiển thị trên mỗi trang

  // Filter products based on the selected product type
  const filteredByType = productType
    ? filteredProducts.filter((product) => product.loaisp === productType)
    : filteredProducts;

  // Lấy sản phẩm cho trang hiện tại
  const currentProducts = filteredByType.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePriceChange = (value: string) => {
    switch (value) {
      case "warranty_mobile":
        setSelectedPrice(selectedProduct?.item.price1 || 0); // price1
        break;
      case "warranty_scratch_light":
        setSelectedPrice(selectedProduct?.item.price2 || 0); // price2
        break;
      case "normal":
        setSelectedPrice(selectedProduct?.item.price3 || 0); // price3
        break;
      default:
        setSelectedPrice(selectedProduct?.item.price1 || 0); // Default to price1
    }
  };
  return (
    <div style={{ backgroundColor: "#FFFEED", padding: "20px 0" }}>
      <div className="container">
        <div className="BodyOldAutumn-card">
          <h2 className="BodyOldAutumn-title">
            THU CŨ ĐỔI MỚI - KHÔNG LO BÙ TIỀN
          </h2>

          <div className="BodyOldAutumn-tab-button">
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "iPhone" ? "active" : ""
              }`}
              onClick={() => handleChange("iPhone")}
            >
              iPhone
            </button>
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "Samsung" ? "active" : ""
              }`}
              onClick={() => handleChange("Samsung")}
            >
              Samsung
            </button>
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "AppleWatch" ? "active" : ""
              }`}
              onClick={() => handleChange("AppleWatch")}
            >
              Apple Watch
            </button>
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "iPad" ? "active" : ""
              }`}
              onClick={() => handleChange("iPad")}
            >
              iPad
            </button>
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "Oppo" ? "active" : ""
              }`}
              onClick={() => handleChange("Oppo")}
            >
              Oppo
            </button>
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "iMac" ? "active" : ""
              }`}
              onClick={() => handleChange("iMac")}
            >
              iMac
            </button>
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "MacbookLaptop" ? "active" : ""
              }`}
              onClick={() => handleChange("MacbookLaptop")}
            >
              Macbook
            </button>
            <button
              className={`BodyOldAutumn-button ${
                activeButton === "PhuKienApple" ? "active" : ""
              }`}
              onClick={() => handleChange("PhuKienApple")}
            >
              Phụ Kiện Apple
            </button>
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
              <div key={index} onClick={() => showModal(product)}>
                {" "}
                {/* Added onClick to show modal */}
                <CardProduct
                  name={product?.item.name}
                  image={product?.item.img}
                  price={Number(product?.item.price1)}
                />
              </div>
            ))}
          </div>

          <Pagination
            style={{ padding: "20px 0" }}
            align="center"
            current={currentPage}
            total={filteredByType.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)} // Cập nhật trang hiện tại
          />
        </div>
        <ProductModal
          visible={isModalOpen}
          onCancel={handleCancel}
          selectedProduct={selectedProduct}
          phoneCondition={phoneCondition}
          setPhoneCondition={setPhoneCondition}
          selectedPrice={selectedPrice}
          handleOpenModal2={handleOpenModal2}
          handlePriceChange={handlePriceChange} // Pass the function to handle price change
        />
      </div>
    </div>
  );
};

export default BodyOldAutumn;
