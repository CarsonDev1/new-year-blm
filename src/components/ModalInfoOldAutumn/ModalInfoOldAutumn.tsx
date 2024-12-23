import React, { useMemo, useState } from 'react';
import { Modal, Spin, Form, Input, Checkbox } from 'antd';
import './ModalInfoOldAutumn.scss';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
} from '@ant-design/icons';
import { Button, Divider, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = React.createContext({ name: 'Default' });
interface ModalFormProps {
	visible: boolean; // Kiểu dữ liệu cho visible
	onCancel: () => void; // Kiểu dữ liệu cho onCancel
}
const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel }) => {
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
	const [loading, setLoading] = useState(false);
	const handleOk = async (values: any) => {
		console.log('Form data: ', values);
		setLoading(true);
		// Send form data to Google Sheets
		try {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbyk9SIAxTIM--HkPzDuOYbWzplDnLC1n527jwOW4-0m-uHehJtjr_PcH8U1coh-4hs/exec',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				}
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			console.log('Success:', data);
		} catch (error) {
			console.error('Error sending data to Google Sheets:', error);
		} finally {
			setLoading(false);
			openNotification('topRight');
			onCancel();
		}
	};

	return (
		<>
			<Context.Provider value={contextValue}>
				{contextHolder}
				<Modal visible={visible} onCancel={onCancel} footer={null}>
					<h2 className='ModalInfoOldAutumn-title'>
						Bạn không tìm thấy sản phẩm cần định giá? Để lại thông tin để{' '}
						<strong className='ModalInfoOldAutumn-description-strong'>Bạch Long Mobile</strong> tư vấn thêm
						bạn nhé
					</h2>
					<Form layout='vertical' onFinish={handleOk}>
						<Form.Item
							label='Nhập họ tên'
							name='name'
							rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
						>
							<Input placeholder='Nhập họ tên' />
						</Form.Item>
						<div style={{ display: 'flex', gap: '10px', width: '100%' }}>
							<Form.Item
								label='Số điện thoại'
								name='phone'
								rules={[
									{ required: true, message: 'Vui lòng nhập số điện thoại!' },
									{
										len: 10,
										message: 'Số điện thoại phải có 10 số!',
									},
								]}
								style={{ width: '100%' }}
							>
								<Input placeholder='Nhập số điện thoại' />
							</Form.Item>

							<Form.Item
								label='Email'
								name='email'
								rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
								style={{ width: '100%' }}
							>
								<Input placeholder='Nhập email' />
							</Form.Item>
						</div>

						<Form.Item
							label='Địa chỉ của bạn'
							name='address'
							rules={[{ required: true, message: 'Vui lòng nhập số địa chỉ!' }]}
						>
							<Input placeholder='Nhập quận/huyện, tỉnh thành' />
						</Form.Item>

						<Form.Item
							label='Nhập mẫu máy bạn cần thu'
							name='model'
							rules={[{ required: true, message: 'Vui lòng nhập tên máy!' }]}
						>
							<Input placeholder='Nhập tên máy, loại máy' />
						</Form.Item>

						<Form.Item
							label='Mô tả ngắn về tình trạng máy'
							name='tinhtrangmay'
							rules={[{ required: true, message: 'Vui lòng nhập tình trạng máy!' }]}
						>
							<Input placeholder='Mô tả' />
						</Form.Item>

						<Form.Item
							label='Sản phẩm cần tư vấn lên đời'
							name='productName'
							rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
						>
							<Input placeholder='Mô tả' />
						</Form.Item>

						<Form.Item name='acceptemail' valuePropName='checked'>
							<Checkbox>Đăng ký nhận bản tin khuyến mãi qua email</Checkbox>
						</Form.Item>
						<Form.Item name='check' valuePropName='checked' initialValue={true} noStyle></Form.Item>
						{loading && (
							<Form.Item>
								<button className='ModalInfoOldAutumn-button'>
									<span>Đang lấy thồng tin</span>
									<Spin />
								</button>
							</Form.Item>
						)}
						{!loading && (
							<Form.Item>
								<button className='ModalInfoOldAutumn-button'>Đăng ký ngay</button>
							</Form.Item>
						)}
					</Form>
				</Modal>
			</Context.Provider>
		</>
	);
};

export default ModalForm;
