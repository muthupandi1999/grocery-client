"use client";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "../../../../components/cards/ProductCard";
import React, { useEffect, useState } from "react";
import { FetchCategoryWithProducts } from "@/app/service/api";
import { useSubscription } from "@apollo/client";
import { AddToCartRed, updateSubs } from "@/app/service/query";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductData,
  updateProductData2,
} from "../../../../redux/slices/AllProductSlice";
import ProductCardLoader from "@/app/components/loader/productCardLoader";

function ProductByCategory({ params }: Readonly<{ params: any }>) {
  const [categoryProducts, setCategoryProducts] = useState<any>([]);
  const dispatch = useDispatch();

  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);

  useEffect(() => {
    if (updateSubscriptionData !== undefined) {
      let { productId, quantity, selectedVariantId } =
        updateSubscriptionData?.updateCart;

      dispatch(
        updateProductData2({
          productId: productId,
          quantity: quantity,
          variantId: selectedVariantId,
        })
      );
    }
  }, [updateSubscriptionData]);

  useEffect(() => {
    if (addSubscriptionData != undefined) {
      dispatch(
        addProductData({
          addProduct: addSubscriptionData.addCart,
          variantId: addSubscriptionData?.selectedVariantId,
        })
      );
    }
  }, [addSubscriptionData]);

  const {
    CategoryProductsSlider,
    CategoryProductsRefetch,
    CategoryProductLoading,
  } = FetchCategoryWithProducts(params?.id);
  useEffect(() => {
    // loadGreeting({
    //   variables: {
    //     getCategoryWithProductTypesId: id,
    //   },
    // });

    setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
  }, [CategoryProductsSlider]);

  return (
    <CategoryContentContainer>
      <div className="content-header">
        <h1> {categoryProducts?.name} </h1>
      </div>

      <CategoryGridContainer>
        {CategoryProductLoading ? (
          <>
            {[...Array(10)].map((_: any, index: number) => (
              <ProductCardLoader key={index} />
            ))}
          </>
        ) : (
          categoryProducts?.products?.map((data: any) => (
            <ProductCard
              categoryId={params?.id}
              width="100%"
              key={categoryProducts?.id}
              data={data}
            />
          ))
        )}
      </CategoryGridContainer>
    </CategoryContentContainer>
  );
}

export default ProductByCategory;
