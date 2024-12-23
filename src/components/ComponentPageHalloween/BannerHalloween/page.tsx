'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BgHallo from '../../../../public/halloween/bg-hallo.png';
import BgHalloMobile from '../../../../public/halloween/bg-hallo-mobile.png';
import HeadHallo from '../../../../public/halloween/head-hallo.png';
import TableBanner01 from '../../../../public/halloween/table-banner-01.png';
import TableBanner02 from '../../../../public/halloween/table-banner-02.png';
import TableBanner03 from '../../../../public/halloween/table-banner-03.png';
import TableBanner04 from '../../../../public/halloween/table-banner-04.png';
import Cloud1 from '../../../../public/halloween/cloud1.png';
import Cloud2 from '../../../../public/halloween/cloud2.png';
import Cloud3 from '../../../../public/halloween/cloud3.png';
import Cloud4 from '../../../../public/halloween/cloud4.png';
import Cloud5 from '../../../../public/halloween/cloud5.png';
import './banner-halloween.scss';

const BannerHalloween = () => {
	return (
		<div>
			<div className='halloween-wrap'>
				<div className='banner-hallo'>
					<div className='banner-hallo-table'>
						<div className='banner-hallo-table-item'>
							<Image
								src={TableBanner01}
								width={1000}
								height={1000}
								alt='table-banner-01'
								priority
								className='banner-hallo-table-01'
							/>
						</div>
						<div className='banner-hallo-table-item'>
							<Image
								src={TableBanner02}
								width={1000}
								height={1000}
								alt='table-banner-02'
								priority
								className='banner-hallo-table-02'
							/>
						</div>
						<div className='banner-hallo-table-item'>
							<Image
								src={TableBanner03}
								width={1000}
								height={1000}
								alt='table-banner-03'
								priority
								className='banner-hallo-table-03'
							/>
						</div>
						<div className='banner-hallo-table-item'>
							<Image
								src={TableBanner04}
								width={1000}
								height={1000}
								alt='table-banner-03'
								priority
								className='banner-hallo-table-03'
							/>
						</div>
					</div>
					<Image
						src={HeadHallo}
						width={2000}
						height={1900}
						alt='head-hallo'
						quality={100}
						priority
						className='head-hallo'
					/>
					<Image
						src={BgHalloMobile}
						width={1820}
						height={1500}
						alt='bg-hallo-mobile'
						className='bg-hallo-mobile'
					/>
				</div>
				<div className='clouds'>
					<Image src={Cloud1} alt='cloud-1' style={{ '--i': 1 } as any} width={1820} height={1500} />
					<Image src={Cloud2} alt='cloud-2' style={{ '--i': 2 } as any} width={1820} height={1500} />
					<Image src={Cloud3} alt='cloud-3' style={{ '--i': 3 } as any} width={1820} height={1500} />
					<Image src={Cloud4} alt='cloud-4' style={{ '--i': 4 } as any} width={1820} height={1500} />
					<Image src={Cloud5} alt='cloud-5' style={{ '--i': 5 } as any} width={1820} height={1500} />
				</div>
				<Image src={BgHallo} width={1820} height={1500} alt='bg-hallo' className='bg-hallo' />
				<div className='overlay'></div>
				<div className='sky'>
					<div className='moon' />
					<div className='clouds'>
						<span />
						<span />
						<span />
						<span />
					</div>
				</div>
				<div className='content'>
					<div className='level-0'>
						<div className='door'>
							<div className='nosferatu' />
							<div className='logs'>
								<span />
								<span />
								<span />
							</div>
						</div>
						<div className='shining' />
					</div>
					<div className='level-1'>
						<div className='window'>
							<div className='frankenstein' />
						</div>
						<div className='shining' />
					</div>
					<div className='level-2'>
						<div className='window'>
							<div className='witch' />
						</div>
						<div className='shining' />
					</div>
					<div className='balcony' />
					<div className='bat-cat'>
						<div className='body' />
						<div className='leg' />
						<div className='leg' />
						<div className='head' />
						<div className='ears' />
						<div className='tail' />
						<div className='wings'>
							<div className='wing'>
								<div className='finger' />
								<div className='finger' />
								<div className='finger' />
								<div className='finger' />
								<div className='membrane' />
								<div className='membrane' />
								<div className='membrane' />
							</div>
							<div className='wing'>
								<div className='finger' />
								<div className='finger' />
								<div className='finger' />
								<div className='finger' />
								<div className='membrane' />
								<div className='membrane' />
								<div className='membrane' />
							</div>
						</div>
					</div>
					<div className='roof-0'>
						<div className='window'>
							<div className='phantom' />
							<div className='phantom' />
						</div>
						<div className='shining' />
					</div>
					<div className='roof-1' />
					<div className='roof-2'>
						<div className='chimney' />
						<div className='smoke'>
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
					</div>
					<div className='flying-bat' />
					<div className='fence'>
						<span />
						<span />
						<div className='bat'>
							<div className='head'>
								<div className='eyes' />
								<div className='mouth' />
							</div>
							<div className='wings' />
							<div className='legs'>
								<div className='leg' />
								<div className='leg' />
							</div>
						</div>
						<div className='chimney' />
					</div>
					{/* <div className='fence'>
						<span />
						<span />
						<div className='tomb'>RIP</div>
						<div className='zombie-hand' />
						<div className='stones' />
					</div> */}
					<div className='skeleton-floating' />
					<div className='skeleton'>
						<div className='head'>
							<div className='cranium' />
							<div className='nose' />
							<div className='mouth' />
						</div>
						<div className='neck' />
						<div className='torso'>
							<div className='pelvis' />
							<div className='column' />
							<div className='rib' />
							<div className='rib' />
							<div className='clavicle' />
						</div>
						<div className='arms'>
							<div className='arm'>
								<div className='bone' />
								<div className='bone' />
								<div className='hand'>
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
								</div>
							</div>
							<div className='arm'>
								<div className='bone' />
								<div className='bone' />
								<div className='hand'>
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
								</div>
							</div>
						</div>
						<div className='legs'>
							<div className='leg'>
								<div className='bone' />
								<div className='bone' />
								<div className='bone ball' />
								<div className='foot'>
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
								</div>
							</div>
							<div className='leg'>
								<div className='bone' />
								<div className='bone' />
								<div className='bone ball' />
								<div className='foot'>
									<div className='bone' />
									<div className='bone' />
									<div className='bone' />
								</div>
							</div>
						</div>
					</div>
					<div className='electricity'>
						<div className='pole' />
						<div className='bar'>
							<span />
						</div>
						<div className='bar'>
							<span />
						</div>
						<div className='cable'>
							<span />
							<span />
							<span />
						</div>
						<div className='cable' />
						<div className='box'>
							<div className='sparks'>
								<span />
								<span />
								<span />
								<span />
								<span />
							</div>
						</div>
					</div>
					{/* <div className='pumpkin'>
						<span />
						<span />
						<span />
						<span />
						<span />
						<div className='eyes' />
						<div className='nose' />
						<div className='mouth'>
							<div className='teeth' />
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default BannerHalloween;
