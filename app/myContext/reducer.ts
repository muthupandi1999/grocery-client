import {
  updateProductObj,
  updateProductQuantity,
  updateProductsArr,
} from "../helperFunctions";
import { IAction } from "../myContext";

export default function Reducer(state: any, action: IAction) {
  switch (action.type) {
    case "AUTH_TOKEN": {
      return {
        ...state,
        authStatus: action.payload,
      };
    }
    case "ADD_CART_ITEM":
      const selectedItem = state?.cartItems?.some(
        (item: { id: string }) =>
          item?.selectedvariant?.id === action?.payload?.selectedvariant?.id
      );
      if (selectedItem) {
        return {
          ...state,
          cartItems: state?.cartItems?.map((value: { id: string }) =>
            value?.selectedvariant?.id === action?.payload?.selectedvariant?.id
              ? { ...value, quantity: action?.payload?.quantity }
              : value
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state?.cartItems, action?.payload],
        };
      }
      case "EMPTY_CART":{
        return{
          ...state,cartItems:[]
        }
      }
    //products for slider
    case "ADD_CATEGORY_PRODUCTS":
      const checkObjectExist = state?.categoryProducts?.some(
        (data: { id: string }) => data?.id === action?.payload?.id
      );

      if (checkObjectExist) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          categoryProducts: [...state.categoryProducts, action.payload],
        };
      }

    case "UPDATE_CATEGORY_PRODUCTS":
      return {
        ...state,
        categoryProducts: state.categoryProducts.map(
          (category: { products: [] }) => {
            return {
              ...category,
              products: updateProductsArr(category.products, state.cartItems),
            };
          }
        ),
      };
    //products by categoryId

    case "GET_PRODUCTS_BY_CATEGORYID":
      return {
        ...state,
        productsByCategoryId: action.payload,
      };

    case "UPDATE_PRODUCTS_BY_CATEGORYID":
      return {
        ...state,
        productsByCategoryId: {
          ...state.productsByCategoryId,
          products: updateProductsArr(
            state.productsByCategoryId?.products,
            state.cartItems
          ),
        },
      };
    //products by subCategoryId

    case "GET_ALL_SUBCATEGORY_PRODUCTS":
      return {
        ...state,
        subCategoryProducts: action.payload,
      };
    case "UPDATE_SUB_CATEGORY_PRODUCTS":
      return {
        ...state,
        subCategoryProducts: {
          ...state.subCategoryProducts,
          products: updateProductsArr(
            state.subCategoryProducts?.products,
            state.cartItems
          ),
        },
      };
    //products for search page
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
      };
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        allProducts: updateProductsArr(state.allProducts, state.cartItems),
      };
    //for product page
    case "GET_Individual_product": {
      return {
        ...state,
        productById: action.payload,
      };
    }
    case "UPDATE_INDIVIDUAL_PRODUCT": {
      return {
        ...state,
        productById: updateProductObj(state.productById, state.cartItems),
      };
    }
    case "UPDATE_DELEVERY_DETAILS": {
      return {
        ...state,
        deliverDetails: action.payload,
      };
    }
    case "GET_CLENT_SECRET":{
      return {
        ...state,
        clientSecret: action.payload,
      };
    }
    case "ADD_ORDER_ADDRESS":{
      return {
        ...state,orderAddress:action.payload
      }
    }
    default:
      return state;
  }
}
