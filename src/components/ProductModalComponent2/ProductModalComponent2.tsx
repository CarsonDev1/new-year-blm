'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import Image from 'next/image';
import './ProductModalComponent2.scss';
import { useQuery } from '@tanstack/react-query';
import CardProductOldAutumn2 from '../../components/CardProductOldAutumn2/CardProductOldAutumn';
import ProductModal3 from '../ProductModalComponent3/ProductModalComponent3';
interface Product {
	item: {
		name: string;
		img: string;
		price1: number;
		price2: number;
		price3: number;
	};
}
interface ProductModalProps {
	modalOpen: boolean;
	onCancelModal: () => void;
	selectedPrice: number;
	tinhtrangmay: string;
	selectedProduct: Product | null;
}
export interface ProductData {
	id: number;
	name: string;
	url_key: string;
	modalOpen: boolean;
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
const ProductModal2: React.FC<ProductModalProps> = ({
	modalOpen,
	selectedProduct,
	onCancelModal,
	selectedPrice,
	tinhtrangmay,
}) => {
	const [visibleProducts, setVisibleProducts] = useState<number>(12);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [filteredData, setFilteredData] = useState<Product[]>([]);
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
	const [activeTab, setActiveTab] = useState<string>('iPhone');
	const [categoryUid, setCategoryUid] = useState<string>('Mjgx');
	const [isModal3Open, setIsModal3Open] = useState<boolean>(false); // New state for Modal 3
	const [selectedCard, setSelectedCard] = useState<ProductData | null>(null);
	const fetchProductListDataBuyPhone = async (category_uid: string) => {
		setLoading(true);
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
		console.log('data máy mới', data);
		setLoading(false);
		return data.data.products.items as ProductData[];
	};
	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		switch (tab) {
			case 'iPhone':
				setCategoryUid('Mjgx'); // Gán categoryUid cho iPhone
				break;
			case 'iPad':
				setCategoryUid('NA=='); // Gán categoryUid cho iPad
				break;
			case 'Apple Watch':
				setCategoryUid('Nw=='); // Gán categoryUid cho iPad
				break;
			case 'Samsung':
				setCategoryUid('MzAy'); // Gán categoryUid cho Samsung
				break;
			case 'Laptop':
				setCategoryUid('NQ=='); // Gán categoryUid cho Samsung
				break;
			case 'Macbook':
				setCategoryUid('MTcx'); // Gán categoryUid cho Samsung
				break;
			default:
				setCategoryUid('Mjgx'); // Gán mặc định
		}
	};
	const { data, error, isLoading } = useQuery({
		queryKey: ['productListDataBuyPhone', activeTab],
		queryFn: () => fetchProductListDataBuyPhone(categoryUid),
		staleTime: 300000,
	});
	const toggleProducts = () => {
		if (isExpanded) {
			setVisibleProducts(9);
			setIsExpanded(false);
		} else {
			setVisibleProducts(data ? data.length : 0); // Check if data is defined
			setIsExpanded(true);
		}
	};
	const handleCardClick = (product: ProductData) => {
		setSelectedCard(product); // Set the selected product
		setIsModal3Open(true);
		onCancelModal();
	};
	console.log('data detail', selectedCard);
	return (
		<>
			<Modal visible={modalOpen} onCancel={onCancelModal} footer={null} width={1000} centered>
				<h2 className='BodyOldAutumn-titleModal'>DANH SÁCH SẢN PHẨM ĐỔI MÁY</h2>
				<div className='modal-product2-tab-button'>
					<button
						className={`modal-product2-button ${activeTab === 'iPhone' ? 'active' : ''}`}
						onClick={() => handleTabChange('iPhone')}
					>
						iPhone
					</button>
					<button
						className={`modal-product2-button ${activeTab === 'Samsung' ? 'active' : ''}`}
						onClick={() => handleTabChange('Samsung')}
					>
						Samsung
					</button>
					<button
						className={`modal-product2-button ${activeTab === 'Apple Watch' ? 'active' : ''}`}
						onClick={() => handleTabChange('Apple Watch')}
					>
						Apple Watch
					</button>
					<button
						className={`modal-product2-button ${activeTab === 'iPad' ? 'active' : ''}`}
						onClick={() => handleTabChange('iPad')}
					>
						iPad
					</button>
					<button
						className={`modal-product2-button ${activeTab === 'Laptop' ? 'active' : ''}`}
						onClick={() => handleTabChange('Laptop')}
					>
						Laptop
					</button>
					<button
						className={`modal-product2-button ${activeTab === 'Macbook' ? 'active' : ''}`}
						onClick={() => handleTabChange('Macbook')}
					>
						Macbook
					</button>
				</div>
				{loading && (
					<div
						className='loading container-spin flex items-center justify-center'
						style={{
							height: '200px',
							margin: '0 auto',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Spin />
					</div>
				)}
				{data && data.length === 0 ? (
					<div className='no-products-message'>
						<span>Không có sản phẩm</span>
					</div>
				) : (
					<>
						<div className='BodyOldAutumn-Section-ItemSlider'>
							{data?.slice(0, visibleProducts).map((product: any) => (
								<div key={product.id} onClick={() => handleCardClick(product)}>
									<CardProductOldAutumn2
										name={product.name}
										images={product.image.url}
										price1={product.price_range.minimum_price.final_price.value}
										selectedPrice={selectedPrice}
									/>
								</div>
							))}
						</div>

						{data && data.length > 9 && (
							<div className='load-more-modal-product2'>
								<button className='btn-load-more-modal-product2' onClick={toggleProducts}>
									{isExpanded ? 'Thu gọn' : 'Xem thêm'}
								</button>
							</div>
						)}
					</>
				)}
			</Modal>
			<ProductModal3
				modalOpen={isModal3Open}
				ProductUse={selectedProduct}
				selectedProduct={selectedCard}
				onCancelModal={() => setIsModal3Open(false)}
				selectedPrice={selectedPrice}
				tinhtrangmay={tinhtrangmay}
			/>
		</>
	);
};

export default ProductModal2;
