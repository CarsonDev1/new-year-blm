import { useQuery } from '@tanstack/react-query';

const query = `
	query getProductDailySales($filter:DailySaleFilterInput $pageSize:Int $currentPage:Int){DailySales(filter:$filter,pageSize:$pageSize,currentPage:$currentPage){items{end_date start_date color_code meta_image meta_image_mobile meta_image_product list_item{name}identifier entity_id items{rating_summary_daily_sale price_original entity_id product{...ProductInterfaceField}product_id sale_price sale_qty saleable_qty sold_qty start_date image_banner_sale}priority show_in_home start_date status title}page_info{current_page page_size total_pages}total_count}}fragment ProductInterfaceField on ProductInterface{__typename sku uid name url_key categories{name url_key url_path level uid path}new_from_date new_to_date rating_summary review_count image{...ProductImageFields}price_range{...PriceRangeField}...CustomField}fragment CustomField on ProductInterface{color country_of_manufacture daily_sale{end_date entity_id sale_price sale_qty saleable_qty sold_qty start_date __typename}}fragment PriceRangeField on PriceRange{__typename maximum_price{...ProductPriceField}minimum_price{...ProductPriceField}}fragment ProductPriceField on ProductPrice{discount{amount_off percent_off}final_price{...MoneyFields}regular_price{...MoneyFields}}fragment ProductImageFields on ProductImage{url}fragment MoneyFields on Money{currency value}
`;

const variables = {
	filter: {
		sale_type: {
			eq: 'thuong-hieu',
		},
	},
	pageSize: 200,
	currentPage: 1,
};

async function fetchProductSaleData() {
	const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const data = await response.json();
	return data.data.DailySales.items;
}

export const useProductSaleData = () => {
	return useQuery({
		queryKey: ['productSale'],
		queryFn: fetchProductSaleData,
		staleTime: 300000,
	});
};
