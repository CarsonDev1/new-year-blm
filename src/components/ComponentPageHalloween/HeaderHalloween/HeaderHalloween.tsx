'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './HeaderHalloween.scss';

import Link from 'next/link';
import Privilege01 from '../../../../public/halloween/privilege-01.png';
import Privilege02 from '../../../../public/halloween/privilege-02.png';
import Privilege03 from '../../../../public/halloween/privilege-03.png';
import Privilege04 from '../../../../public/halloween/privilege-04.png';
import Privilege05 from '../../../../public/halloween/privilege-05.png';
import Privilege06 from '../../../../public/halloween/privilege-06.png';

function HeaderHalloween() {
	const [endDate, setEndDate] = useState(new Date('2024-10-31T21:30:00'));

	const [timeArray, setTimeArray] = useState([
		{ date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
	]);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const timeDiff = endDate.getTime() - now.getTime();
			const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

			setTimeArray([{ date: endDate.toDateString(), days, hours, minutes, seconds }]);
		}, 1000);

		return () => clearInterval(interval);
	}, [endDate]);

	return (
		<div className='HeaderHalloween'>
			<div
				className='banner-HeaderHalloween shine-banner'
				style={{ position: 'relative', overflow: 'hidden' }}
			></div>
			<div className='container'>
				<div className='HeaderHalloween-time-line'>
					<div className='HeaderHalloween-time-line-container'>
						<div className='HeaderHalloween-time-line-card-container'>
							{timeArray.map((time, index) => (
								<div className='HeaderHalloween-time-line-card-key' key={index}>
									<div className='HeaderHalloween-time-line-card'>
										<div className='content-card'>
											<p className='HeaderHalloween-time-line-count'>{`${time.days} `}</p>
											<p className='HeaderHalloween-time-line-subtext'>Ngày</p>
										</div>
									</div>
									<div className='HeaderHalloween-time-line-card'>
										<div className='content-card'>
											<p className='HeaderHalloween-time-line-count'>{`${time.hours} `}</p>
											<p className='HeaderHalloween-time-line-subtext'>Giờ</p>
										</div>
									</div>
									<div className='HeaderHalloween-time-line-card'>
										<div className='content-card'>
											<p className='HeaderHalloween-time-line-count'>{`${time.minutes} `}</p>
											<p className='HeaderHalloween-time-line-subtext'>Phút</p>
										</div>
									</div>
									<div className='HeaderHalloween-time-line-card'>
										<div className='content-card'>
											<p className='HeaderHalloween-time-line-count'>{`${time.seconds} `}</p>
											<p className='HeaderHalloween-time-line-subtext'>Giây</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<button>Xem thể lệ</button>
					</div>
				</div>
				<div className='HeaderHalloween-promotion-header'>6 đặc quyền mua hàng tại Bạch Long Mobile</div>
				<div className='HeaderHalloween-promotion-list-privilege'>
					<div style={{ cursor: 'pointer' }} className='privilege-img'>
						<Image src={Privilege01} alt='privilege-01' width={1200} height={1000} />
					</div>
					<Link href='https://bachlongmobile.com/thu-cu-doi-moi/' className='privilege-img'>
						<Image src={Privilege02} alt='privilege-02' width={1200} height={1000} />
					</Link>
					<Link
						href='https://bachlongmobile.com/promotion/tet-apple-bao-hanh-toan-dien/'
						className='privilege-img'
					>
						<Image src={Privilege03} alt='privilege-03' width={1200} height={1000} />
					</Link>
					<Link href='https://bachlongmobile.com/combo-phu-kien/' className='privilege-img'>
						<Image src={Privilege04} alt='privilege-04' width={1200} height={1000} />
					</Link>
					<div style={{ cursor: 'pointer' }} className='privilege-img'>
						<Image src={Privilege05} alt='privilege-05' width={1200} height={1000} />
					</div>
					<div style={{ cursor: 'pointer' }} className='privilege-img'>
						<Image src={Privilege06} alt='privilege-05' width={1200} height={1000} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeaderHalloween;
