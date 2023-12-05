"use client";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "../../../../components/cards/ProductCard";
import React, { useEffect, useState, Suspense } from "react";
import PageLoader from "@/app/components/loader/pageLoader";
import { fetchCategoryWithProducts } from "@/app/service/api";
import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import { AddToCartRed, AllProducts, updateSubs } from "@/app/service/query";
import { useDispatch, useSelector } from "react-redux";
// import { updateProductData } from "@/app/redux/slices/AllProductSlice";
import {
  addProductData,
  updateProductData,
  updateProductData2,
} from "../../../../redux/slices/AllProductSlice";
// import { AddToCartRed } from "../service/query";

function ProductByCategory({ params }: Readonly<{ params: any }>) {
  const [categoryProducts, setCategoryProducts] = useState<any>([]);
  const dispatch = useDispatch();
  const allProducts = useSelector((state: any) => state.AllProducts);

  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);

  useEffect(() => {
    if (updateSubscriptionData !== undefined) {
      let { productId, quantity } = updateSubscriptionData?.updateCart;

      dispatch(
        updateProductData2({ productId: productId, quantity: quantity })
      );
    }
  }, [updateSubscriptionData]);

  useEffect(() => {
    if (addSubscriptionData != undefined) {
      dispatch(addProductData({ addProduct: addSubscriptionData.addCart }));
    }
  }, [addSubscriptionData]);

  const { CategoryProductsSlider, CategoryProductsRefetch } =
    fetchCategoryWithProducts(params?.id);
  useEffect(() => {
    // loadGreeting({
    //   variables: {
    //     getCategoryWithProductTypesId: id,
    //   },
    // });

    setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
  }, [CategoryProductsSlider]);

  // const getAllProducts = async (dispatch: any) => {
  //   try {
  //     const { data } = await loadGreeting(); // Assuming loadGreeting fetches data
  //     if (data?.getAllProducts) {
  //       // data.getAllProducts.forEach((product: any) => {
  //       dispatch(updateProductData(data.getAllProducts)); // Dispatch each product individually
  //       // });
  //     }
  //   } catch (error) {
  //     // Handle errors if any
  //   }
  // };
  // let count = 1;

  // useEffect(() => {
  //   // setSliderData(CategoryProductsSlider?.getCategoryWithProductTypes);

  //   // getAllProducts(dispatch);
  //   // let allProducts = loadGreeting()
  //   // console.log("allProducts", AllProductsList?.getAllProducts);
  //   if (count === 1) {
  //     getAllProducts(dispatch);
  //     count = count + 1;
  //   }
  // }, []);

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
