import Banner from "../../components/Combo-PK-Component/banner/index";
import BannerSlide from "../../components/Combo-PK-Component/banner-slide/index";
import ProductList from "../../components/Combo-PK-Component/product-list/index";
import ProductListBaoda from "../../components/Combo-PK-Component/product-list-leather-case/product-list-leather-case";
import ProductListCuongLuc from "../../components/Combo-PK-Component/product-list-strength/product-list-strength";
// import ProductListTaiNghe from "../components/product-list-earphone/product-list-earphone";
// import ProductListDongHo from "../components/product-list-watch/product-list-watch";
import ProductListSacDuPhong from "../../components/Combo-PK-Component/product-list-backup-charger/product-list-backup-charger";
import ProductListCapsac from "../../components/Combo-PK-Component/product-list-charging-cable/product-list-charging-cable";
import ProductListLoa from "../../components/Combo-PK-Component/product-list-loudspeaker/product-list-loudspeaker";
// import ProductListTheNho from "../components/product-list-usb/product-list-usb";
// import ProductListApple from "../components/product-list-apple/product-list-apple";
import ProductListLaptop from "../../components/Combo-PK-Component/product-list-laptop/product-list-laptop";
// import ProductListSmartHome from "../components/product-list-smart-home/product-list-smart-home";
// import ProductListSamsung from '../components/product-list-samsung/product-list-samsung';
// import ProductListKhac from "../components/product-list-khac/product-list-khac";
import ProductListBuyPhone from "../../components/Combo-PK-Component/product-list-buy-one-apple/index";
// import ProductListBuyIpad from '../components/product-list-buy-one-samsung/index';
import ComboIPhone16 from "../../components/Combo-PK-Component/ComboIPhone16/ComboIPhone16";
import ComboIPhone15 from "../../components/Combo-PK-Component/ComboIPhone15/ComboIPhone15";
// import ProductListApple2 from "../../components/Combo-PK-Component//product-list-apple-2/product-list-apple-2";
// import ProductListApple1 from "../../components/Combo-PK-Component/product-list-apple-1/product-list-apple-1";
// import ProductListApple3 from "../../components/Combo-PK-Component/product-list-apple-3/product-list-apple-3";
// import ProductListApple4 from "../../components/Combo-PK-Component/product-list-apple-4/product-list-apple-4";
export default function HomeCombo() {
  return (
    <div>
      <div className="bg-page">
        <Banner />
        <BannerSlide />
        <ComboIPhone16 />
        <ComboIPhone15 />
        {/* <ProductListBuyPhone /> */}
        {/* <ProductList /> */}
        {/* <ProductListApple1 />
        <ProductListApple2 />
        <ProductListApple3 />
        <ProductListApple4 /> */}
        <ProductListBaoda />
        <ProductListCuongLuc />
        <ProductListSacDuPhong />
        <ProductListCapsac />
        <ProductListLoa />
        <ProductListLaptop />
      </div>
    </div>
  );
}
