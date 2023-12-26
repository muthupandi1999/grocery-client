import React, { useMemo, useReducer } from "react";
import Reducer from "./reducer";

export interface IAction {
  type: string;
  payload: any;
}

export interface ICartItem {
  id: string;
  quantity: number;
  categoryId: string;
  name: string;
  image: string;
  selectedvariant: {};
  addToCartId: string;
}
export interface SubCategoryProducts {
  name: string;
}
export interface products {
  name: string;
  products: [];
}
export interface IProductsById {
  category:{id:string;name:string}
  subCategory:{id:string}
  product: {
    id:string;
    discount:number;
    name:string;
    variant:IVariant[];
    image: string;
    imageList: string[];
  };
};
export interface IVariant{
  
  variant:{id:string}[]
  id: string;
  AddToCart:{quantity:number}[];values:string;unit:string;price:number;
  selectedvariant:{id:string}
  quantity:number;
}
export interface ICategoryProducts{

}
interface IInitialState {
  authStatus: boolean;
  productById: IProductsById;
  cartItems: ICartItem[];
  categoryProducts: ICategoryProducts;
  allProducts: any[];
  subCategoryProducts: products;
  productsByCategoryId: products;
  deliverDetails: {};
  clientSecret: string;
  orderAddress: {
    address: string;
    apartment: string;
    label: string;
    pincode: null;
  };
  dispatch: IDispatch;
}

const initialState = ({
  authStatus: false,
  productById: {},
  cartItems: [],
  categoryProducts: [],
  allProducts: [],
  subCategoryProducts: {},
  productsByCategoryId: {},
  deliverDetails: null,
  clientSecret: null,
  orderAddress: {
    address: "",
    apartment: "",
    label: "",
    pincode: null,
  },
  dispatch: () => null,
} as unknown) as IInitialState;

export type IDispatch = React.Dispatch<IAction>;

export const MyContext = React.createContext(initialState);

export const MyContextProvider = ({
  children,
}: React.PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
