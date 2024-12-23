/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import './product-list-buy-one-phone.scss';
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

const fetchProductListDataBuyPhone = async (category_uid: string) => {
	const variables = {
		filter: {
			category_uid: {
				eq: category_uid,
			},
		},
		pageSize: 200,
		currentPage: 1,
	};

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
};

const Section5: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('iPhone');
	const [visibleProducts, setVisibleProducts] = useState<number>(15);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const categoryUid = activeTab === 'iPhone' ? 'MzI2' : 'MzI4';

	const { data, error, isLoading } = useQuery({
		queryKey: ['productListDataBuyPhone', activeTab],
		queryFn: () => fetchProductListDataBuyPhone(categoryUid),
		staleTime: 300000,
	});

	const toggleProducts = () => {
		setIsExpanded((prev) => !prev);
		setVisibleProducts((prev) => (isExpanded ? 10 : data?.length || 0));
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
		<div className='OldForNew-Section5'>
			<div className='container'>
				{/* <Image src={pklaptop} alt="no-products" className="images-pk" /> */}

				<div className='OldForNew-Section5-Container'>
					<div className='header-table-combo-pk'>
						<div style={{ paddingBottom: '10px' }}>
							<h2 className='title-table-combo-pk'>Phụ Kiện Mua 1 Tặng 1</h2>
						</div>
						<div style={{ display: 'flex', gap: '10px', paddingBottom: '10px' }}>
							<button
								className={`btn-tab-buyPhone ${
									activeTab === 'iPhone' ? 'btn-tab-buyPhone_active' : ''
								}`} // Added 'red' class
								onClick={() => setActiveTab('iPhone')}
							>
								Phụ kiện iPhone
							</button>
							<button
								className={`btn-tab-buyPhone ${activeTab === 'iPad' ? 'btn-tab-buyPhone_active' : ''}`} // Added 'red' class
								onClick={() => setActiveTab('iPad')}
							>
								Phụ kiện iPad
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
