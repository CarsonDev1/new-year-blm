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
      eq: 'sp-iphone-99',
    },
  },
  pageSize: 99,
  currentPage: 1,
}

async function fetchProductSaleDataIPHONE99() {
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

export const useProductSaleDataIPHONE99 = () => {
  return useQuery({
    queryKey: ['fetchProductSaleDataIPHONE99'],
    queryFn: fetchProductSaleDataIPHONE99,
    staleTime: 5000,
  })
}
