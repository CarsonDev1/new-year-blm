'use client';
import React from 'react';
import Image from 'next/image';
import bannerPC from '../../../public/THU CU DOI MOI PC.png';
import bannerMB from '../../../public/THU CU DOI MOI MB.jpg';
import './HeaderOldAutumn.scss';
const HeaderOldAutumn = () => {
	return (
		<div>
			<Image src={bannerPC} alt='' className='HeaderOldAutumn-bannerPC' />
			<Image src={bannerMB} alt='' className='HeaderOldAutumn-bannerMB' />

		</div>
	);
};

export default HeaderOldAutumn;
