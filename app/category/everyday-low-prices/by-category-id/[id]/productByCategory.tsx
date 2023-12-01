"use client";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "../../../../components/cards/ProductCard";
import React, { useEffect, useState, Suspense } from "react";
import PageLoader from "@/app/components/loader/pageLoader";
import { fetchCategoryWithProducts } from "@/app/service/api";
import { useSubscription } from "@apollo/client";
import { updateSubs } from "@/app/service/query";

function ProductByCategory({ params }: Readonly<{ params: any }>) {
  const [categoryProducts, setCategoryProducts] = useState<any>([]);
  console.log("paramssss", params?.id);
  // const {
  //   CategoryProductsSlider,
  //   CategoryProductsRefetch,
  //   CategoryProductsLoading,
  //   loadGreeting,
  // } = fetchCategoryWithProducts();

  const { data: updateSubscriptionData } = useSubscription(updateSubs);

  const { CategoryProductsSlider, CategoryProductsRefetch } =
    fetchCategoryWithProducts(params?.id);
  useEffect(() => {
    // loadGreeting({
    //   variables: {
    //     getCategoryWithProductTypesId: id,
    //   },
    // });
    setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
    // console.log("sliderDataaaaaaaaa", sliderData);
  }, [CategoryProductsSlider]);

  // useEffect(() => {
  //   if (updateSubscriptionData) {
  //     CategoryProductsRefetch(); // Trigger the refetch upon subscription update
  //     // console.log("sliderDatasliderDatasliderData", sliderData)
  //   }
  // }, [updateSubscriptionData, CategoryProductsRefetch]);

  // useEffect(() => {
  //   loadGreeting({
  //     variables: {
  //       getCategoryWithProductTypesId: params.id,
  //     },
  //   });
  //   setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
  // }, [CategoryProductsSlider]);

  // useEffect(() => {
  //   loadGreeting({
  //     variables: {
  //       getCategoryWithProductTypesId: params.id,
  //     },
  //   });
  //   setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
  // }, []);

  // useEffect(() => {
  //   CategoryProductsRefetch(); // Refetch query when location changes
  //   setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
  // }, [location]);

  // if (CategoryProductsLoading) return <PageLoader />;
  return (
    <Suspense fallback={<div>Loading</div>}>
      {categoryProducts ? (
        <CategoryContentContainer>
          <div className="content-header">
            <h1> {categoryProducts.name} </h1>
          </div>

          <CategoryGridContainer>
            {categoryProducts?.products?.map((data: any) => (
              <ProductCard
                categoryId={params.id}
                width="100%"
                key={categoryProducts.id}
                data={data}
              />
            ))}
          </CategoryGridContainer>
        </CategoryContentContainer>
      ) : (
        <h1> No data found...</h1>
      )}
    </Suspense>
  );
}

export default ProductByCategory;
