import React, { useContext, useEffect, useState } from "react";
import ProductSliderByCategoryId from "../productSlider";
import { globalContext } from "@/app/utils/states";
import ProductCardLoader from "@/app/Loading UI/productCardLoader";
import {
  FlexBox,
  TitleTag,
  SeeAllText,
  LoaderFlexContainer,
  SCTitle,
  SCLINK,
} from "@/app/assets/style";
import { HomeProductSliderSettings } from "@/app/utils/data";
import { Container } from "@mui/material";

import ProductCard from "../cards/ProductCard";
import CategoryProductSlider from "./CategoryProductSlider";
import { useRouter } from "next/navigation";
import { setCartItems } from "@/app/myContext/action";
import { MyContext } from "@/app/myContext";

function HomeProductSliders({ data }) {
  const router = useRouter();
  return (
    <div>
      <FlexBox $disable={null} $variant="PADbetween">
        <SCTitle $variant="H24B700">{data?.name}</SCTitle>

        <SCLINK
          $variant="A20GR600"
          href={`/category-id/${data?.id}`}
        >
          see all
        </SCLINK>
      </FlexBox>

      <CategoryProductSlider settings={HomeProductSliderSettings}>
        {data?.products &&
          data?.products?.map((product) => {
            return (
              <ProductCard
                parent={data}
                key={product?.id}
                data={product}
                slider={true}
          
              />
            );
          })}
      </CategoryProductSlider>
    </div>
  );
}

export default HomeProductSliders;
