"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Spin } from "antd";
import ModalForm from "../ModalInfo/ModalInfo";
import "./ProductAccessory.scss";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import imagesTitle from "../../../../public/warehouse-discharge/pk-no-img.png";
interface ProductItem {
  name: string;
  price1: number;
}

interface Product {
  loaisp: string;
  item: ProductItem;
}

function CardProductAccessory() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxuvoT7Q9AbBQ11hDEHoAnGZ7qjAYvNmzz6s6hou6QT4krSKYZnPOBk_5XsconFLUdCGQ/exec?id=dsspxakho"
      );
      const data = await response.json();
      setFilteredProducts(data);
      setLoading(false);

      if (data.length > 0) {
        setActiveTab(data[0].loaisp);
      }
    };

    fetchData();
  }, []);

  const uniqueLoaisp = Array.from(
    new Set(filteredProducts?.map((product) => product.loaisp))
  ).sort((a, b) => (a === "Khác" ? 1 : 0));

  const filteredByTab = filteredProducts.filter(
    (product) => product.loaisp === activeTab
  );

  const displayedProducts = filteredByTab.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 15);
  };

  const handleTabChange = (loaisp: string) => {
    setActiveTab(loaisp);
    setVisibleCount(15);
  };

  const handleOpenModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "20px 0px", backgroundColor: "#D5B487" }}>
      <div className="container">
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fffad4",
            borderRadius: "10px",
          }}
        >
          <Image
            src={imagesTitle}
            alt=""
            style={{ padding: "0px 0px 20px 0px" }}
          />
          <div className="tab-btn-product-accessory">
            {uniqueLoaisp?.map((loaisp) => (
              <button
                key={loaisp}
                className={`btn-tab-warehouse-discharge ${
                  activeTab === loaisp
                    ? "btn-tab-warehouse-discharge_active"
                    : ""
                }`}
                onClick={() => handleTabChange(loaisp)}
              >
                {`${loaisp}`}
              </button>
            ))}
          </div>
          <div className="warehouse-discharge-container-product-table">
            <div>
              {/* <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">
                Phụ kiện xả kho giảm đến xx%
              </h2>
            </div> */}
            </div>

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "200px",
                }}
              >
                <Spin size="large" />
              </div>
            ) : displayedProducts.length === 0 ? (
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
                <div className="table-pc">
                  {" "}
                  <table className="product-table">
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedProducts?.map((product, index) => (
                        <tr
                          key={`${product.item.name}-${index}`}
                          style={{ cursor: "pointer" }}
                          className="product-row"
                        >
                          <td
                            className="product-name"
                            onClick={() => handleOpenModal(product.item)}
                          >
                            {product.item.name}
                          </td>
                          <td
                            className="product-details"
                            colSpan={2}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            onClick={() => handleOpenModal(product.item)}
                          >
                            <div
                              className="price"
                              style={{ padding: "10px 20px" }}
                            >
                              {product.item.price1.toLocaleString()} đ
                            </div>
                            <button
                              onClick={() => handleOpenModal(product.item)}
                              className="btn-handle-ok"
                            >
                              Đặt Ngay
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="table-mb">
                  <table className="product-table">
                    {/* <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                    </tr>
                  </thead> */}
                    <tbody>
                      {displayedProducts?.map((product, index) => (
                        <React.Fragment key={`${product.item.name}-${index}`}>
                          <tr className="product-row">
                            <td
                              className="product-name"
                              onClick={() => handleOpenModal(product.item)}
                            >
                              {product.item.name}
                            </td>
                          </tr>
                          <tr className="product-details">
                            <td
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "10px 20px",
                              }}
                            >
                              <div
                                className="price"
                                style={{ padding: "10px 0px" }}
                              >
                                {product.item.price1.toLocaleString()} đ
                              </div>
                              <button
                                onClick={() => handleOpenModal(product.item)}
                                className="btn-handle-ok"
                              >
                                Đặt Ngay
                              </button>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                {displayedProducts.length < filteredByTab.length && (
                  <button onClick={handleSeeMore} className="btn-see-more">
                    Xem thêm
                  </button>
                )}
                <ModalForm
                  visible={isModalVisible}
                  onCancel={handleCloseModal}
                  product={selectedProduct}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProductAccessory;
