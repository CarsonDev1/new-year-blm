'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Button, Form, Input, Select, Modal, FormProps, Carousel } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './banner-slide.scss';
import iconbaoda from '../../../public/icon-baoda.png';
import iconcuongluc from '../../../public/icon-cuongluc.png';
import iconsacduphong from '../../../public/icon-sacduphong.png';
import iconapple from '../../../public/icon-apple.png';
import iconlaptop from '../../../public/icon-laptop.png';
import icontainghe from '../../../public/icon-tainghe.png';
import icondongho from '../../../public/icon-dongho.png';
import iconcapsac from '../../../public/icon-capsac.png';
import iconthenho from '../../../public/icon-thenho.png';
import iconloa from '../../../public/icon-loa.png';
import iconsmarthome from '../../../public/icon-smart-home.png';
import iconkhac from '../../../public/icon-khac.png';
import iconSamsung from '../../../public/icon-samsung.png';
import Image from 'next/image';
import bannerSlider from '../../../public/banner-pk-apple-1200-040624.png';
import bannerSlider2 from '../../../public/banner-slide-01.png';
import Link from 'next/link';
type FieldType = {
	username?: string;
	phone?: string;
	selectedOptions?: { [key: string]: string };
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
};

const BannerSlide = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalIsOpenTest, setModalIsOpenTest] = useState(false);
	const [modalData, setModalData] = useState<any>(null);
	const [totalPrice, setTotalPrice] = useState(0);
	const [loading, setLoading] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<{
		[key: string]: string;
	}>({});

	const [customerData, setCustomerData] = useState<any[]>([]);

	useEffect(() => {
		const fetchCustomerData = async () => {
			try {
				const response = await fetch(
					'https://script.googleusercontent.com/macros/echo?user_content_key=_r2Tnu3qTrt7FRaAe6XPptz6lD9UD8qOCA68N6XZoVQyQA3iXUg7WJwNgDdQsCWEuCsR_HO3pOMONNHgxublinyWF-UonaYjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNI54tzkJFaj-2iqaolXYotR08AGyFDWn--IfZJqRMOkhO8zfrvzkwbu57uzLUW5qHdqhbqBsOC_67mC9p03Mhbyn1Z4YyOlLg&lib=MFcmlpet2YYsjuSSgQUXZZPGWYEKb6JDU',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
						mode: 'no-cors',
					}
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				setCustomerData(data);
				console.log('Customer data:', data);
			} catch (error) {
				console.error('Error fetching customer data:', error);
			}
		};

		fetchCustomerData();
	}, []);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		const allOptionsSelected = modalData.details.every((item: any) => selectedOptions[item.name] !== undefined);

		if (!allOptionsSelected) {
			toast.error('Vui lòng chọn đầy đủ các tùy chọn.');
			return;
		}

		setLoading(true);

		const selectedOptionsForSubmit = modalData.details.map((item: any) => ({
			name: item.name,
			selectedOption: item.options.find((option: any) => option.name === values[item.name as keyof FieldType]),
			selectedPrice: item.selectedPrice || 0,
		}));

		fetch(
			'https://script.google.com/macros/s/AKfycbxut5e6PaLVe5TXZK5fsplzTlKrefCqaUfn4pDiQdMzYUT79DdPwz5f70jQjvEYwaxykw/exec',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				mode: 'no-cors',
				body: JSON.stringify({
					username: values.username,
					phone: values.phone,
					selectedOptions: selectedOptionsForSubmit,
					comboName: modalData.name,
					totalPrice: formatPrice(totalPrice),
				}),
			}
		)
			.then((response) => {
				toast.success('Đặt hàng thành công!');
				setModalIsOpen(false);
				setLoading(false);
				return response.text();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error('Error:', error);
				toast.error('Đặt hàng thất bại. Vui lòng thử lại.');
				setLoading(false);
			});
	};
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
	[];

	const handleClickLeatherCase = () => {
		const LeatherCase = document.getElementById('item-leather-case');
		if (LeatherCase) {
			LeatherCase.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleClickApple = () => {
		const Apple = document.getElementById('item-apple');
		if (Apple) {
			Apple.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleClickBackupCharger = () => {
		const BackupCharger = document.getElementById('item-backup-charger');
		if (BackupCharger) {
			BackupCharger.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleClickLaptop = () => {
		const Laptop = document.getElementById('item-laptop');
		if (Laptop) {
			Laptop.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleClickChargingCable = () => {
		const ChargingCable = document.getElementById('item-charging-cable');
		if (ChargingCable) {
			ChargingCable.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleClickLoudspeaker = () => {
		const Loudspeaker = document.getElementById('item-loudspeaker');
		if (Loudspeaker) {
			Loudspeaker.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleClickSamSung = () => {
		const SamSung = document.getElementById('item-samsung');
		if (SamSung) {
			SamSung.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleClickStrength = () => {
		const Strength = document.getElementById('item-strength');
		if (Strength) {
			Strength.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const [selectedCombo, setSelectedCombo] = useState<ProductCombo16 | null>(null);
	const handleClickTest = (combo: ProductCombo16) => {
		setSelectedCombo(combo);
		setModalIsOpenTest(true);
	};
	return (
		<div className='banner-slide'>
			<div className='container'>
				<div
					className=''
					style={{
						display: 'flex',
						gap: '10px',
						margin: 'auto',
						justifyContent: 'center',
						padding: '20px 0px',
					}}
				>
					<div className='OldForNew-Section1-imageSliderBanner'>
						<Carousel autoplay autoplaySpeed={2000} dots={false} arrows={true}>
							<Link href='https://bachlongmobile.com/phu-kien/chon-dong-phu-kien/apple/'>
								<div className='OldForNew-Section1-image'>
									<Image src={bannerSlider} alt='' className='OldForNew-Section1-imageItem' />
								</div>
							</Link>

							<Link href='https://bachlongmobile.com/phu-kien/chon-dong-phu-kien/apple/'>
								<div className='OldForNew-Section1-image'>
									<Image src={bannerSlider2} alt='' className='OldForNew-Section1-imageItem' />
								</div>
							</Link>
							<Link href='https://bachlongmobile.com/phu-kien/chon-dong-phu-kien/apple/'>
								<div className='OldForNew-Section1-image'>
									<Image src={bannerSlider} alt='' className='OldForNew-Section1-imageItem' />
								</div>
							</Link>
						</Carousel>
					</div>
					<div className='OldForNew-Section1-imageSliderBanner'>
						<Carousel autoplay autoplaySpeed={2000} dots={false} arrows={true}>
							<Link href='https://bachlongmobile.com/phu-kien/chon-dong-phu-kien/apple/'>
								<div className='OldForNew-Section1-image'>
									<Image src={bannerSlider2} alt='' className='OldForNew-Section1-imageItem' />
								</div>
							</Link>
							<Link href='https://bachlongmobile.com/phu-kien/chon-dong-phu-kien/apple/'>
								<div className='OldForNew-Section1-image'>
									<Image src={bannerSlider} alt='' className='OldForNew-Section1-imageItem' />
								</div>
							</Link>
							<Link href='https://bachlongmobile.com/phu-kien/chon-dong-phu-kien/apple/'>
								<div className='OldForNew-Section1-image'>
									<Image src={bannerSlider2} alt='' className='OldForNew-Section1-imageItem' />
								</div>
							</Link>
						</Carousel>
					</div>
				</div>

				<div>
					<ul className='list-item-click'>
						<li className='item-click' onClick={handleClickApple}>
							<Image src={iconapple} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>Apple</p>
						</li>
						{/* <li className='item-click' onClick={handleClickSamSung}>
							<Image src={iconSamsung} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>SamSung</p>
						</li> */}
						<li className='item-click' onClick={handleClickLeatherCase}>
							<Image src={iconbaoda} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>Bao da, ốp lưng</p>
						</li>
						<li className='item-click' onClick={handleClickStrength}>
							<Image src={iconcuongluc} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>Cường lực</p>
						</li>
						<li className='item-click' onClick={handleClickBackupCharger}>
							<Image src={iconsacduphong} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>Sạc dự phòng</p>
						</li>{' '}
						<li className='item-click' onClick={handleClickChargingCable}>
							<Image src={iconcapsac} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>Cáp sạc</p>
						</li>{' '}
						{/* <li className="item-click" onClick={handleClickEarphone}>
              <Image
                src={icontainghe}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Tai nghe</p>
            </li>{" "} */}
						{/* <li className="item-click" onClick={handleClickWatch}>
              <Image
                src={icondongho}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Đồng hồ</p>
            </li> */}
						{/* <li className="item-click" onClick={handleClickUsb}>
              <Image
                src={iconthenho}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Thẻ nhớ, USB, Hub</p>
            </li> */}
						<li className='item-click' onClick={handleClickLoudspeaker}>
							<Image src={iconloa} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>Loa, Tai nghe</p>
						</li>
						<li className='item-click' onClick={handleClickLaptop}>
							<Image src={iconlaptop} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>Đồ chơi công nghệ</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BannerSlide;
