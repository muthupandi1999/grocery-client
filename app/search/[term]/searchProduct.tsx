"use client";
import React, { useEffect, useState } from "react";
import {
  AddToCartRed,
  AllProductsWithSearch,
  updateSubs,
} from "@/app/service/query";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "@/app/components/cards/ProductCard";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useLazyQuery, useSubscription } from "@apollo/client";
import PageLoader from "@/app/components/loader/pageLoader";
import { useDispatch } from "react-redux";
import {
  addProductData,
  updateProductData2,
} from "@/app/redux/slices/AllProductSlice";
import { NofoundText } from "@/app/assets/style";
import ProductCardLoader from "@/app/components/loader/productCardLoader";

function SearchProduct({ params }: { params: any }) {
  const [products, setProducts] = useState<any>([]);
  const dispatch = useDispatch();

  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);

  useEffect(() => {
    if (updateSubscriptionData !== undefined) {
      console.log("updateSubscriptionData", updateSubscriptionData);
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

  const [loadGreeting, { loading: SearchProductLoading }] = useLazyQuery(
    AllProductsWithSearch,
    {
      variables: {
        filter: params?.term,
      },
    }
  );

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await loadGreeting();
      setProducts(data?.getAllProducts);
    };
    getAllProducts();
  }, [loadGreeting]);

  // if (SearchProductLoading) return <PageLoader />;

  return (
    <div>
      {products ? (
        <CategoryContentContainer>
          <div className="content-header">
            <h1> Search results for {params?.term} </h1>
          </div>

          <CategoryGridContainer>
            {SearchProductLoading ? (
              <>
                {[...Array(products?.length)].map((_: any, index: number) => (
                  <ProductCardLoader key={index} />
                ))}
              </>
            ) : (
              products?.map((data: any) => (
                <ProductCard
                  width="100%"
                  key={data.id}
                  data={data}
                  categoryId={""}
                />
              ))
            )}
          </CategoryGridContainer>
        </CategoryContentContainer>
      ) : (
        <NofoundText> No data found</NofoundText>
      )}
    </div>
  );
}

export default SearchProduct;
