import React from "react";
import iconbaoda from "../../../../public/icon-baoda.png";
import iconcuongluc from "../../../../public/icon-cuongluc.png";
import iconsacduphong from "../../../../public/icon-sacduphong.png";
import iconapple from "../../../../public/icon-apple.png";
import iconlaptop from "../../../../public/icon-laptop.png";
import iconcapsac from "../../../../public/icon-capsac.png";
import iconloa from "../../../../public/icon-loa.png";
import "./Header.scss";
import Image from "next/image";
function page() {
  return (
    <div
      className="header-warehouse-discharge"
      style={{ backgroundColor: "#fefce3" }}
    >
      <div className="container">
        <ul className="list-item-click">
          <li className="item-click">
            <Image
              src={iconapple}
              alt="banner-slide-01"
              className="icon-itemClick"
            />
            <p className="item-click-txt">Apple</p>
          </li>
          <li className="item-click">
            <Image
              src={iconbaoda}
              alt="banner-slide-01"
              className="icon-itemClick"
            />
            <p className="item-click-txt">Bao da, ốp lưng</p>
          </li>
          <li className="item-click">
            <Image
              src={iconcuongluc}
              alt="banner-slide-01"
              className="icon-itemClick"
            />
            <p className="item-click-txt">Cường lực</p>
          </li>
          <li className="item-click">
            <Image
              src={iconsacduphong}
              alt="banner-slide-01"
              className="icon-itemClick"
            />
            <p className="item-click-txt">Sạc dự phòng</p>
          </li>{" "}
          <li className="item-click">
            <Image
              src={iconcapsac}
              alt="banner-slide-01"
              className="icon-itemClick"
            />
            <p className="item-click-txt">Cáp sạc</p>
          </li>{" "}
          <li className="item-click">
            <Image
              src={iconloa}
              alt="banner-slide-01"
              className="icon-itemClick"
            />
            <p className="item-click-txt">Loa, Tai nghe</p>
          </li>
          <li className="item-click">
            <Image
              src={iconlaptop}
              alt="banner-slide-01"
              className="icon-itemClick"
            />
            <p className="item-click-txt">Đồ chơi công nghệ</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default page;
