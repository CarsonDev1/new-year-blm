'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './style.scss';
import { Spin } from 'antd';
import Link from 'next/link';
import Gold from '../../../../public/new-year/gold.png';
import CloudBanner from '../../../../public/new-year/cloud-banner.png';
import Cloud5 from '../../../../public/new-year/cloud-5.png';
import TimeBanner from '../../../../public/new-year/time-banner.png';
import TableTime from '../../../../public/new-year/table-time.png';

interface BannerItem {
	banner_id: number;
	caption: string;
	link: string;
	media: string;
	media_alt: string;
	name: string;
	slider_id: number;
}

interface Banner {
	__typename: string;
	items: BannerItem[];
	page_info: {
		current_page: number;
		page_size: number;
		total_pages: number;
	};
}

interface SliderItem {
	title: string;
	identifier: string;
	Banner: Banner;
}

interface SliderData {
	Slider: {
		items: SliderItem[];
		total_count: number;
	};
}

interface ApiResponse {
	data: SliderData;
}

function HeaderHalloween() {
	const [endDate, setEndDate] = useState(new Date('2024-12-24T21:30:00'));
	const [timeArray, setTimeArray] = useState([
		{ date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
	]);
	const [isEventOver, setIsEventOver] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const timeDiff = endDate.getTime() - now.getTime();

			if (timeDiff <= 0) {
				setIsEventOver(true);
				clearInterval(interval);
				return;
			}

			const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

			setTimeArray([{ date: endDate.toDateString(), days, hours, minutes, seconds }]);
		}, 1000);

		return () => clearInterval(interval);
	}, [endDate]);
	const [data, setData] = useState<ApiResponse | null>(null);

	const fetchBannerHeader = async () => {
		try {
			const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
            query getSlider($filter: SliderFilterInput) {
              Slider(filter: $filter) {
                items {
                  Banner {
                    __typename
                    items {
                     name
                     link           
                     media                     
                    }       
                  }
                }               
              }
            }
          `,
					variables: {
						filter: {
							identifier: {
								eq: 'don-giang-sinh-24-12',
							},
						},
					},
				}),
			});

			const result = await response.json();
			setData(result);
		} catch (err) {
			console.error('Error fetching data', err);
		}
	};
	useEffect(() => {
		fetchBannerHeader();
	}, []);

	return (
		<div className='page-sale-thang-12'>
			<div>
				{data?.data?.Slider?.items[0]?.Banner?.items[0]?.media ? (
					<Image
						src={data.data.Slider.items[0].Banner.items[0].media}
						alt='Banner PC'
						className='HeaderCombo-bannerPC'
						width={1820}
						height={500}
					/>
				) : (
					<Spin>
						<div style={{ width: 1820, height: 500 }} />
					</Spin>
				)}
				{data?.data?.Slider?.items[0]?.Banner?.items[1]?.media ? (
					<Image
						src={data.data.Slider.items[0].Banner.items[1].media}
						alt='Banner Mobile'
						className='HeaderCombo-bannerMB'
						width={900}
						height={900}
					/>
				) : (
					<Spin>
						<div style={{ width: 1820, height: 500 }} />
					</Spin>
				)}
			</div>
			<div
				className='banner-HeaderHalloween shine-banner'
				style={{ position: 'relative', overflow: 'hidden' }}
			></div>
			<div className='time-wrap'>
				<div className='cloud-banner-wrap'>
					<Image src={Gold} width={1920} height={900} alt='background-banner' className='gold-banner-right' />
					<Image src={Gold} width={1920} height={900} alt='background-banner' className='gold-banner-left' />
					<Image src={CloudBanner} width={1920} height={900} alt='background-banner' className='cloud-main' />
					{isEventOver ? (
						<div className='HeaderHalloween-time-line'>
							<p
								className='HeaderHalloween-time-line-end-text'
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									padding: '40px 0px',
									color: '#ff000e',
									fontSize: '32px',
									fontWeight: '600',
								}}
							>
								Hết thời gian sự kiện
							</p>
						</div>
					) : (
						<>
							<div className='wrap-timer'>
								<div className='timer'>
									{Array.from({ length: 3 }).map((_, index) => (
										<div className='timer-banner' key={index}>
											<Image
												src={TimeBanner}
												width={500}
												height={500}
												alt='background-banner'
												className='time-banner-item'
											/>
											{index === 0 && (
												<span className='txt-time' id='countdown-days'>
													{timeArray[0].days} <br /> ngày
												</span>
											)}
											{index === 1 && (
												<span className='txt-time' id='countdown-days'>
													{timeArray[0].hours} <br /> giờ
												</span>
											)}
											{index === 2 && (
												<span className='txt-time' id='countdown-days'>
													{timeArray[0].minutes} <br /> phút
												</span>
											)}
										</div>
									))}
								</div>
								<button className='button-rules'>Xem thể lệ</button>
							</div>
						</>
					)}
					<Image src={Cloud5} width={1920} height={900} alt='background-banner' className='cloud-main-02' />
					<Image src={Cloud5} width={1920} height={900} alt='background-banner' className='cloud-main-03' />
					<Image src={CloudBanner} width={1920} height={900} alt='background-banner' className='cloud-left' />
					<Image
						src={CloudBanner}
						width={1920}
						height={900}
						alt='background-banner'
						className='cloud-right'
					/>
				</div>
				<div className='container'>
					{isEventOver ? (
						<div className='HeaderHalloween-time-line'>
							<p
								className='HeaderHalloween-time-line-end-text'
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									padding: '40px 0px',
									color: '#ff000e',
									fontSize: '32px',
									fontWeight: '600',
								}}
							>
								Hết thời gian sự kiện
							</p>
						</div>
					) : (
						<div className='header-deal-24-12'>
							<div className='timer'>
								{Array.from({ length: 3 }).map((_, index) => (
									<div className='timer-banner' key={index}>
										<Image
											src={TimeBanner}
											width={500}
											height={500}
											alt='background-banner'
											className='time-banner-item'
										/>
										{index === 0 && (
											<span className='txt-time' id='countdown-days'>
												{timeArray[0].days} ngày
											</span>
										)}
										{index === 1 && (
											<span className='txt-time' id='countdown-days'>
												{timeArray[0].hours}
											</span>
										)}
										{index === 2 && (
											<span className='txt-time' id='countdown-days'>
												{timeArray[0].minutes}
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}
					<div
						style={{
							padding: '10px',
							// background: "linear-gradient(0deg, #0002ff, #7490ff)",
							// borderRadius: "10px",
							marginBottom: '20px',
						}}
					>
						<div className='HeaderHalloween-promotion-header' style={{ fontWeight: 400 }}>
							{` `}
							<p className='glitch-24-12'>8 đặc quyền mua hàng tại Bạch Long Mobile</p>
						</div>
						<div className='HeaderHalloween-promotion-list-privilege'>
							{data?.data?.Slider?.items[0]?.Banner?.items
								.filter((item) => item.name.includes('ưu đãi đón giáng sinh'))
								.map((item, index) => (
									<div key={index} className='privilege-img' style={{ cursor: 'pointer' }}>
										{item.link ? (
											<a href={item.link} target='_blank' rel='noopener noreferrer'>
												<Image
													src={item.media || ''}
													alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
													width={1200}
													height={1000}
												/>
											</a>
										) : (
											<Image
												src={item.media || ''}
												alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
												width={1200}
												height={1000}
											/>
										)}
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeaderHalloween;
