export const useFilteredProductPrice = (productSale: any[] | undefined, targetNames: string[]) => {
	if (!productSale || !Array.isArray(productSale)) {
		return [];
	}

	const filteredPrices = targetNames.map((targetName) => {
		const foundProduct = productSale.find(
			(product: { product: { name: string } }) => product.product.name === targetName
		);
		return foundProduct ? foundProduct.sale_price : null;
	});

	return filteredPrices;
};
