'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import './ComboIPhone16.scss';
import images1 from '../../../public/combo-01-16.png';
import images2 from '../../../public/combo-02-16.png';
import images3 from '../../../public/combo-03-16.png';
import images4 from '../../../public/combo-04-16.png';
interface ProductCombo16 {
	combo: string;
	persen: string;
	items: {
		type: string;
		items: {
			nameproduct: string;
			priceorigin: number;
			comboprice: number;
		}[];
	}[];
}

type FieldType = {
	username?: string;
	phone?: string;
	[key: string]: string | undefined;
};

const ComboIPhone16: React.FC = () => {
	const [fetchedData, setFetchedData] = useState<ProductCombo16[]>([]);
	const [selectedCombo, setSelectedCombo] = useState<ProductCombo16 | null>(null);
	const [modalIsOpenTest, setModalIsOpenTest] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const fetchData = async () => {
		const response = await fetch(
			'https://script.google.com/macros/s/AKfycbysamsKFA9Pbr0czRuXVDWKpnCo5BM3HxutpKXLPY_jemM6GZTBCkR6_5oe-nlnK92pbw/exec?id=iphone16',
			{
				method: 'GET',
			}
		);
		const data: ProductCombo16[] = await response.json();
		console.log('data 16', data);
		setFetchedData(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleClickTest = (combo: ProductCombo16) => {
		setSelectedCombo(combo);
		setModalIsOpenTest(true);
		form.resetFields();
		setTotalPrice(0);
	};

	const closeModalTest = () => {
		setModalIsOpenTest(false);
	};

	const onFinish = async (values: FieldType) => {
		setLoading(true);

		// Combine all selected products into a single string
		const selectedProducts = selectedCombo?.items.map((item) => values[item.type]).filter(Boolean);
		const productString = selectedProducts?.join(', ');

		const formData = {
			username: values.username,
			phone: values.phone,
			selectedOptions: productString,
			totalPrice: totalPrice,
			comboName: selectedCombo?.combo,
		};

		console.log('Form data to be sent:', formData);

		try {
			// const response = await fetch('https://script.google.com/macros/s/AKfycbysamsKFA9Pbr0czRuXVDWKpnCo5BM3HxutpKXLPY_jemM6GZTBCkR6_5oe-nlnK92pbw/exec', {
			//     method: 'POST',
			//     mode: "no-cors",
			//     body: JSON.stringify(formData),
			// });

			// if (response.status === 200 || response.status === 302) {
			//     console.log('Success:', response);
			//     message.success('Đơn hàng đã được gửi thành công!');
			//     closeModalTest();
			// } else {
			//     throw new Error('Unexpected response status');
			// }

			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbysamsKFA9Pbr0czRuXVDWKpnCo5BM3HxutpKXLPY_jemM6GZTBCkR6_5oe-nlnK92pbw/exec',
				{
					method: 'POST',
					mode: 'no-cors',
					body: JSON.stringify(formData),
				}
			);
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	const onValuesChange = (changedValues: any, allValues: FieldType) => {
		if (selectedCombo) {
			let newTotalPrice = 0;
			selectedCombo.items.forEach((item) => {
				const selectedProduct = item.items.find((subItem) => subItem.nameproduct === allValues[item.type]);
				if (selectedProduct) {
					newTotalPrice += selectedProduct.comboprice;
				}
			});
			setTotalPrice(newTotalPrice);
		}
	};
	const images = [images1, images2, images3, images4];
	return (
		<>
			<div className='banner-slide'>
				<div className='container'>
					<h1 className='title-combo-16'>COMBO PHỤ KIỆN IPHONE 16 SERIES</h1>
					<div className='banner-slide-combo'>
						{fetchedData.map((combo, index) => (
							<div key={index} className='banner-slide-combo-wrap' onClick={() => handleClickTest(combo)}>
								<div className='banner-slide-combo-card'>
									<div className='banner-slide-combo-header'>
										<div className='combo-txt'>
											<span>-{combo.persen}</span>
										</div>
									</div>
									<div className='banner-slide-combo-button'>{combo.combo}</div>
									<Image
										src={images[index]}
										width={400}
										height={400}
										alt={combo.combo}
										className='banner-slide-combo-image'
										loading='lazy'
									/>
								</div>
							</div>
						))}
					</div>
					<Modal visible={modalIsOpenTest} onCancel={closeModalTest} footer={false}>
						{selectedCombo && (
							<Form
								form={form}
								name='basic'
								labelCol={{ span: 8 }}
								wrapperCol={{ span: 16 }}
								onFinish={onFinish}
								onValuesChange={onValuesChange}
								autoComplete='off'
							>
								<h2 className='title-modal-combo'>{selectedCombo.combo}</h2>
								<Form.Item<FieldType>
									label='Họ và tên khách hàng'
									name='username'
									rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
								>
									<Input />
								</Form.Item>

								<Form.Item<FieldType>
									label='Số điện thoại'
									name='phone'
									rules={[
										{ required: true, message: 'Vui lòng nhập số điện thoại' },
										{
											pattern: /^\d{10}$/,
											message: 'Số điện thoại phải có 10 chữ số',
										},
									]}
								>
									<Input />
								</Form.Item>

								<div className='modal-content'>
									{selectedCombo.items.map((item, index) => (
										<div key={`form-item-wrapper-${index}`}>
											<h3>{item.type}:</h3>
											<Form.Item
												className='modal-select'
												name={item.type}
												// rules={[{ required: true, message: `Vui lòng chọn ${item.type}` }]}
											>
												<Select placeholder={`Chọn ${item.type}`}>
													{item.items.map((subItem, subIndex) => (
														<Select.Option
															key={`option-${index}-${subIndex}`}
															value={subItem.nameproduct}
														>
															<div className='option-content'>
																<span className='option-name'>
																	{subItem.nameproduct}
																</span>
																<span className='option-price'>
																	{subItem.comboprice.toLocaleString()} VND
																</span>
															</div>
														</Select.Option>
													))}
												</Select>
											</Form.Item>
										</div>
									))}
								</div>
								<div className='modal-price-wrap'>
									<span>Tổng tiền: </span>
									<h3 className='modal-price'>{totalPrice.toLocaleString()} VND</h3>
								</div>
								<Form.Item wrapperCol={{ span: 16 }} className='modal-btn-wrap'>
									<Button type='primary' htmlType='submit' loading={loading} className='modal-btn'>
										{loading ? 'Đang đặt hàng...' : 'Đặt hàng ngay'}
									</Button>
								</Form.Item>
							</Form>
						)}
					</Modal>
				</div>
			</div>
		</>
	);
};

export default ComboIPhone16;
