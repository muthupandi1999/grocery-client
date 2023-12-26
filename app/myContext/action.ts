import { ICartItem, IDispatch } from "../myContext";

export const setCartItems = (dispatch: IDispatch, cartItems: ICartItem) =>
  dispatch({ type: "ADD_CART_ITEM", payload: cartItems });

export const setCategoryProducts = (dispatch: IDispatch, categoryObj: any) =>
  dispatch({ type: "ADD_CATEGORY_PRODUCTS", payload: categoryObj });

export const setUpdateCategoryProducts = (dispatch: any) =>
  dispatch({ type: "UPDATE_CATEGORY_PRODUCTS" });

export const setAllProducts = (dispatch: IDispatch, allProducts: any) => {
  dispatch({ type: "GET_ALL_PRODUCTS", payload: allProducts });
};
export const setProducts = (dispatch: any) => {
  dispatch({ type: "UPDATE_PRODUCTS" });
};
export const setSubCategoryProducts = (
  dispatch: IDispatch,
  subCategoryObj: any
) => {
  dispatch({ type: "GET_ALL_SUBCATEGORY_PRODUCTS", payload: subCategoryObj });
};
export const setUpdateSubCategoryProducts = (dispatch: any) => {
  dispatch({ type: "UPDATE_SUB_CATEGORY_PRODUCTS" });
};
export const setProductsByCategoryId = (
  dispatch: IDispatch,
  productsByCategoryId: any
) => {
  dispatch({
    type: "GET_PRODUCTS_BY_CATEGORYID",
    payload: productsByCategoryId,
  });
};
export const setUpdateProductsByCategoryId = (dispatch: any) => {
  dispatch({ type: "UPDATE_PRODUCTS_BY_CATEGORYID" });
};
export const setAuthStatus = (dispatch: IDispatch, status: boolean) => {
  dispatch({ type: "AUTH_TOKEN", payload: status });
};
export const setIndividualProduct = (
  dispatch: IDispatch,
  productDetails: {}
) => {
  dispatch({ type: "GET_Individual_product", payload: productDetails });
};
export const setUpdateIndividualProduct = (dispatch: any) => {
  dispatch({ type: "UPDATE_INDIVIDUAL_PRODUCT" });
};
export const setDeliverDetails = (dispatch: IDispatch, deliverDetails: {}) => {
  dispatch({ type: "UPDATE_DELEVERY_DETAILS", payload: deliverDetails });
};
export const setClientSecret = (dispatch: IDispatch, clientSecret: string) => {
  dispatch({ type: "GET_CLENT_SECRET", payload: clientSecret });
};
export const setOrderDetails = (dispatch: IDispatch, orderDetails: {}) => {
  dispatch({ type: "ADD_ORDER_ADDRESS", payload: orderDetails });
};
export const setCartEmpty = (dispatch: any) => {
  dispatch({ type: "EMPTY_CART" });
};
