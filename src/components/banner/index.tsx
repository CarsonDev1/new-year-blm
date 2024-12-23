"use client";
import React from "react";
import Image from "next/image";
import "./banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <picture>
        <source media="(max-width: 768px)" srcSet="/HEADER-MOBILE.jpg" />
        <Image
          src="/HEAD PK THANG 10 1920x500 0410.jpg"
          width={1820}
          height={1200}
          alt="banner-accessory"
          quality={100}
          sizes="(max-width: 768px) 100vw, 1820px"
        />
      </picture>
    </div>
  );
};

export default Banner;
