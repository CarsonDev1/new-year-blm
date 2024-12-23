"use client";
import React, { useEffect, useState } from "react";
import "./rules.scss";
const queryBNew = `query getCategories($filters:CategoryFilterInput){categories(filters:$filters){__typename items{description icon_image image_banner name url_path daily_sale{start_date end_date sale_type}slider_banner_left{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}slider_banner_right{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}daily_sale_id slider_id slider_two is_trend content_hot content_new check_show_category_in_page check_show_brand_in_page show children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields}}}image_banner icon_image}}}}fragment CategoryTreeFields on CategoryTree{is_show_category_slider category_trend{__typename name image url_key url_path}icon_image image_banner slider_banner_left{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}slider_banner_right{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}slider_two is_trend show check_show_category_in_page check_show_brand_in_page content_hot content_new uid id available_sort_by canonical_url name image include_in_menu meta_description meta_keywords meta_title display_mode url_key url_path description path path_in_store children_count position}fragment BreadcrumbFields on Breadcrumb{category_level category_name category_uid category_url_key category_url_path}`;
const variables = {
  filters: { url_key: { eq: "the-le-flash-sale-tuan" } },
};
const Rules = () => {
  const [newsData, setNewsData] = useState(null);
  async function fetchBlogPostsData() {
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryBNew,
          variables,
        }),
      }
    );
    const data = await response.json();
    setNewsData(data.data.categories.items[0].description);
  }
  useEffect(() => {
    fetchBlogPostsData();
  }, []);

  return (
    <div className="rules-flash-sale" id="item-rules">
      <div className="container">
        <div
          className="flash-sale-css"
          dangerouslySetInnerHTML={{ __html: `${newsData}` }}
        />

        {/* <div className="rules-content">
          <h2 className="rules-section-title">
            I/ HALLOWEEN – LỄ HỘI ‘MA’, ƯU ĐÃI THẢ GA
          </h2>
          <ul className="rules-list">
            <li>Giảm giá tất cả các sản phẩm Apple MỚI - CŨ lên đến 50%</li>
            <li>
              Hoàn 100% chi phí di chuyển cho khách hàng trong nội thành TP.HCM
              (tối đa 300.000Đ)
            </li>
            <li>Bạch Long chơi lớn với vòng quay may mắn vật lý:</li>
            <ul className="rules-sublist">
              <li className="li-cus">
                Với hóa đơn mua hàng iPhone | iPad | MacBook | Apple Watch từ
                5.000.000 Đồng =&gt;{" "}
                <span className="rules-section-title-hot">
                  Nhận 1 Phiếu tham gia vòng quay trúng thưởng iPhone 16 trị giá
                  21 TRIỆU ĐỒNG.
                </span>
              </li>
              <li className="li-cus">
                Hóa đơn mua phụ kiện Apple từ 300.000 Đồng =&gt;{" "}
                <span className="rules-section-title-hot">
                  Nhận 1 Phiếu tham gia vòng quay trúng Trạm sạc Pisen chính
                  hãng trị giá 5 TRIỆU ĐỒNG.
                </span>
              </li>
              <li className="li-cus-02">
                Tất cả các khách hàng tham gia vòng quay may mắn đều{" "}
                <span className="rules-section-title-hot">trúng quà 100%</span>
              </li>
              <li className="li-cus-02">
                Thời gian:{" "}
                <span className="rules-section-title-hot">09h30</span>, ngày{" "}
                <span className="rules-section-title-hot">02/11/2024</span> tại
                Bạch Long Mobile,{" "}
                <span className="rules-section-title-hot">
                  251 - 253 Trần Hưng Đạo.
                </span>
              </li>
              <span className="">
                *Khuyến mãi được áp dụng cho tuỳ thiết bị
              </span>
            </ul>
          </ul>

          <h2 className="rules-section-title">
            II/ SĂN MA ‘HAY’ SĂN SALE ? – NGÀNH HÀNG APPLE GIẢM ĐẾN 50%
          </h2>
          <ul className="rules-list">
            <li>
              Giờ vàng giá sốc gồm 5 sản phẩm Apple hàng ngày giảm đến 50%
            </li>
            <li>Giảm đến 10 Triệu cho các sản phẩm Apple iPhone</li>
            <li>Giảm đến 11 Triệu cho các thiết bị Likenew </li>
            <li>Giảm đến 9 Triệu cho các thiết bị Samsung</li>
            <li>Giảm đến 8 Triệu cho iPad</li>
            <li>Phụ kiện giảm đến 90%</li>
            <ul>
              <li>
                Phụ kiện Apple giảm đến{" "}
                <span className="rules-section-title-hot">60%:</span>
              </li>
              <ul className="rules-sublist">
                <li>
                  Mua 1 tặng 1: Khi mua cường lực màn hình, ốp lưng,… sẽ
                  được tặng 1 Camera Lens trị giá 350.000đ
                </li>
                <ul>
                  <li>
                    Combo phụ kiện chính hãng giảm đến 
                    <span className="rules-section-title-hot">50%:</span>
                  </li>
                  <ul className="rules-sublist">
                    <li className="li-cus">
                      Combo 1: Ốp lưng và Cường lực chính hãng giá chỉ{" "}
                      <span className="rules-section-title-hot">960.000đ</span>{" "}
                      (Giá gốc 1.140.000đ)
                    </li>
                    <li className="li-cus">
                      Combo 2: Cường lực và Cốc sạc chính hãng giá chỉ{" "}
                      <span className="rules-section-title-hot">
                        1.060.000đ
                      </span>{" "}
                      (Giá gốc 1.410.000đ)
                    </li>
                    <li className="li-cus">
                      Combo 3: Ốp lưng, Cường lực và Camera lens chính hãng giá
                      chỉ{" "}
                      <span className="rules-section-title-hot">
                        1.360.000đ
                      </span>{" "}
                      (Giá gốc 1.650.000đ)
                    </li>
                    <li className="li-cus">
                      Combo 4: Ốp lưng, Cường, Camera lens và Cốc sạc chính hãng
                      giá chỉ{" "}
                      <span className="rules-section-title-hot">
                        1.260.000đ
                      </span>{" "}
                      (Giá gốc 2.470.000đ)
                    </li>
                  </ul>
                </ul>
              </ul>
            </ul>
          </ul>

          <h2 className="rules-section-title">
            III/ 6 ĐẶC QUYỀN KHI MUA HÀNG TẠI BẠCH LONG MOBILE
          </h2>
          <ul className="rules-list">
            <li>Vòng quay trúng iPhone 16 | Trạm sạc Pisen</li>
            <li>Thu cũ đổi mới 100% giá trị máy bán ra</li>
            <li>60 ngày đổi trả miễn phí</li>
            <li>Combo phụ kiện giảm đến 60%</li>
            <li>Giảm đến 1 triệu khi tham gia trả góp</li>
            <li>
              Vòng quay may mắn{" "}
              <span className="rules-section-title-hot">HẰNG NGÀY</span> 100%
              trúng quà:{" "}
              <span className="rules-section-title-hot">
                Tặng tiền mặt hoặc cốc sạc, cáp sạc và nón bảo hiểm
              </span>
            </li>
          </ul>

          <h2 className="rules-section-title">
            IV/ CÁC DỊCH VỤ ƯU ĐÃI THANH TOÁN, TRẢ GÓP, HOÀN TIỀN
          </h2>
          <ul className="rules-list">
            <li>
              Hoàn tiền <span className="rules-section-title-hot">300K</span>
               khi mua kèm 
              <span className="rules-section-title-hot">
                BHTD + chuyển khoản 100% giá trị
              </span>{" "}
              (áp dụng sản phẩm từ{" "}
              <span className="rules-section-title-hot">15 triệu</span> trở lên)
            </li>
            <li>
              Cà thẻ <span className="rules-section-title-hot">MIỄN PHÍ</span>{" "}
              với Visa, MasterCard
            </li>
            <li>
              Giao hàng Online tận nhà{" "}
              <span className="rules-section-title-hot">MIỄN PHÍ</span>
            </li>
          </ul>

          <h2 className="rules-section-title-cus text-italic">
            TIN KHUYẾN MÃI TỪ BẠCH LONG MOBILE - HỆ THỐNG UỶ QUYỀN CHÍNH HÃNG
            APPLE
          </h2>
          <ul className="rules-list">
            <li>
              Mọi chi tiết thắc mắc xin quý khách liên hệ: 
              <span className="rules-section-title-hot">
                1900.63.64.69 - 1900.63.69.81
              </span>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Rules;
