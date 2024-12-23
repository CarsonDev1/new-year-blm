/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import './product-list.scss';
import CardProduct from '../CardProduct/CardProduct';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import pklaptop from '../../../public/sac du phong.png';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import noProducts from '../../../public/img-no-pro-matching.webp';
import icon_fire from '../../../public/ic-fire.svg';

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
			eq: 'NjQ=', // Default to 'All'
		},
	},
	pageSize: 200,
	currentPage: 1,
};

async function fetchProductListDataAppleChinhHang() {
	const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables, // Sử dụng biến đã cập nhật
		}),
	});

	const data = await response.json();
	return data.data.products.items as Product[];
}

const Section5: React.FC = () => {
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ['productListDataAppleChinhHang', variables.filter.category_uid.eq], // Thêm category_uid vào queryKey
		queryFn: fetchProductListDataAppleChinhHang,
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

	// Update the activeTab state to change the category_uid based on the selected tab
	useEffect(() => {
		switch (activeTab) {
			case 'Cường Lực':
				variables.filter.category_uid.eq = 'MzE1'; // Set for 'Cường Lực'
				break;
			case 'Bao da, Ốp lưng':
				variables.filter.category_uid.eq = 'Njg='; // Set for 'Bao da, Ốp lưng'
				break;
			case 'AirPods':
				variables.filter.category_uid.eq = 'Njk='; // Set for 'AirPods'
				break;
			case 'Cáp sạc':
				variables.filter.category_uid.eq = 'NzI='; // Set for 'Cáp sạc'
				break;
			default:
				variables.filter.category_uid.eq = 'NjQ='; // Default to 'All'
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
		<div className='OldForNew-Section-apple' id='item-apple'>
			<div className='container'>
				{/* <Image src={pklaptop} alt="no-products" className="images-pk" /> */}

				<div className='OldForNew-Section-Container-apple'>
					<div className='header-table-combo-pk'>
						<div style={{ paddingBottom: '10px' }}>
							<h2 className='title-table-combo-pk'>Phụ Kiện Apple</h2>
						</div>
						<div className='tab-button-table-combo-pk'>
							<button
								className={`btn-tab-buyPhone ${
									activeTab === 'AirPods' ? 'btn-tab-buyPhone_active' : ''
								}`}
								onClick={() => setActiveTab('AirPods')}
							>
								AirPods
							</button>
							<button
								className={`btn-tab-buyPhone ${
									activeTab === 'Bao da, Ốp lưng' ? 'btn-tab-buyPhone_active' : ''
								}`}
								onClick={() => setActiveTab('Bao da, Ốp lưng')}
							>
								Bao da, Ốp lưng
							</button>
							<button
								className={`btn-tab-buyPhone ${
									activeTab === 'Cường Lực' ? 'btn-tab-buyPhone_active' : ''
								}`}
								onClick={() => setActiveTab('Cường Lực')}
							>
								Cường Lực
							</button>
							<button
								className={`btn-tab-buyPhone ${
									activeTab === 'Cáp sạc' ? 'btn-tab-buyPhone_active' : ''
								}`}
								onClick={() => setActiveTab('Cáp sạc')}
							>
								Cáp sạc
							</button>
							<button
								className={`btn-tab-buyPhone ${activeTab === 'All' ? 'btn-tab-buyPhone_active' : ''}`}
								onClick={() => setActiveTab('All')}
							>
								Tất cả
							</button>
						</div>
					</div>

					{data && data.length === 0 ? (
						<div className='no-products-message'>
							<Image src={noProducts} alt='no-products' className='no-products-image' />
							<span>Không có sản phẩm</span>
						</div>
					) : (
						<>
							<div className='OldForNew-Section5-ItemSlider'>
								{data?.slice(0, visibleProducts).map((product) => (
									<CardProduct
										key={product.id}
										name={product.name}
										url_key={product.url_key}
										image={product.image}
										price_range={product.price_range}
									/>
								))}
							</div>

							{data && data.length > 10 && (
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
