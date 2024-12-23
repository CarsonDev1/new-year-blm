/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import './product-list-backup-charger.scss';
// import { Carousel } from "antd";
import CardProduct from '../CardProduct/CardProduct';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import pklaptop from '../../../public/sac du phong.png';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import noProducts from '../../../public/img-no-pro-matching.webp';
export interface Product {
	id: number;
	name: string;
	url_key: string;
	image: {
		url: string;
	};
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
}
}
fragment ProductInterfaceField on ProductInterface {
id
name
url_key
image {
  url
}
price_range {
  minimum_price {
    final_price {
      value
      currency
    }
  }
}
}
`;

const variables = {
	filter: {
		category_uid: {
			eq: 'MTk=',
		},
	},
	pageSize: 200,
	currentPage: 1,
};

async function fetchProductListDataSacDuPhong() {
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

const Section5: React.FC = () => {
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ['productListDataSacDuPhong', variables.filter.category_uid.eq],
		queryFn: fetchProductListDataSacDuPhong,
		staleTime: 300000,
	});

	const [activeTab, setActiveTab] = useState<string>('All');
	const [filteredData, setFilteredData] = useState<Product[]>([]);
	const [visibleProducts, setVisibleProducts] = useState<number>(10);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	useEffect(() => {
		if (activeTab === 'All') {
			setFilteredData(data || []);
		} else {
			const filtered = data?.filter((product) => product.name.toLowerCase().includes(activeTab.toLowerCase()));
			setFilteredData(filtered || []);
		}
		setVisibleProducts(10);
		setIsExpanded(false);
	}, [activeTab, data]);
	useEffect(() => {
		switch (activeTab) {
			case 'SamSung':
				variables.filter.category_uid.eq = 'ODE=';
				break;
			case 'Pisen':
				variables.filter.category_uid.eq = 'MjMz';
				break;
			case 'Innostyle':
				variables.filter.category_uid.eq = 'MjMy';
				break;
			case 'Khác':
				variables.filter.category_uid.eq = 'MjM0';
				break;
			default:
				variables.filter.category_uid.eq = 'MTk=';
		}
	}, [activeTab]);
	const toggleProducts = () => {
		if (isExpanded) {
			setVisibleProducts(10);
			setIsExpanded(false);
		} else {
			setVisibleProducts(filteredData.length);
			setIsExpanded(true);
		}
	};

	const loadMore = () => {
		setVisibleProducts((prevVisible) => prevVisible + 5);
	};

	if (isLoading) {
		return (
			<div className='loading container-spin'>
				<Spin />
			</div>
		);
	}

	if (error) {
		return <div>Error loading data</div>;
	}

	return (
		<div className='OldForNew-Section-backup-charger' id='item-backup-charger'>
			<div className='container'>
				<div className='OldForNew-Section-Container-backup-charger'>
					<div className='header-table-combo-pk'>
						<div style={{ paddingBottom: '10px' }}>
							<h2 className='title-table-combo-pk'>Phụ Kiện Sạc Dự Phòng</h2>
						</div>
						<div className='tab-button-table-combo-pk'>
							<button
								className={`btn-tab-buyPhone ${
									activeTab === 'SamSung' ? 'btn-tab-buyPhone_active' : ''
								}`}
								onClick={() => setActiveTab('SamSung')}
							>
								SamSung
							</button>
							<button
								className={`btn-tab-buyPhone ${activeTab === 'Pisen' ? 'btn-tab-buyPhone_active' : ''}`}
								onClick={() => setActiveTab('Pisen')}
							>
								Pisen
							</button>
							<button
								className={`btn-tab-buyPhone ${
									activeTab === 'Innostyle' ? 'btn-tab-buyPhone_active' : ''
								}`}
								onClick={() => setActiveTab('Innostyle')}
							>
								Innostyle
							</button>

							<button
								className={`btn-tab-buyPhone ${activeTab === 'All' ? 'btn-tab-buyPhone_active' : ''}`}
								onClick={() => setActiveTab('All')}
							>
								Tất cả
							</button>
						</div>
					</div>

					{filteredData.length === 0 ? (
						<div className='no-products-message'>
							<Image src={noProducts} alt='no-products' className='no-products-image' />
							<span>Không có sản phẩm</span>
						</div>
					) : (
						<>
							<div className='OldForNew-Section5-ItemSlider'>
								{filteredData.slice(0, visibleProducts).map((product) => (
									<CardProduct
										key={product.id}
										name={product.name}
										url_key={product.url_key}
										image={product.image}
										price_range={product.price_range}
									/>
								))}
							</div>
							{filteredData.length > 10 && (
								<div className='load-more-container'>
									<button onClick={toggleProducts}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Section5;
