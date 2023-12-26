import { Url } from "next/dist/shared/lib/router/router";
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";
import { Interpolation } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      greyTertiary: string;
      greyPrimary: string;
      greyprimary: string;
      greenSecondary: string;
      greenPrimary: string;
      primary: string;
      secondary: string;
      black: string;
      white: string;
      txtPrimary: string;
      txtSecondary: string;
      txtTertiary: string;
    };
    shadow: {
      primary: string;
      secondary: string;
    };
    border: {
      black: string;
      white: string;
      primary: string;
    };
    background: {
      lightGreen: string;
      greenPrimary: string;
      greyPrimary: string;
    };
    gradient: {
      primary: string;
    };
  }
}
export type DYNIProps = {
  params: {
    DYN: string[];
  };
};
export interface IImgTag {
  $imgfit: "contain" | "cover";
}
export interface IButton {
  $icon?: "left" | "right";
}
export interface sidebarListContainer {
  $routeId: boolean;
}
export interface dropdownListItem {
  $id: boolean;
  $colorState: boolean;
}
export interface GlobalContext {
  categoryListArr?: never[];
  setCategoryListArr?: React.Dispatch<React.SetStateAction<never[]>>;
  allCategoryProducts?: never[];
  setAllCategoryProducts?: React.Dispatch<React.SetStateAction<never[]>>;
  defaultRoutes?: string;
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export interface ChildrenProps {
  children: ReactNode;
}
export interface AllCategory {
  length(sliceCount: number, length: any): unknown;
  slice(sliceCount: number, length: any): unknown;
  map(arg0: (data: any) => import("react").JSX.Element): ReactNode;
  id?: string;
  name?: string;
  image?: string;
  defaultRoute: string;
}
export interface GetAllProductsProps {
  id?: string;
  name?: string;
  products?: [{ id: string }];
}
export interface CategoryGridContainerProps {
  $showBackground?: boolean;
}
export interface SliderImageContainerProps {
  $imageUrl: URL;
  $url: URL;
}
export interface VariantProps {
  $variant: string;
}
export interface CustomAddButtonProps {
  $count: number;
  $disable: boolean;
  $variant?: string;
  hideBackground?: boolean;
}
export interface CardContainerProps {
  $slider: boolean;
  $offerState?: boolean;
  $available?: boolean;
  $variant: string;

}
export interface BannerArrProps {
  id: string;
  image: string;
  description: string;
}
export interface ProductCardButtonProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  updateCartVariables: {
    productId: string;
    quantity: number;
    userId: string;
    variantId: string;
  };
}

//products
export interface IImageSliderProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: URL | string;
  imagesArr: URL[] | string[];
}
//productTypes
export interface ICategory {
  id: string;
  name: string;
  image: string;
  isActive: boolean;
  defaultRoute: string;
  productTypes: {
    id: string;
    name: string;
    defaultRoute: string;
  }[];
}

export interface StyleLink {
  variant?: string;
}