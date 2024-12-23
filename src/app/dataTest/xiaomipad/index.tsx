"use client";
import React, { useEffect, useState } from "react";
import "./rules.scss";
const queryBNew = `query getProducts(
  $search: String
  $filter: ProductAttributeFilterInput
  $sort: ProductAttributeSortInput
  $pageSize: Int
  $currentPage: Int
) {
  products(
    search: $search
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      ...ProductInterfaceField
    }
    aggregations {
      attribute_code
      count
      label
      options {
        count
        label
        value
        swatch_data {
          type
          value
        }
      }
      position
    }
    sort_fields {
      default
      options {
        label
        value
      }
    }
    total_count
    page_info {
      current_page
      page_size
      total_pages
    }  }
}
fragment ProductInterfaceField on ProductInterface {
 image_banner
  __typename
  sku
  uid
  name
  url_key
  url_suffix
  canonical_url
  stock_status
  categories {
    __typename
    name
    url_key
    url_path
    level
    uid
    position
    icon_image
    image
    path
  }
  id
  meta_description
  meta_keyword
  meta_title
  new_from_date
  new_to_date
  rating_summary
  review_count
  thumbnail {
    url
    position
  }
  image {
    url
  }
  price_range {
    ...PriceRangeField
  }
  ...CustomField
}
fragment CustomField on ProductInterface {
  color
  country_of_manufacture
  daily_sale {
    end_date
    entity_id
    sale_price
    sale_qty
    saleable_qty
    sold_qty
    start_date
    __typename
  }
  rating_summary_start {
    star_1
    star_2
    star_3
    star_4
    star_5
  }
  attributes {
    attribute_code
    label
    value
  }
}
fragment PriceRangeField on PriceRange {
  __typename
  maximum_price {
    ...ProductPriceField
  }
  minimum_price {
    ...ProductPriceField
  }
}
fragment ProductPriceField on ProductPrice {
  discount {
    amount_off
    percent_off
  }
  final_price {
    currency
    value
  }
  regular_price {
    currency
    value
  }
}`;
const variables = {
  filter: {
    category_uid: {
      eq: "OTk=",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

const queryDetail = `query router($url:String!){route(url:$url){... on ConfigurableProduct{...ProductFields Installment_products image_banner categories{__typename name id uid level url_path parent_id}media_gallery{__typename url label disabled position ... on ProductVideo{video_content{video_provider video_url video_title media_type video_metadata}}}...PoductFiledConfigurable ...ConfigurableProductField options{...CustomizableOption}}... on SimpleProduct{...ProductFields image_banner __typename categories{__typename name uid level url_path}media_gallery{__typename url label disabled position ... on ProductVideo{video_content{video_provider video_url video_title media_type video_metadata}}}...PoductFiledSimple options{...CustomizableOption}}}}fragment PoductFiledSimple on ProductInterface{Installment_products attribute_set_id canonical_url category_for_product color country_of_manufacture created_at gift_message_available id manufacturer meta_description meta_keyword meta_title name new_from_date new_to_date only_x_left_in_stock options_container percent rating_summary review_count sku special_from_date special_price special_to_date stock_status swatch_image type_id uid updated_at url_key url_path url_suffix attributes{attribute_code label value}image{__typename disabled label position url}special_price price_range{__typename maximum_price{__typename discount{__typename amount_off percent_off}final_price{__typename currency value}}minimum_price{__typename discount{__typename amount_off percent_off}final_price{__typename currency value}}}short_description{html}description{html}}fragment PoductFiledConfigurable on ProductInterface{attribute_set_id category_for_product color country_of_manufacture created_at id manufacturer meta_description meta_keyword meta_title name options_container rating_summary sku special_from_date special_price special_to_date stock_status swatch_image type_id uid updated_at url_key url_path url_suffix accessories_bought_together{sku attribute_set_id canonical_url category_for_product color country_of_manufacture id manufacturer meta_description meta_keyword meta_title name new_from_date new_to_date options_container percent rating_summary review_count special_from_date special_price special_to_date stock_status swatch_image type_id uid url_key url_path attributes{attribute_code label value}image{disabled label position url}price_range{minimum_price{discount{amount_off percent_off}final_price{currency value}regular_price{currency value}}maximum_price{final_price{currency value}regular_price{currency value}}}reviews{items{average_rating created_at nickname summary text}}small_image{disabled label position url}thumbnail{disabled label position url}}old_products{sku attribute_set_id canonical_url category_for_product color id manufacturer meta_description meta_keyword meta_title name options_container percent rating_summary review_count special_from_date special_price special_to_date stock_status swatch_image type_id uid updated_at url_key url_path attributes{attribute_code label value}image{disabled label position url}price_range{minimum_price{discount{amount_off percent_off}final_price{currency value}regular_price{currency value}}maximum_price{final_price{currency value}regular_price{currency value}}}reviews{items{average_rating created_at nickname summary text}}small_image{disabled label position url}thumbnail{disabled label position url}}upsell_products{sku attribute_set_id canonical_url category_for_product color country_of_manufacture id manufacturer meta_description meta_keyword meta_title name options_container percent rating_summary review_count special_from_date special_price special_to_date stock_status swatch_image type_id uid url_key url_path attributes{attribute_code label value}image{disabled label position url}price_range{minimum_price{discount{amount_off percent_off}final_price{currency value}regular_price{currency value}}}reviews{items{average_rating created_at nickname summary text}}small_image{disabled label position url}thumbnail{disabled label position url}}related_products{sku attribute_set_id canonical_url category_for_product color country_of_manufacture id manufacturer meta_description meta_keyword meta_title name options_container percent rating_summary review_count special_from_date special_price special_to_date stock_status swatch_image type_id uid url_key url_path attributes{attribute_code label value}image{disabled label position url}price_range{minimum_price{discount{amount_off percent_off}final_price{currency value}regular_price{currency value}}}reviews{items{average_rating created_at nickname summary text}}small_image{disabled label position url}thumbnail{disabled label position url}}crosssell_products{name category_for_product color created_at id meta_title name options_container rating_summary sku special_from_date special_price special_to_date stock_status swatch_image type_id uid updated_at url_key url_path price_range{minimum_price{__typename discount{__typename amount_off percent_off}final_price{__typename currency value}regular_price{__typename currency value}}}attributes{attribute_code label value}image{disabled label position url}small_image{disabled label position url}...ConfigurableProductField}attributes{attribute_code label value}image{disabled label position url}price_range{minimum_price{__typename discount{__typename amount_off percent_off}final_price{__typename currency value}regular_price{__typename currency value}}}review_count short_description{html}description{html}small_image{disabled label position url}thumbnail{disabled label position url}}fragment ConfigurableProductField on ConfigurableProduct{configurable_options{label attribute_code uid attribute_uid values{default_label label uid swatch_data{__typename value}}}configurable_product_options_selection{__typename configurable_options{attribute_code label uid values{__typename uid label is_use_default is_available}}}variants{attributes{code label uid value_index}product{__typename sku name daily_sale{sale_price}image{url}price_range{maximum_price{__typename discount{__typename amount_off percent_off}final_price{__typename currency value}}minimum_price{discount{__typename amount_off percent_off}final_price{__typename currency value}regular_price{__typename currency value}}}small_image{__typename disabled label position url}url_key}}}fragment CustomizableOption on CustomizableOptionInterface{... on CustomizableDropDownOption{option_id required sort_order title uid value{option_type_id price price_type title sort_order uid}}}fragment ProductFields on ProductInterface{daily_sale{end_date entity_id sale_price sale_qty saleable_qty sold_qty start_date __typename}}`;
const variablesDetail = {
  url: "iphone-16-pro-max-256gb-chinh-hang-vn-a",
};
const Rules = () => {
  const [newsData, setNewsData] = useState<any[] | null>(null);
  const [newsDataPrice2, setNewsDataPrice2] = useState<any | null>(null);
  const [newsDataPrice, setNewsDataPrice] = useState<number[]>([]);
  const [newsDataDetail, setNewsDataDetail] = useState<Map<string, any>>(
    new Map()
  );
  const [clickCount, setClickCount] = useState(0);
  async function dataTest() {
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
    setNewsData(data?.data?.products?.items);

    if (data?.data?.products?.items) {
      const prices: number[] = [];
      for (const item of data.data.products.items) {
        const detailResponse = await fetch(
          "https://beta-api.bachlongmobile.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: queryDetail,
              variables: { url: item.url_key },
            }),
          }
        );
        const detailData = await detailResponse.json();
        const price = detailData.data.route.options?.[0]?.value?.[0]?.price;
        prices.push(price);
        setNewsDataPrice2(detailData.data.route.attributes?.[0]?.value);
        setNewsDataDetail((prev) =>
          new Map(prev).set(
            item.url_key,
            Array.isArray(detailData.data.route.variants)
              ? detailData.data.route.variants
              : [detailData.data.route]
          )
        );
      }
      setNewsDataPrice(prices);
    }
  }
  useEffect(() => {
    dataTest();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (newsData && newsDataDetail.size > 0) {
        newsData.forEach((item, index) => {
          const detail = newsDataDetail.get(item.url_key);
          if (detail) {
            detail.forEach((d: any) => {
              const syntheticEvent = {
                preventDefault: () => {},
                currentTarget: {
                  /* Add necessary properties here if needed */
                },
              } as React.FormEvent<HTMLFormElement>;
              handleSubmit(syntheticEvent, d, index, item); // Gọi hàm submit cho từng detail
            });
          }
        });
      }
    }, 15000); // Thay đổi 5000 thành khoảng thời gian bạn muốn (ms)

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [newsData, newsDataDetail]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    detail: any,
    index: number,
    item: any
  ) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const priceValue =
      item.price_range?.maximum_price?.final_price?.value ||
      item.price_range?.minimum_price?.final_price?.value;
    const price = item.attributes[0].value || item.attributes[0].value;

    // Kiểm tra giá trị price trước khi gửi

    const formData = {
      sku: detail?.product?.sku || detail?.sku,
      name: detail?.product?.name || detail?.name,
      price: priceValue, // Sử dụng giá trị đã kiểm tra
      sale: price,
      url: `https://bachlongmobile.com/products/${item.url_key}/?sku=${
        detail?.product?.sku || detail?.sku
      }`,
      urlImage: detail?.product?.image?.url || detail?.image?.url,
    };

    // Gửi dữ liệu đến Google Sheets
    await fetch(
      "https://script.google.com/macros/s/AKfycbzfx6lArA9mHQmqYQX7aZhdcCOLXCMWHQ0sxtdpdRnMWi2qdGy4LXAreSVbMqmgZfIlyg/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
  };

  return (
    <div className="rules-flash-sale" id="item-rules">
      {newsData &&
        newsData.map((item: any, index: number) => (
          <div key={item.uid} style={{ zIndex: "999" }}>
            {newsDataDetail
              .get(item.url_key)
              ?.map((detail: any, detailIndex: number) => (
                <div key={detailIndex}>
                  <form onSubmit={(e) => handleSubmit(e, detail, index, item)}>
                    <input
                      type="text"
                      name="sku"
                      value={detail?.product?.sku || detail?.sku}
                      readOnly
                    />
                    <input
                      type="text"
                      name="name"
                      value={detail?.product?.name || detail?.name}
                      readOnly
                    />
                    <input
                      type="text"
                      name="sale"
                      value={
                        item.price_range?.maximum_price?.final_price?.value ||
                        item.price_range?.minimum_price?.final_price?.value
                      }
                      readOnly
                    />
                    <input
                      type="text"
                      name="price"
                      value={
                        item.attributes[0]?.value || item.attributes[0]?.value
                      }
                      readOnly
                    />
                    <input
                      type="text"
                      name="url"
                      value={`https://bachlongmobile.com/products/${
                        item.url_key
                      }/?sku=${detail?.product?.sku || detail?.sku}`}
                      readOnly
                    />
                    <input
                      type="text"
                      name="image"
                      value={detail?.product?.image?.url || detail?.image?.url}
                      readOnly
                    />
                    <button type="submit">Submit</button>
                  </form>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Rules;
