/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./CardProduct.css";
import iconconhang from "../../../public/ic-shipped.png";
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
function CardProduct({
  name,
  url_key,
  image,
  price_range,
}: Omit<Product, "id">) {
  return (
    <div className="CardProduct">
      <a
        href={`https://bachlongmobile.com/products/${url_key}`}
        style={{ width: "100%", textDecoration: "none" }}
      >
        <div className="product__price__percent">
          <p className="product__price--percent-detail">
            -&nbsp;
            {Math.round(
              ((price_range.minimum_price.final_price.value +
                300000 -
                price_range.minimum_price.final_price.value) /
                (price_range.minimum_price.final_price.value + 300000)) *
                100
            )}
            %
          </p>
        </div>
        <figure className="product__img">
          <img className="product__img-detail" alt={name} src={image.url} />
        </figure>
        <div className="product__title" style={{ textDecoration: "none" }}>
          {name}
        </div>
        <div className="product__groupPrice" style={{ background: "0" }}>
          <span className="product__price">Giá: </span>
          <span className="product__priceSpecial">
            {price_range.minimum_price.final_price.value.toLocaleString()}{" "}
            {price_range.minimum_price.final_price.currency}
          </span>
          <span className="product__price_gach">
            {" "}
            {(
              price_range.minimum_price.final_price.value + 300000
            ).toLocaleString()}
          </span>
          <div className="product__con-hang">
            <Image src={iconconhang} alt="" className="product__con-hang-img" />
            <span className="product__con-hang-detail">Còn hàng</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default CardProduct;
