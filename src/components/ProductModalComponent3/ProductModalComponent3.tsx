'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, Modal, Select, Spin } from 'antd';
import Image from 'next/image';
import './ProductModalComponent3.scss';
import { Option } from 'antd/es/mentions';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
} from '@ant-design/icons';
import { Divider, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = React.createContext({ name: 'Default' });
export interface ProductDataModal3 {
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

export interface Product {
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
	ProductUse: Product | null;
	tinhtrangmay: string;
	selectedProduct: ProductDataModal3 | null;
}

const ProductModal3: React.FC<ProductModalProps> = ({
	modalOpen,
	selectedProduct,
	onCancelModal,
	selectedPrice,
	ProductUse,
	tinhtrangmay,
}) => {
	// Thêm state để lưu trữ thông tin người bán
	const [loading, setLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();
	const openNotification = (placement: NotificationPlacement) => {
		api.success({
			message: `Đăng ký thành công`,
			description: (
				<Context.Consumer>{({ name }) => <span>Chúc mừng bạn đã đăng ký thành công</span>}</Context.Consumer>
			),
			placement,
		});
	};
	const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		priceSell: 0, // Initialize to 0
		priceThu: 0,
		price: 0, // Initialize to 0
		store: 'Apple Center: 83 Trần Phú, P.4, Q.5',
		productUse: '',
		tinhtrangmay: tinhtrangmay,
		productName: '',
	});
	useEffect(() => {
		if (selectedProduct) {
			setFormData((prev) => ({
				...prev,
				priceSell: selectedProduct.price_range.minimum_price.final_price.value,
				price: selectedProduct.price_range.minimum_price.final_price.value - selectedPrice,
				productUse: ProductUse?.item.name || '',
				productName: selectedProduct.name || '',
				priceThu: selectedPrice,
			}));
		}
	}, [selectedProduct, selectedPrice, ProductUse]);
	const handleSubmit = async (values: any) => {
		setLoading(true);
		const dataToSend = { ...formData, ...values };

		try {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbyk9SIAxTIM--HkPzDuOYbWzplDnLC1n527jwOW4-0m-uHehJtjr_PcH8U1coh-4hs/exec',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(dataToSend),
				}
			);
			const result = await response.json();
			console.log('Response from Google Sheets:', result);
			setLoading(false);
		} catch (error) {
			console.error('Error sending data to Google Sheets:', error);
		} finally {
			setLoading(false);
			openNotification('topRight');
			onCancelModal();
		}
	};

	return (
		<>
			<Context.Provider value={contextValue}>
				{contextHolder}
				<Modal visible={modalOpen} onCancel={onCancelModal} footer={null} width={800} centered>
					<div className='productModal3-container'>
						{/* Left Column */}
						<div className='productModal3-leftColumn'>
							<div className='productModal3-card'>
								<h3>{selectedProduct?.name}</h3>
								<div className='productModal3-imageContainer'>
									<img src={selectedProduct?.image.url} alt='' className='productModal3-image' />
								</div>
								<p className='productModal3-priceInfo'>
									<p className='productModal3-sellingStatus'>Giá bán</p>
									<p className='productModal3-price'>
										{new Intl.NumberFormat('vi-VN').format(
											selectedProduct?.price_range.minimum_price.final_price.value || 0 // Fallback to 0
										)}{' '}
										VND.
									</p>
								</p>
								<p className='productModal3-priceInfo'>
									<p className='productModal3-oldPrice'>Giá thu</p>
									<p className='productModal3-price'>
										{new Intl.NumberFormat('vi-VN').format(selectedPrice)} VND.
									</p>
								</p>
								<p className='productModal3-priceInfo'>
									<p className='productModal3-additionalPayment'>Trả thêm</p>
									<p className='productModal3-price'>
										{new Intl.NumberFormat('vi-VN').format(
											(selectedProduct?.price_range.minimum_price.final_price.value || 0) -
											selectedPrice // Fallback to 0
										)}{' '}
										VND.
									</p>
								</p>
							</div>
						</div>

						{/* Right Column */}
						<div className='productModal3-rightColumn'>
							<Form layout='vertical' onFinish={handleSubmit}>
								<Form.Item label='Máy đang dùng'>
									<Input defaultValue={ProductUse?.item.name} disabled />
								</Form.Item>
								<Form.Item label='Tình trạng'>
									<Input defaultValue={tinhtrangmay} disabled className='productModal3-statusInput' />
								</Form.Item>
								<Form.Item label='Lưu ý'>
									<div className='productModal3-note'>
										Để biết giá thu cũ thể vui lòng mang máy đến cửa hàng để được báo giá chính xác
										nhất.
									</div>
								</Form.Item>
								<Form.Item label='Thông tin người bán'>
									<Form.Item
										name='name'
										rules={[{ required: true, message: 'Họ và Tên là bắt buộc' }]}
									>
										<Input
											placeholder='Họ & Tên'
											onChange={(e) => setFormData({ ...formData, name: e.target.value })}
										/>
									</Form.Item>
									<Form.Item
										name='phone'
										rules={[
											{ required: true, message: 'Số điện thoại là bắt buộc' },
											{
												len: 10,
												message: 'Số điện thoại phải có 10 số!',
											},
										]}
									>
										<Input
											type='tel'
											placeholder='Điện thoại'
											onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
										/>
									</Form.Item>
									<Form.Item name='email' rules={[{ required: true, message: 'Email là bắt buộc' }]}>
										<Input
											placeholder='Email'
											type='email'
											onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										/>
									</Form.Item>
								</Form.Item>

								<Form.Item label='Hệ thống cửa hàng'>
									<Select
										defaultValue={formData.store}
										onChange={(value) => setFormData({ ...formData, store: value })}
									>
										<Option value='Apple Center: 83 Trần Phú, P.4, Q.5'>
											Apple Center: 83 Trần Phú, P.4, Q.5
										</Option>
										<Option value='Samsung Premium Store: 134 Trần Phú, P.4, Q.5'>
											Samsung Premium Store: 134 Trần Phú, P.4, Q.5
										</Option>
										<Option value='136 Trần Phú, P.4, Q.5'>136 Trần Phú, P.4, Q.5</Option>
										<Option value='225 Trần Quang Khải, P.Tân Định, Q.1'>
											225 Trần Quang Khải, P.Tân Định, Q.1
										</Option>
										<Option value='251 - 253 Trần Hưng Đạo, P.Cô Giang, Q.1'>
											251 - 253 Trần Hưng Đạo, P.Cô Giang, Q.1
										</Option>
										<Option value='581 Nguyễn Thị Thập, P.Tân Phong, Q.7'>
											581 Nguyễn Thị Thập, P.Tân Phong, Q.7
										</Option>
										<Option value='316 - 318 Ba Tháng Hai, P.12, Q.10'>
											316 - 318 Ba Tháng Hai, P.12, Q.10
										</Option>
										<Option value='480 - 482 Quang Trung, P.10, Gò Vấp'>
											480 - 482 Quang Trung, P.10, Gò Vấp
										</Option>
										<Option value='194 Võ Văn Ngân, P.Bình Thọ, Thủ Đức'>
											194 Võ Văn Ngân, P.Bình Thọ, Thủ Đức
										</Option>
										<Option value='Trung tâm bảo hành: 81 Trần Phú, P.4, Q.5'>
											Trung tâm bảo hành: 81 Trần Phú, P.4, Q.5
										</Option>
									</Select>
								</Form.Item>
								{loading && (
									<Form.Item>
										<Button style={{ marginRight: '10px' }}>
											<span>Đang lấy thồng tin</span>
											<Spin />
										</Button>
									</Form.Item>
								)}
								{!loading && (
									<Form.Item>
										<Button type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
											XÁC NHẬN
										</Button>
									</Form.Item>
								)}
							</Form>
						</div>
					</div>
				</Modal>
			</Context.Provider>
		</>
	);
};

export default ProductModal3;
