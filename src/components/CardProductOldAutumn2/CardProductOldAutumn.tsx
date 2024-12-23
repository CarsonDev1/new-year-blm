/* eslint-disable @next/next/no-img-element */
import React from 'react';
import './CardProduct.css';
import iconconhang from '../../../public/ic-shipped.png';
import Image from 'next/image';
export interface Product {
	name: string;
	images: string;
	price1: number;
	selectedPrice: number;
}
function CardProduct({ name, images, price1, selectedPrice }: Omit<Product, 'id'>) {
	return (
		<div className='CardProductOldAutumn2'>
			<figure className='product__img'>
				<img className='product__img-detail' alt={name} src={images} />
			</figure>
			<div className='product__title' style={{ textDecoration: 'none' }}>
				{name}
			</div>
			<div className='CardProductOldAutumn2__groupPrice' style={{ textAlign: 'center' }}>
				<p className='CardProductOldAutumn2__price'>Đang bán: </p>
				<p className='CardProductOldAutumn2__priceSpecial'>{price1.toLocaleString()}VND</p>
			</div>
			<div className='CardProductOldAutumn2__groupPrice' style={{ textAlign: 'center' }}>
				<p className='CardProductOldAutumn2__price'>Giá thu: </p>
				<p className='CardProductOldAutumn2__priceSpecial'>{selectedPrice.toLocaleString()}VND</p>
			</div>
			<div className='CardProductOldAutumn2__groupPrice' style={{ textAlign: 'center' }}>
				<p className='CardProductOldAutumn2__price'>Trả thêm: </p>
				<p className='CardProductOldAutumn2__priceSpecial'>{(price1 - selectedPrice).toLocaleString()}VND</p>
			</div>
		</div>
	);
}

export default CardProduct;
