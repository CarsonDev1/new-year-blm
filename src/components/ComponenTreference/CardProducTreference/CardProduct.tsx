/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./CardProduct.css";
import Image from "next/image";
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

interface CardProductProps {
  name: string;
  image: string;
  price: number; // Add this line to include price
  price1: number;
  price2: number;
  price3: number;
}

function CardProduct({
  name,
  price,
  price1,
  price2,
  price3,
}: CardProductProps) {
  // Change to use CardProductProps instead of Omit<Product, "id">
  return (
    <div className="CardProduct_BodyReference">
      <a href={``} style={{ width: "100%", textDecoration: "none" }}>
        <div
          className="product__title_BodyReference"
          style={{ textDecoration: "none" }}
        >
          {name}
        </div>
        <div
          className="product__groupPrice_BodyReference"
          style={{ background: "0" }}
        >
          <span className="product__price_BodyReference">Giá Loại 1: </span>
          <span className="product__priceSpecial_BodyReference">
            {new Intl.NumberFormat("vi-VN").format(price1)}{" "}
            <span className="product__price_BodyReference-text">VNĐ</span>
            {/* Added space before VNĐ */}
          </span>
        </div>{" "}
        <div
          className="product__groupPrice_BodyReference"
          style={{ background: "0" }}
        >
          <span className="product__price_BodyReference">Giá Loại 2: </span>
          <span className="product__priceSpecial_BodyReference">
            {new Intl.NumberFormat("vi-VN").format(price2)}{" "}
            <span className="product__price_BodyReference-text">VNĐ</span>
            {/* Added space before VNĐ */}
          </span>
        </div>
        <div
          className="product__groupPrice_BodyReference"
          style={{ background: "0" }}
        >
          <span className="product__price_BodyReference">Giá Loại 3: </span>
          <span className="product__priceSpecial_BodyReference">
            {new Intl.NumberFormat("vi-VN").format(price3)}{" "}
            <span className="product__price_BodyReference-text">VNĐ</span>
            {/* Added space before VNĐ */}
          </span>
        </div>
      </a>
    </div>
  );
}

export default CardProduct;
