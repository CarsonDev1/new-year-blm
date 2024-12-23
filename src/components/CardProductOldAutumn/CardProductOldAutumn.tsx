/* eslint-disable @next/next/no-img-element */
import React from 'react';
import './CardProduct.css';
import iconconhang from '../../../public/ic-shipped.png';
import Image from 'next/image';
export interface Product {
	name: string;
	image: string;
	price: number;
}
function CardProduct({ name, image, price }: Omit<Product, 'id'>) {
	return (
		<div className='CardProduct'>
			<figure className='product__img'>
				<img className='product__img-detail' alt={name} src={image} />
			</figure>
			<div className='product__title' style={{ textDecoration: 'none' }}>
				{name}
			</div>
			<div className='product__groupPrice' style={{ textAlign: 'center' }}>
				<span className='product__price'>Giá thu: </span>
				<span className='product__priceSpecial'>{price.toLocaleString()} VND</span>
			</div>
		</div>
	);
}

export default CardProduct;
