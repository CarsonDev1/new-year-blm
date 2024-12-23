'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Spin } from 'antd';
import './product.scss';
import DecorProduct from '../../../../public/halloween/ic-to.png';
import DecorWomen from '../../../../public/halloween/decor-women-07.png';
import FrameProduct from '../../../../public/halloween/frame-product.png';
import { useProductSaleData } from '../../../app/hooksHalloween/useProductSaleData';
import DecorProduct2 from '../../../../public/halloween/ICON-DRAGON.png';
export interface Product {
	id: number;
	name: string;
	url_key: string;
	image: {
		url: string;
	};
	attributes: any;
	price_range: {
		minimum_price: {
			final_price: {
				value: number;
				currency: string;
			};
		};
	};
}

const query = `
 query getProducts(
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
}
`;

const variables = {
	filter: {
		category_uid: {
			eq: 'MzQ4',
		},
	},
	pageSize: 200,
	currentPage: 1,
};

async function fetchProductListData() {
	const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const data = await response.json();
	return data.data.products.items as Product[];
}

const AccessoriesList: React.FC = () => {
	const {
		data: AccessSaleHot,
		error,
		isLoading,
	} = useQuery<Product[]>({
		queryKey: ['accessoriesData'],
		queryFn: fetchProductListData,
		staleTime: 300000,
	});

	const { data } = useProductSaleData();
	const productSale = data?.[0]?.items;

	const productSaleNames = productSale?.map((productSale: any) => productSale.product.name);
	const productSalePrices = productSale?.map((productSale: any) => productSale.sale_price);

	const getProductSalePrice = (productName: string, originalPrice: number) => {
		if (productSaleNames && productSalePrices) {
			const saleIndex = productSaleNames.findIndex((name: string) => name === productName);
			if (saleIndex !== -1) {
				return productSalePrices[saleIndex].toLocaleString('vi-VN');
			}
		}
		return originalPrice.toLocaleString('vi-VN');
	};

	const [activeTab, setActiveTab] = useState<string>('Cường lực');
	const [activeSubTab, setActiveSubTab] = useState<string>('');
	const [filteredData, setFilteredData] = useState<Product[]>([]);
	const [visibleCount, setVisibleCount] = useState<number>(10);

	const tabs = [
		{
			name: 'Cường lực',
		},
		{
			name: 'Ốp lưng',
		},
		{
			name: 'Loa',
		},
		{
			name: 'Sạc dự phòng',
		},
	];

	useEffect(() => {
		const filtered = AccessSaleHot?.filter((product) => {
			const lowerActiveTab = activeTab.toLowerCase();
			const lowerProductName = product.name.toLowerCase();

			const matchesTab =
				(lowerActiveTab === 'cường lực' && activeSubTab === 'Cường lực') ||
				(lowerActiveTab === 'ốp lưng' && activeSubTab === 'Ốp lưng') ||
				(lowerActiveTab === 'loa' && activeSubTab === 'Loa') ||
				(lowerActiveTab === 'sạc dự phòng' && activeSubTab === 'Sạc dự phòng')
					? lowerProductName.includes(lowerActiveTab) &&
					  !lowerProductName.includes('pro') &&
					  !lowerProductName.includes('plus')
					: lowerProductName.includes(lowerActiveTab);

			const lowerActiveSubTab = activeSubTab.toLowerCase();
			const matchesSubTab = activeSubTab
				? lowerActiveSubTab.includes('pro max')
					? lowerProductName.includes('pro max')
					: lowerActiveSubTab.includes('pro')
					? lowerProductName.includes('pro') && !lowerProductName.includes('pro max')
					: lowerProductName.includes(lowerActiveSubTab)
				: true;

			return matchesTab && matchesSubTab;
		});
		setFilteredData(filtered || []);

		const handleResize = () => {
			if (window.innerWidth < 768) {
				setVisibleCount(4);
			} else {
				setVisibleCount(10);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [AccessSaleHot, activeTab, activeSubTab]);

	if (isLoading) {
		return (
			<div className='container-spin'>
				<Spin size='large' />
			</div>
		);
	}

	if (error) {
		return <div>Error loading data</div>;
	}

	const visibleProducts = filteredData.slice(0, visibleCount);

	const loadMore = () => {
		setVisibleCount((prevCount) => prevCount + 10);
	};

	return (
		<div
			style={
				{
					// background: 'linear-gradient(180deg, #5D0069 0, var(--bg-gradient-white, #15001B) 90%)',
				}
			}
		>
			<div id='item-mac'>
				<div className='upgrade-list'>
					<div className='container'>
						<div className='women-decor'>
							<Image src={DecorWomen} width={1920} height={1200} alt='product-banner-01' className='' />
						</div>
						<div className='tabs'>
							{tabs.map((tab) => (
								<div key={tab.name}>
									<button
										onClick={() => {
											setActiveTab(tab.name);
										}}
										className={activeTab === tab.name ? 'tab active' : 'tab'}
										style={{
											color: activeTab === tab.name ? '#fff' : '#333',
											backgroundColor: activeTab === tab.name ? '#ff4d4f' : '#fff',
											border: activeTab === tab.name ? '2px solid #ff4d4f' : '2px solid #eee',
											padding: '12px 24px',
											margin: '8px',
											borderRadius: '8px',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											boxShadow: activeTab === tab.name ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
										}}
									>
										{tab.name}
									</button>
								</div>
							))}
						</div>

						{/* <div style={{ display: 'flex', marginBottom: '12px' }} className='sub-tab-list'>
						{tabs
							.find((tab) => tab.name === activeTab)
							?.subTabs.map((subTab) => (
								<button
									key={subTab}
									onClick={() => setActiveSubTab(subTab)}
									className={activeSubTab === subTab ? 'sub-tab active' : 'sub-tab'}
									style={{
										color: activeSubTab === subTab ? 'white' : '#000',
										backgroundColor: activeSubTab === subTab ? '#ef373e' : '#f1f1f1',
										border: activeSubTab === subTab ? '1px solid #ef373e' : '1px solid #ccc',
										padding: '5px 10px',
										margin: '5px',
										borderRadius: '5px',
										cursor: 'pointer',
									}}
								>
									{subTab}
								</button>
							))}
					</div> */}

						<div className='upgrade'>
							{visibleProducts.map((product, index) => (
								<Link
									key={index}
									href={`https://bachlongmobile.com/products/${product.url_key}`}
									passHref
									target='_blank'
									rel='noopener noreferrer'
									style={{ textDecoration: 'none', color: 'black' }}
								>
									<div className='upgrade-item'>
										<div className='upgrade-item-header'>
											<Image
												src={DecorProduct}
												width={80}
												height={80}
												quality={100}
												alt='decor-product'
												className='decor-product'
											/>
											<Image
												src={DecorProduct2}
												width={80}
												height={80}
												quality={100}
												alt='decor-product'
												className='decor-product2'
											/>
											<span></span>
											{/* Only show "Trả góp 0%" if the product price is greater than 3,000,000 */}
											{product.price_range.minimum_price.final_price.value > 3000000 && (
												<span className='percent'>Trả góp 0%</span>
											)}
										</div>
										<div className='upgrade-item-img'>
											<div className='img-content'>
												<Image
													src={product.image.url}
													width={1400}
													height={1200}
													quality={100}
													alt={`product-${index}`}
												/>
											</div>
											<div className='frame-product'>
												<Image
													src={FrameProduct}
													width={500}
													height={500}
													quality={100}
													alt='frame-product'
												/>
											</div>
										</div>
										<div className='upgrade-item-content'>
											<h4 className='upgrade-item-content-tt'>{product.name}</h4>
											<div className='upgrade-item-content-body'>
												<div className='upgrade-item-content-body-price'>
													{getProductSalePrice(
														product.name,
														product.price_range.minimum_price.final_price.value
													)}{' '}
													{product.price_range.minimum_price.final_price.currency}
												</div>
												<div className='upgrade-item-content-body-reduced'>
													<div className='price-reduced'>
														{product.attributes && product.attributes[0]?.value
															? Number(product.attributes[0].value).toLocaleString(
																	'vi-VN'
															  )
															: ''}{' '}
														{product.attributes[0].value &&
															product.price_range.minimum_price.final_price.currency}
													</div>

													{product.attributes[0].value && (
														<div className='percent'>
															-
															{Math.ceil(
																((product.attributes[0].value -
																	product.price_range.minimum_price.final_price
																		.value) /
																	product.attributes[0].value) *
																	100
															)}
															%
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
						{visibleCount < filteredData.length && (
							<div style={{ textAlign: 'center', marginTop: '20px' }}>
								<button
									onClick={loadMore}
									style={{
										backgroundColor: '#ef373e',
										color: 'white',
										border: 'none',
										padding: '10px 20px',
										borderRadius: '5px',
										cursor: 'pointer',
									}}
								>
									Xem thêm
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccessoriesList;
