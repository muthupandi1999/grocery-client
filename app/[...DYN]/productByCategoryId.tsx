"use client";

import {
  CategoryContentContainer,
  CategoryGridContainer,
  SCTitle,
} from "@/app/assets/style";
import ProductCard from "../components/cards/ProductCard";
import React, { useContext, useEffect } from "react";
import CategoryContentLoader from "../Loading UI/categoryContentLoader";
import { useQuery } from "@apollo/client";
import { getProductsByCategoryId } from "@/app/service/query";
import {
  setProductsByCategoryId,
  setUpdateProductsByCategoryId,
} from "@/app/myContext/action";
import { MyContext } from "@/app/myContext";
import Noproducts from "@/app/search/Noproducts";

function ProductByCategoryId({categoryId}:{categoryId:string}) {
  const { dispatch, cartItems, productsByCategoryId } = useContext(MyContext);
  const { loading } = useQuery(getProductsByCategoryId, {
    variables: { getCategoryWithProductTypesId: categoryId },
    onCompleted: (data) => {
      setProductsByCategoryId(dispatch, data?.getCategoryWithProductTypes);
      console.log("databyCatId", productsByCategoryId, data);
    },
    onError: (error) => {
      console.log("databyCatIderror", error);
      setProductsByCategoryId(dispatch, {});
    },
  });
  useEffect(() => {
    setUpdateProductsByCategoryId(dispatch);
  }, [cartItems]);
 
  
  return (
    <>
      {!loading ? (
        productsByCategoryId?.name ? (
          <CategoryContentContainer>
            <div className="content-header">
              <SCTitle $variant="H16700">
                {" "}
                {productsByCategoryId?.name}{" "}
              </SCTitle>
            </div>

            {productsByCategoryId.products &&
            productsByCategoryId?.products?.length > 0 ? (
              <CategoryGridContainer $showBackground={true}>
                {productsByCategoryId?.products?.map((data: any) => (
                  <ProductCard
                    key={data?.id}
                    data={data}
                    slider={false}
                    parent={undefined}
                  />
                ))}
              </CategoryGridContainer>
            ) : (
             <Noproducts/>
            )}
          </CategoryContentContainer>
        ) : (
          <Noproducts/>
        )
      ) : (
        <CategoryContentLoader />
      )}
    </>
  );
}

export default ProductByCategoryId;
