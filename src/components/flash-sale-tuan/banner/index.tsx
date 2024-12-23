"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bannerPC from "../../../../public/combo-pk/Head 1200x450.png";
import bannerMB from "../../../../public/combo-pk/Head 900x900.png";
import "./HeaderCombo.scss";

// Define interfaces for the data structure
interface BannerItem {
  banner_id: number;
  caption: string;
  link: string;
  media: string;
  media_alt: string;
  name: string;
  slider_id: number;
}

interface Banner {
  __typename: string;
  items: BannerItem[];
  page_info: {
    current_page: number;
    page_size: number;
    total_pages: number;
  };
}

interface SliderItem {
  title: string;
  identifier: string;
  Banner: Banner;
}

interface SliderData {
  Slider: {
    items: SliderItem[];
    total_count: number;
  };
}

interface ApiResponse {
  data: SliderData;
}

const HeaderCombo: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchBannerHeader = async () => {
      try {
        const response = await fetch(
          "https://beta-api.bachlongmobile.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
              query getSlider($filter: SliderFilterInput) {
                Slider(filter: $filter) {
                  items {
                    title
                    identifier
                    Banner {
                      __typename
                      items {
                        banner_id
                        caption
                        link
                        media
                        media_alt
                        name
                        slider_id
                      }
                      page_info {
                        current_page
                        page_size
                        total_pages
                      }
                    }
                  }
                  total_count
                }
              }
            `,
              variables: {
                filter: {
                  identifier: {
                    eq: "thang-tri-an",
                  },
                },
              },
            }),
          }
        );

        const result: ApiResponse = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchBannerHeader();
  }, []);

  console.log("Data fetched:", data);

  return (
    <div>
      {data?.data?.Slider?.items[0]?.Banner?.items[0]?.media ? (
        <Image
          src={data.data.Slider.items[0].Banner.items[0].media}
          alt="Banner PC"
          className="HeaderCombo-bannerPC"
          width={1200} // Set appropriate width for the image
          height={450} // Set appropriate height for the image
        />
      ) : (
        <Image
          src={bannerPC}
          alt="Banner PC Placeholder"
          className="HeaderCombo-bannerPC"
          width={1200}
          height={450}
        />
      )}
      <Image
        src={bannerMB}
        alt="Banner Mobile"
        className="HeaderCombo-bannerMB"
        width={900}
        height={900}
      />
    </div>
  );
};

export default HeaderCombo;
