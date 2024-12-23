import React from "react";
import BannerPC from "..//../../../public/warehouse-discharge/BIG SALE XA KHO 1920x500 2310.jpg";
import BannerMB from "..//../../../public/warehouse-discharge/BIG SALE XA KHO 1200X1200 2410.jpg";
import Image from "next/image";
import "./Banner.scss";
function page() {
  return (
    <div>
      <Image src={BannerPC} alt="" className="banner-pc-warehouse-discharge" />
      <Image src={BannerMB} alt="" className="banner-mb-warehouse-discharge" />
    </div>
  );
}

export default page;
