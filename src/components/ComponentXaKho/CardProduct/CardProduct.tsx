/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./CardProduct.css";
import iconconhang from "../../../../public/ic-shipped.png";
import Image from "next/image";
interface ProductItem {
  name: string;
  price1: number;
}

interface Product {
  loaisp: string; // Loại sản phẩm
  item: ProductItem; // Thông tin sản phẩm
}
function CardProduct({ name, price1 }: Omit<ProductItem, "id">) {
  return (
    <div className="CardProductProductWarehouseDischarge">
      <div
        className="product__title-WarehouseDischarge"
        style={{ textDecoration: "none" }}
      >
        {name}
      </div>
      <div
        className="product__groupPrice"
        style={{ background: "0", textAlign: "center" }}
      >
        <span className="product__price">Giá bán: </span>
        <span className="product__priceSpecial">
          {price1.toLocaleString()} VNĐ
        </span>
      </div>
      <button className="btn-buy-product">Đặt hàng</button>
    </div>
  );
}

export default CardProduct;
