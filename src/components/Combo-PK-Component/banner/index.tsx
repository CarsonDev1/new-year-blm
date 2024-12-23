"use client";
import React from "react";
import Image from "next/image";
import bannerPC from "../../../../public/combo-pk/Head 1200x450.png";
import bannerMB from "../../../../public/combo-pk/Head 900x900.png";
import "./HeaderCombo.scss";
const HeaderCombo = () => {
  return (
    <div>
      <Image src={bannerPC} alt="" className="HeaderCombo-bannerPC" />
      <Image src={bannerMB} alt="" className="HeaderCombo-bannerMB" />
    </div>
  );
};

export default HeaderCombo;
