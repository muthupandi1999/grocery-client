import { useLazyQuery ,useQuery} from "@apollo/client";
import {
  GetCategoryProducts,
  GetAddToCarts,
  GetProductTypeProducts,
  getProductVariant,
} from "../query";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export const fetchCategoryWithProducts = (id: string) => {
  const {
    data: CategoryProductsSlider,
    refetch: CategoryProductsRefetch,
    
  } = useSuspenseQuery(GetCategoryProducts, {
    variables: {
      getCategoryWithProductTypesId: id,
    },
  });
  return {
    CategoryProductsSlider,
    CategoryProductsRefetch,
    
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

export const fetchCartItems =  (userId: string) => {
  const { data: cartProducts, refetch: getUserCartRefetch } = useQuery(
    GetAddToCarts,
    {
      variables: {
        userId: userId,
      },
    }
  );

  console.log("Cartsssssrttttt", cartProducts)
   return {
    cartProducts,
    getUserCartRefetch,
  };
};

export const productTypeProductsByCategoryId = (
  subListId: any,
  selectedSortOption: any
) => {
  const {
    data: categoryTypeAndProductsList,
    loading: productTypeLoading,
    refetch: refetchProducts,
  } = useQuery(GetProductTypeProducts, {
    variables: {
      getProductTypeId: subListId,
      filter: selectedSortOption,
    },
    skip: !selectedSortOption, // Skip initial query if selectedSortOption is not set
  });

  return { categoryTypeAndProductsList, refetchProducts, productTypeLoading };
};

export const getVariant = (variantId: string) => {
  const { data: GetVariantInfo } = useQuery(getProductVariant, {
    variables: {
      getProductVariantId: variantId,
    },
  });

  return {GetVariantInfo};
};
