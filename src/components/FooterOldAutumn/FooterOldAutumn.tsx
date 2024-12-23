'use client';
import React, { useState } from 'react';
import './FooterOldAutumn.scss'; // Import the global SCSS
import Image from 'next/image';
import imageThuCu from '../../../public/thucudoimoi.png';
import imagePhone from '../../../public/ic-phone-white.svg';
import ModalForm from '../ModalInfoOldAutumn/ModalInfoOldAutumn';
const FooterOldAutumn = () => {
	const [isExpanded, setIsExpanded] = useState(false); // State to manage expansion
	const [isModalVisible, setIsModalVisible] = useState(false);
	const toggleDescription = () => {
		setIsExpanded(!isExpanded); // Toggle the expanded state
	};

	const showModal = () => {
		setIsModalVisible(true); // Show the modal
	};

	const handleModalCancel = () => {
		setIsModalVisible(false); // Hide the modal
	};
	return (
		<div style={{ backgroundColor: '#FFFEED', padding: '10px 0' }}>
			<div className='container'>
				<footer className='FooterOldAutumn'>
					<div className='FooterOldAutumn-mainSection'>
						<div className='FooterOldAutumn-mainSection-info'>
							<p className='FooterOldAutumn-heading'>Bạn không tìm thấy sản phẩm cần định giá?</p>
							<button className='FooterOldAutumn-ctaButton' onClick={showModal}>
								Nhấn tại đây
							</button>
						</div>

						<p className='FooterOldAutumn-description'>
							Nhằm chào đón sự kiện ra mắt cửa hàng mới, từ ngày{' '}
							<strong className='FooterOldAutumn-description-strong'>15/09 đến 31/10/2024</strong>, Bạch
							Long Mobile chính thức khởi động chương trình{' '}
							<strong className='FooterOldAutumn-description-strong'>Thu Cũ Đổi Mới </strong> cực kỳ hấp
							dẫn, mang đến cho khách hàng cơ hội nâng cấp thiết bị với hàng loạt ưu đãi và tiện ích vượt
							trội.
						</p>
						<p className='FooterOldAutumn-supportText'>1. Thu Nhanh – Lên Đời Trong Tích Tắc</p>
						<p className='FooterOldAutumn-description'>
							Bạn lo lắng quá trình thu cũ đổi mới sẽ mất nhiều thời gian và phức tạp? Đừng lo! Tại Bạch
							Long Mobile, chúng tôi mang đến giải pháp nhanh gọn, tiện lợi nhất cho khách hàng.
						</p>
						<div
							className='FooterOldAutumn-description-display'
							style={{ display: isExpanded ? 'block' : 'none' }}
						>
							<ul style={{ listStyleType: 'circle', lineHeight: '1.5', padding: '0 20px' }}>
								<li>
									<strong className='FooterOldAutumn-description-strong'>
										Quy trình siêu nhanh chóng
									</strong>
									: Chỉ mất 15 phút để hoàn tất quá trình thu máy.
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'> Không cần phụ kiện</strong>:
									Khách hàng chỉ cần đem máy, không cần quan tâm đến nguồn gốc, dù là hàng chính hãng
									hay nhập khẩu.
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>Trả góp 0%</strong>: Hỗ trợ
									trả góp với lãi suất ưu đãi, không phát sinh bất kỳ chi phí nào khác. Với quy trình
									đơn giản, bạn sẽ có ngay thiết bị mới mà không cần chờ đợi lâu.
								</li>
							</ul>
							<p className='FooterOldAutumn-supportText'>
								2. Trợ Giá Cao Nhất Thị Trường – Thu 100% Giá Trị Máy
							</p>
							<p>
								<span className='FooterOldAutumn-description'>
									Để mang đến cơ hội sở hữu các sản phẩm công nghệ mới nhất, Bạch Long Mobile hỗ trợ
									mức trợ giá cực kỳ hấp dẫn, thu 100% giá trị máy.
								</span>
							</p>
							<ul style={{ listStyleType: 'circle', lineHeight: '1.5', padding: '0 20px' }}>
								<li>
									<strong className='FooterOldAutumn-description-strong'>
										iPhone, iPad, Apple Watch, iMac, Macbook
									</strong>
									<span>: Thu 100% giá trị máy.</span>
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>Các dòng máy khác</strong>
									<span>: Cũng nhận được trợ giá tương tự, thu 100% giá trị máy.</span>
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>
										Ưu đãi độc quyền tại Bạch Long Mobile
									</strong>
									<span>: Tặng ngay </span>
									<strong className='FooterOldAutumn-description-strong'>cốc sạc nhanh 20W</strong>
									<span> khi tham gia thu cũ đổi mới, cùng </span>
									<strong className='FooterOldAutumn-description-strong'>
										gói bảo hành toàn diện
									</strong>
									<span> cho máy mới.</span>
								</li>
							</ul>
							<p>
								<strong className='FooterOldAutumn-description-strong'>
									Với mức trợ giá cao và nhiều ưu đãi độc quyền, đây chính là cơ hội tuyệt vời để bạn
									sở hữu thiết bị mới với chi phí thấp hơn bao giờ hết.
								</strong>
							</p>
							<p style={{ padding: '20px 0' }}>
								<strong>
									<Image src={imageThuCu} alt='Thu cũ đổi mới' />
								</strong>
							</p>
							<p className='FooterOldAutumn-supportText'>3. Dẫn Đầu Thu Đổi – Hoàn Tiền Nhân Đôi</p>
							<p className='FooterOldAutumn-description'>
								Bạch Long Mobile không chỉ dẫn đầu trong dịch vụ thu đổi, mà còn cam kết mang lại giá
								trị cao nhất cho khách hàng với chính sách hoàn tiền nhân đôi.
							</p>
							<ul style={{ listStyleType: 'circle', lineHeight: '1.5', padding: '0 20px' }}>
								<li>
									<strong className='FooterOldAutumn-description-strong'>Hoàn tiền nhân đôi</strong>
									<span>nếu bạn tìm thấy nơi nào khác thu máy với giá cao hơn Bạch Long Mobile.</span>
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>
										Giá bán rẻ nhất thị trường
									</strong>
									<span> cho các dòng điện thoại mới nhất.</span>
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>Giảm ngay 700.000đ</strong>
									<span> khi chọn phương thức thanh toán trả góp.</span>
								</li>
							</ul>
							<p>
								<strong className='FooterOldAutumn-description-strong'>
									Với cam kết mang lại giá trị tốt nhất cho khách hàng, bạn hoàn toàn yên tâm khi tham
									gia thu cũ đổi mới tại Bạch Long Mobile.
								</strong>
							</p>
							<p className='FooterOldAutumn-supportText'>4. Tiện Ích Kèm Theo – Ưu Đãi Không Thể Bỏ Lỡ</p>
							<p className='FooterOldAutumn-description'>
								Chương trình Thu Cũ Đổi Mới tại Bạch Long Mobile không chỉ dừng lại ở việc nâng cấp
								thiết bị mà còn đi kèm với hàng loạt tiện ích và ưu đãi hấp dẫn.
							</p>
							<ul style={{ listStyleType: 'circle', lineHeight: '1.5', padding: '0 20px' }}>
								<li>
									<strong className='FooterOldAutumn-description-strong'>Giảm 300.000đ</strong>

									<span> khi thanh toán 100% bằng hình thức chuyển khoản.</span>
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>
										Giao hàng siêu tốc trong 1 giờ
									</strong>

									<span>
										, tặng nón bảo hiểm cao cấp phiên bản đặc biệt mừng kỷ niệm 18 năm của Bạch Long
										Mobile.
									</span>
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>Giảm thêm 1.000.000đ</strong>
									<span> khi mua gói </span>
									<strong className='FooterOldAutumn-description-strong'>Bảo Hành Toàn Diện</strong>

									<span> – lỗi đổi ngay trong tích tắc.</span>
								</li>
							</ul>
							<p className='FooterOldAutumn-supportText'>5. Cơ Hội Trải Nghiệm Nhiều Dịch Vụ Đi Kèm</p>
							<p className='FooterOldAutumn-description'>
								Không chỉ giúp bạn nâng cấp thiết bị, Bạch Long Mobile còn mang đến các dịch vụ đi kèm
								với mức giá ưu đãi, nhằm giúp khách hàng có trải nghiệm tốt nhất.
							</p>
							<ul style={{ listStyleType: 'circle', lineHeight: '1.5', padding: '0 20px' }}>
								<li>
									<strong className='FooterOldAutumn-description-strong'>
										Dán cường lực, ốp lưng, phụ kiện chính hãng
									</strong>
									<span> với giá ưu đãi.</span>
								</li>
								<li>
									<strong className='FooterOldAutumn-description-strong'>Giảm giá sâu</strong>
									<span>cho các dịch vụ đi kèm như bảo vệ màn hình, phụ kiện, hay nâng cấp máy.</span>
								</li>
							</ul>
							<p className='FooterOldAutumn-description'>
								Hãy tận dụng các dịch vụ tiện ích kèm theo để bảo vệ và tối ưu hóa thiết bị của bạn một
								cách tốt nhất.
							</p>
							<p className='FooterOldAutumn-supportText'>6. Lưu Ý</p>
							<p className='FooterOldAutumn-description'>
								Để tham gia chương trình một cách suôn sẻ, hãy nắm rõ các điều kiện và lưu ý dưới đây:
							</p>
							<ul style={{ listStyleType: 'circle', lineHeight: '1.5', padding: '0 20px' }}>
								<li>
									<span>Chương trình áp dụng từ </span>
									<strong className='FooterOldAutumn-description-strong'>15/09 đến 31/10/2024</strong>
									<span>.</span>
								</li>
								<li>
									<span>Trợ giá chỉ áp dụng cho các sản phẩm có giá trị thu từ</span>
									<strong className='FooterOldAutumn-description-strong'> 5 triệu</strong>
									<span> đồng trở lên.</span>
								</li>
								<li>
									<span>
										Điều kiện và quy định có thể thay đổi tùy từng thời điểm. Để biết thêm thông tin
										chi tiết, vui lòng liên hệ{' '}
									</span>
									<strong className='FooterOldAutumn-description-strong'>CSKH: 1900.63.64.69</strong>
									<span>.</span>
								</li>
							</ul>
							<p className='FooterOldAutumn-description'>
								Đừng bỏ lỡ cơ hội hiếm có để nâng cấp thiết bị của bạn với chương trình Thu Cũ Đổi Mới
								tại
								<strong className='FooterOldAutumn-description-strong'>Bạch Long</strong>
							</p>
						</div>

						<button className='FooterOldAutumn-readMoreButton' onClick={toggleDescription}>
							{isExpanded ? 'Thu gọn' : 'Xem thêm'} {/* Change button text based on state */}
						</button>
					</div>

					<div className='FooterOldAutumn-extraSection'>
						<div className='FooterOldAutumn-extraSection-videoSection'>
							<iframe
								className='FooterOldAutumn-extraSection-videoSection-item'
								src='https://www.youtube.com/embed/eoLHZmo5XrA'
								title='HƯỚNG DẪN QUY TRÌNH THU CŨ ĐỔI MỚI TẠI BẠCH LONG MOBILE'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							></iframe>
						</div>
						<div className='FooterOldAutumn-contactSection'>
							<p className='FooterOldAutumn-contactSection-card'>
								<span>
									<Image
										className='FooterOldAutumn-contactSection-card-images'
										src={imagePhone}
										alt=''
									/>
								</span>
								<span>Liên hệ tư vấn:</span>{' '}
								<span className='FooterOldAutumn-hotline'>1900.63.64.69</span>
							</p>
							<ul
								style={{
									marginTop: '10px',
									lineHeight: '1.5',
									padding: '10px 30px',
									backgroundColor: '#ecfdf5',
									border: '1px solid #10b981',
									borderRadius: '10px',
								}}
							>
								<li>Gọi qua hotline</li>
								<li>Chat với nhân viên tư vấn.</li>
								<li>
									Để lại bình luận bên dưới trang hoặc tại
									<br className='FooterOldAutumn-hotline-br' /> trang sản phẩm muốn thu cũ lên đời.
								</li>
							</ul>
						</div>
					</div>
				</footer>
			</div>
			<ModalForm visible={isModalVisible} onCancel={handleModalCancel} />
		</div>
	);
};

export default FooterOldAutumn;
