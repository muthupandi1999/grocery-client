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
import { CircularProgress } from "@mui/material";
import { centerstyle } from "@/app/checkout/checkOut";

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
      {products && !SearchProductLoading ? (
        <CategoryContentContainer>
          <div className="content-header">
            <h1> Search results for {params?.term} </h1>
          </div>

          <CategoryGridContainer>
            {products.length > 0 ? (
              <>
                {products?.map((data: any) => (
                  <ProductCard
                    width="100%"
                    key={data.id}
                    data={data}
                    categoryId={""}
                  />
                ))}
              </>
            ) : (
              <h3
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "48%",
                  transform: "translate(-50%, -50%)",
                }}
                className="NodataFoundText"
              >
                No data found
              </h3>
            )}
          </CategoryGridContainer>
        </CategoryContentContainer>
      ) : (
        <CircularProgress style={{ color: "green" }} sx={centerstyle} />
      )}
    </div>
  );
}

export default SearchProduct;
