import HeaderHalloween from "../../components/ComponentPageHalloween/HeaderHalloween/HeaderHalloween";
import BodyHallowween from "../../components/ComponentPageHalloween/BodyHalloween/BodyHalloween";
import ProductList from "../../components/ComponentPageHalloween/product/index";
import AppleList from "../../components/ComponentPageHalloween/apple/index";
import ProductPercent from "../../components/ComponentPageHalloween/99percent/index";
import AndroidList from "../../components/ComponentPageHalloween/android/index";
import LaptopList from "../../components/ComponentPageHalloween/laptop/index";
import ToyList from "../../components/ComponentPageHalloween/toy/index";
import Rules from "../../components/ComponentPageHalloween/rules/index";
import BannerHalloween from "../../components/ComponentPageHalloween/BannerHalloween/page";
import React from "react";
import "./halloween.scss";

export default function page() {
  return (
    <div className="halloween">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="93"
        className="ghost1"
        viewBox="0 0 15.875 24.606"
      >
        <defs>
          <linearGradient
            id="A"
            x1="-1.181"
            y1="-16.316"
            x2="16.115"
            y2="26.184"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M9.312 0C6.974-.013 4.607 1.2 3.496 3.286 2.2 5.573 1.726 8.202 1.234 10.752L.05 18.044c-.132 1.49-.062 3.198.997 4.365.853.845 2.754-1.447 2.646.327.36 1.194 2.36 1.318 2.644.018.5-1.302.72.74 1.374.99.762.76 2.217.892 2.797-.146.902-1.143 1.377.67 2.287.82.96.524 2.215-.106 2.262-1.215.186-1.31-.39-2.587-.268-3.903-.074-4.664 1.724-9.268.842-13.93-.32-1.956-1.546-3.738-3.336-4.63C11.38.26 10.348-.01 9.312 0zM5.634 5.943c1.353.27.433 3.13-.716 1.974-.533-.652-.14-1.845.716-1.974zm5.384.83c1.324-.163 1.62 2.074.175 1.98-1.114.097-1.26-1.873-.175-1.98zm.41 4.732c.462.93-.845 1.384-1.35.377-.56-1.117-1.933.614-2.92-.214-.857-.72-1.552.556-2.458.653-1.448.154.274-1.56.8-2.087.88-.878 2.257-.274 3.448-.597 1.074-.29 2.08 1.065 2.478 1.868z"
          fill="url(#A)"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ghost2"
        width="60"
        height="93"
        viewBox="0 0 15.875 24.606"
      >
        <defs>
          <linearGradient
            id="A"
            x1="17.056"
            y1="-16.316"
            x2="-.24"
            y2="26.184"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M6.563 0C8.9-.013 11.268 1.2 12.38 3.286c1.297 2.286 1.77 4.915 2.262 7.465l1.184 7.292c.132 1.49.062 3.198-.997 4.365-.853.845-2.754-1.447-2.646.327-.36 1.194-2.36 1.318-2.644.018-.5-1.302-.72.74-1.374.99-.762.76-2.217.892-2.797-.146-.902-1.143-1.377.67-2.287.82-.96.524-2.215-.106-2.262-1.215-.186-1.31.39-2.587.268-3.903.074-4.664-1.724-9.268-.842-13.93C.565 3.415 1.8 1.633 3.58.74 4.495.26 5.527-.01 6.563 0zm3.677 5.943c-1.353.27-.433 3.13.716 1.974.533-.652.14-1.845-.716-1.974zm-5.384.83c-1.324-.163-1.62 2.074-.175 1.98 1.114.097 1.26-1.873.175-1.98zm-.41 4.732c-.462.93.845 1.384 1.35.377.56-1.117 1.933.614 2.92-.214.857-.72 1.552.556 2.458.653 1.448.154-.274-1.56-.8-2.087-.88-.878-2.257-.274-3.448-.597-1.074-.29-2.08 1.065-2.478 1.868z"
          fill="url(#A)"
        />
      </svg>
      <BannerHalloween />
      <HeaderHalloween />
      <BodyHallowween />
      <div id="item-iphone">
        <ProductList />
      </div>
      <div id="item-ipad">
        <AppleList />
      </div>
      <div id="item-airpods">
        <ProductPercent />
      </div>
      <div id="item-mac">
        <AndroidList />
      </div>
      <div id="item-watch">
        <LaptopList />
      </div>
      <div id="item-toy">
        <ToyList />
      </div>

      <div id="item-rules">
        <Rules />
      </div>
    </div>
  );
}
