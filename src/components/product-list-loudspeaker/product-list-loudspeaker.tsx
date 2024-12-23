/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import './product-list-loudspeaker.scss';
// import { Carousel } from "antd";
import CardProduct from '../CardProduct/CardProduct';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import pklaptop from '../../../public/loa tai gnhe.png';
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
			eq: 'MTM3',
		},
	},
	pageSize: 200,
	currentPage: 1,
};

async function fetchProductListDataLoa() {
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
		queryKey: ['productListDataLoa'],
		queryFn: fetchProductListDataLoa,
		staleTime: 300000,
	});

	const [activeTab, setActiveTab] = useState<string>('Al');
	const [filteredData, setFilteredData] = useState<Product[]>([]);
	const [visibleProducts, setVisibleProducts] = useState<number>(10);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	useEffect(() => {
		if (activeTab === 'All') {
			setFilteredData(data || []);
		} else {
			const filtered = data?.filter(
				(product) =>
					product.name.toLowerCase().includes('loa') || product.name.toLowerCase().includes('tai nghe')
			);
			setFilteredData(filtered || []);
		}
		setVisibleProducts(10);
		setIsExpanded(false);
	}, [activeTab, data]);

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
		<div className='OldForNew-Section-loudspeaker' id='item-loudspeaker'>
			<div className='container'>
				<div className='OldForNew-Section-Container-loudspeaker'>
					<div className='header-table-combo-pk'>
						<div style={{ paddingBottom: '10px' }}>
							<h2 className='title-table-combo-pk'>Phụ Kiện Loa, Tai nghe</h2>
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
