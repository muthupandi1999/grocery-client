import { useQuery} from "@apollo/client";
import {
  GetCategoryProducts,
  GetAddToCarts,
  GetProductTypeProducts,
  getProductVariant,
} from "../query";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export const FetchCategoryWithProducts = (id: string) => {
  const {
    data: CategoryProductsSlider,
    refetch: CategoryProductsRefetch,
    loading:CategoryProductLoading
    
  } = useQuery(GetCategoryProducts, {
    variables: {
      getCategoryWithProductTypesId: id,
      sliceCount: 15,

    },
    // pollInterval:500
  });
  return {
    CategoryProductsSlider,
    CategoryProductsRefetch,
    CategoryProductLoading
    
  };
};

// export const fetchCategoryWithProducts = () => {
//   const[ loadGreeting, {
//     data: CategoryProductsSlider,
//     refetch: CategoryProductsRefetch,
//     loading: CategoryProductsLoading,
//   }] = useLazyQuery(GetCategoryProducts);
//   return {
//     loadGreeting,
//     CategoryProductsSlider,
//     CategoryProductsRefetch,
//     CategoryProductsLoading,
//   };
// };

// export const GetAddToCartsApi = (userId: string) => {
//   const { data: GetAddToCartData, refetch: AddToCartsRefetch, loading:AddTOCartLoading } = useQuery(
//     getCartProducts,
//     {
//       variables: {
//         userId: userId,
//       },
//     }
//   );

//     return { GetAddToCartData, AddToCartsRefetch, AddTOCartLoading };

// };

export const FetchCartItems =  (userId: string) => {
  const { data: cartProducts, refetch: getUserCartRefetch, loading:cartLoading } = useQuery(
    GetAddToCarts,
    {
      variables: {
        userId: userId,
      },
    }
  );

   return {
    cartProducts,
    getUserCartRefetch,
    cartLoading
  };
};

export const ProductTypeProductsByCategoryId = (
  subListId: any,
  selectedSortOption: any
) => {
  const {
    data: categoryTypeAndProductsList,
   loading:categoryProductLoading,
    refetch: refetchProducts,
  } = useQuery(GetProductTypeProducts, {
    variables: {
      getProductTypeId: subListId,
      filter: selectedSortOption,
    },
    skip: !selectedSortOption, // Skip initial query if selectedSortOption is not set
  });

  return { categoryTypeAndProductsList, refetchProducts, categoryProductLoading };
};

export const GetVariant = (variantId: string) => {
  const { data: GetVariantInfo } = useQuery(getProductVariant, {
    variables: {
      getProductVariantId: variantId,
    },
  });

  return {GetVariantInfo};
};
