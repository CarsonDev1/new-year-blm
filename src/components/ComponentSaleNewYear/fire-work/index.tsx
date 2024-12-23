import React from 'react';
import './fire-work.scss';

const Fireworks = () => {
	return (
		<div className='fireworks-container'>
			<div className='fireworks' style={{ left: '15%', top: '5%' }}></div>
			<div className='fireworks' style={{ right: '30%', top: '13%', animationDelay: '-0.4s' }}></div>
			<div className='fireworks' style={{ left: '5%', top: '23%', animationDelay: '-1.7s' }}></div>
			<div className='fireworks' style={{ right: '45%', top: '8%', animationDelay: '-3.1s' }}></div>
		</div>
	);
};

export default Fireworks;
