import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {

  filterProducts,
  getAllBanners,
  getAllCategoriesWithProductTypes,
  getCartProducts,
  getProductTypesByCategoryId,
  getProductsByCategoryId,
  getProductsByProductTypeId,

} from "../query";
import { USER_ID } from "@/app/utils/variables";
import { addToCart, getLoginOtp, updateCart } from "../mutation";

export const getBanner = () => {
  const { data: allBanners, loading: bannerLoader } = useQuery(getAllBanners);
  return {
    allBanners,
    bannerLoader,
  };
};
export const getAllCategoryWithTypes = () => {
  const { data: allCategories, loading: allCategoryLoader } = useQuery(
    getAllCategoriesWithProductTypes
  );
  return {
    allCategories,
    allCategoryLoader,
  };
};

export const getProductsByProductTypesId = (id: string) => {
  const { data, loading: getProductsLoader } = useQuery(
    getProductsByProductTypeId,
    {
      variables: {
        getProductTypeId: id,
      },
    }
  );
  return {
    data,
    getProductsLoader,
  };
};

export const fetchProductsByCategoryId = () => {
  const [
    runQuery,
    { data, loading: getProductsLoader, refetch: categorySliderRefetch },
  ] = useLazyQuery(getProductsByCategoryId);
  return {
    data,
    getProductsLoader,
    categorySliderRefetch,
    runQuery,
  };
};
export const fetchProductTypesByCategoryId = (id: string) => {
  const { data: sideBarList, loading: sideBarLoader } = useQuery(
    getProductTypesByCategoryId,
    {
      variables: {
        getCategoryId: id,
      },
    }
  );
  return { sideBarList, sideBarLoader };
};

export const addProducts = () => {
  const [addItems, { loading: addLoader }] = useMutation(addToCart);
  return {
    addItems,
    addLoader,
  };
};
export const updateProducts = () => {
  const [updateItems, { loading: deleteLoader }] = useMutation(updateCart);
  return {
    updateItems,
    deleteLoader,
  };
};

export const searchProducts = (searchTerm: string) => {
  const {
    data: searchedResults,
    loading: searchLoader,
    refetch: searchRefetch,
  } = useQuery(filterProducts, {
    variables: {
      filter: searchTerm,
    },
  });
  return {
    searchedResults,
    searchLoader,
    searchRefetch,
  };
};

export const fetchCartItems = (params) => {
  const {
    data: cartProducts,
    refetch: cartRefetch,
    loading: cartLoader,
  } = useQuery(getCartProducts, {
    variables: {
      userId:params?.userId,
      index:params?.index,
      limit:params?.limit,
    },
  });
  return {
    cartProducts,
    cartRefetch,
    cartLoader,
  };
};

