import React from "react";
import Banner from "../../components/ComponentXaKho/Banner/page";
import Header from "../../components/ComponentXaKho/Header/page";
import Body from "../../components/ComponentXaKho/Body/page";
import CardProductAccessory from "../../components/ComponentXaKho/ProductAccessory/ProductAccessory";
import AccessoriesList from "../../components/ComponentXaKho/accessories/index";
import ProductIPhone from "../../components/ComponentXaKho/ProductIPhone/ProductIPhone";
import ProductIphoneNew from "../../components/ComponentXaKho/ProductIphoneNew/ProductIphoneNew";
import ProductListIphone from "../../components/ComponentXaKho/ProductOld/ProductOld";
import ProductAndroidNew from "../../components/ComponentXaKho/ProductAndroidNew/ProductAndroidNew";
import BannerSlider from "../../components/ComponentXaKho/banner-slide/index";
function page() {
  return (
    <div>
      <Banner />
      {/* <Header /> */}
      <Body />
      <BannerSlider />
      {/* <ProductIPhone /> */}
      <ProductIphoneNew />
      <ProductAndroidNew />
      <ProductListIphone />
      <AccessoriesList />
      <CardProductAccessory />
    </div>
  );
}

export default page;
