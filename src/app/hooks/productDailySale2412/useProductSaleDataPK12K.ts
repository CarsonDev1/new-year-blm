import { useQuery } from '@tanstack/react-query'

const query = `
	query getProductDailySales(
  $filter: DailySaleFilterInput
  $pageSize: Int
  $currentPage: Int
) {
  DailySales(filter: $filter, pageSize: $pageSize, currentPage: $currentPage) {
    items {
	 title
      identifier
      items {
        product {
          name
          url_key
		   image {
            url
          }
          	price_range {
             minimum_price {
   						   
                  final_price {
                  
  									value
                  }
                 
 						 }
 					 }
        }
        sale_price
        price_original
      }
    }
    page_info {
      current_page
      page_size
      total_pages
    }
    total_count
  }
}
`

const variables = {
  filter: {
    sale_type: {
      eq: 'sp-pk-12k-24-12',
    },
  },
  pageSize: 99,
  currentPage: 1,
}

async function fetchProductSaleDataPK12K() {
  const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const data = await response.json()
  return data.data.DailySales.items
}

export const useProductSaleDataPK12K = () => {
  return useQuery({
    queryKey: ['fetchProductSaleDataPK12K'],
    queryFn: fetchProductSaleDataPK12K,
    staleTime: 5000,
  })
}
