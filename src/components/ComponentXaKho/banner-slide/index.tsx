"use client";
import React, { useEffect, useState } from "react";
import { FormProps, Carousel } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./banner-slide.scss";
import iconbaoda from "../../../../public/icon-baoda.png";
import iconcuongluc from "../../../../public/icon-cuongluc.png";
import iconsacduphong from "../../../../public/icon-sacduphong.png";
import iconapple from "../../../../public/icon-apple.png";
import iconlaptop from "../../../../public/icon-laptop.png";
import iconcapsac from "../../../../public/icon-capsac.png";
import iconloa from "../../../../public/icon-loa.png";
import Image from "next/image";
import bannerSlider from "../../../../public/banner-pk-apple-1200-040624.png";
import bannerSlider2 from "../../../../public/banner-slide-01.png";
import images1 from "../../../../public/combo-pk/1200x450_ ROUTER , BỘ KÍCH WIFI , CHUỘT , CAMERA.png";
import images2 from "../../../../public/combo-pk/1200x450_Balo túi chống sốc.png";
import images3 from "../../../../public/combo-pk/1200x450_BỘ 3 AIRPODS.png";
import images4 from "../../../../public/combo-pk/1200x450_XẢ KHO , RẺ NHẤT.png";
import images5 from "../../../../public/combo-pk/1200x450_chuột , bàn phím tồn kho.png";
import images6 from "../../../../public/combo-pk/1200x450_cốc cáp sạc.png";
import images7 from "../../../../public/combo-pk/1200x450_dán màn hình.png";
import images8 from "../../../../public/combo-pk/1200x450_sạc dự phòng.png";
import images9 from "../../../../public/combo-pk/1200x450_Âm Thanh Cực Đỉnh.png";

import Link from "next/link";
type FieldType = {
  username?: string;
  phone?: string;
  selectedOptions?: { [key: string]: string };
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const BannerSlide = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenTest, setModalIsOpenTest] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [customerData, setCustomerData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=_r2Tnu3qTrt7FRaAe6XPptz6lD9UD8qOCA68N6XZoVQyQA3iXUg7WJwNgDdQsCWEuCsR_HO3pOMONNHgxublinyWF-UonaYjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNI54tzkJFaj-2iqaolXYotR08AGyFDWn--IfZJqRMOkhO8zfrvzkwbu57uzLUW5qHdqhbqBsOC_67mC9p03Mhbyn1Z4YyOlLg&lib=MFcmlpet2YYsjuSSgQUXZZPGWYEKb6JDU",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCustomerData(data);
        console.log("Customer data:", data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  interface ProductCombo16 {
    combo: string;
    persen: string;
    items: {
      type: string;
      items: {
        nameproduct: string;
        priceorigin: number;
        comboprice: number;
      }[];
    }[];
  }
  [];

  const handleClickLeatherCase = () => {
    const LeatherCase = document.getElementById("item-leather-case");
    if (LeatherCase) {
      LeatherCase.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickApple = () => {
    const Apple = document.getElementById("item-apple");
    if (Apple) {
      Apple.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickBackupCharger = () => {
    const BackupCharger = document.getElementById("item-backup-charger");
    if (BackupCharger) {
      BackupCharger.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickLaptop = () => {
    const Laptop = document.getElementById("item-laptop");
    if (Laptop) {
      Laptop.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickChargingCable = () => {
    const ChargingCable = document.getElementById("item-charging-cable");
    if (ChargingCable) {
      ChargingCable.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickLoudspeaker = () => {
    const Loudspeaker = document.getElementById("item-loudspeaker");
    if (Loudspeaker) {
      Loudspeaker.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickSamSung = () => {
    const SamSung = document.getElementById("item-samsung");
    if (SamSung) {
      SamSung.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickStrength = () => {
    const Strength = document.getElementById("item-strength");
    if (Strength) {
      Strength.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [selectedCombo, setSelectedCombo] = useState<ProductCombo16 | null>(
    null
  );
  const handleClickTest = (combo: ProductCombo16) => {
    setSelectedCombo(combo);
    setModalIsOpenTest(true);
  };
  return (
    <div className="banner-slide-page-warehouse-discharge">
      <div className="container">
        <div
          className=""
          style={{
            display: "flex",
            gap: "10px",
            margin: "auto",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <div className="OldForNew-Section1-imageSliderBanner">
            <Carousel autoplay autoplaySpeed={2000} dots={false} arrows={true}>
              {/* <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/"> */}
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/chu-t/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images1}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/chu-t/chu-t-choi-game/balo-tui-ch-ng-s-c/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images2}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/tai-nghe/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images3}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images4}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/danh-m-c/magic-keyboard/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images5}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images6}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images7}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images8}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images9}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              {/* </Link> */}

              {/* <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={bannerSlider2}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={bannerSlider}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link> */}
            </Carousel>
          </div>
          <div className="OldForNew-Section1-imageSliderBanner">
            <Carousel autoplay autoplaySpeed={2000} dots={false} arrows={true}>
              {/* <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={bannerSlider2}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={bannerSlider}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={bannerSlider2}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link> */}
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images9}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images8}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images7}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images6}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/apple/danh-m-c/magic-keyboard/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images5}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>

              <div className="OldForNew-Section1-image">
                <Image
                  src={images4}
                  alt=""
                  className="OldForNew-Section1-imageItem"
                />
              </div>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/tai-nghe/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images3}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/chu-t/chu-t-choi-game/balo-tui-ch-ng-s-c/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images2}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
              <Link href="https://bachlongmobile.com/combo-phu-kien/chon-dong-phu-kien/chu-t/">
                <div className="OldForNew-Section1-image">
                  <Image
                    src={images1}
                    alt=""
                    className="OldForNew-Section1-imageItem"
                  />
                </div>
              </Link>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
