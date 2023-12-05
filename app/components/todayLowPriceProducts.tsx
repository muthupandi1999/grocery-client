import React, { useEffect, useState, Suspense } from "react";
import { Container, FlexBox } from "../assets/style/commonStyles";
import ProductCard from "./cards/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeProductSliderSettings } from "../utils/data";
import { useRouter } from "next/navigation";
import CategoryProductSlider from "./sliders/CategoryProductSlider";
import { AddToCartRed, updateSubs } from "../service/query";
import { SeeAllText, TitleTag } from "../assets/style";
import { useSubscription } from "@apollo/client";
import { fetchCategoryWithProducts } from "../service/api";
import { useDispatch, useSelector } from "react-redux";

import {
  addProductData,
  updateProductData,
  updateProductData2,
} from "../redux/slices/AllProductSlice";

function TodayLowPriceProducts({ id }: { id: string }) {
  const { CategoryProductsSlider, CategoryProductLoading } =
    fetchCategoryWithProducts(id) as any;
  const dispatch = useDispatch();

  const [categoryProductData, setCategoryProductData] = useState([]) as any;
  let cart = useSelector((state: any) => state.cartData);
  const allProducts = useSelector((state: any) => state.AllProducts);
  console.log("AllProductssss", allProducts);
  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);

  useEffect(() => {
    setCategoryProductData(CategoryProductsSlider?.getCategoryWithProductTypes);
  }, [CategoryProductsSlider]);

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

  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Container>
        {categoryProductData?.products ? (
          (console.log("totalCarts", cart),
          (
            <>
              <FlexBox>
                <TitleTag variant="productTitle">
                  {categoryProductData?.name}
                </TitleTag>

                <SeeAllText
                  onClick={() =>
                    router.push(
                      `/category/everyday-low-prices/by-category-id/${categoryProductData?.id}`
                    )
                  }
                >
                  See all
                </SeeAllText>
              </FlexBox>

              <CategoryProductSlider settings={HomeProductSliderSettings}>
                {categoryProductData?.products
                  ?.slice(0, 15)
                  .map((product: any) => (
                    <ProductCard
                      key={product.id}
                      data={product}
                      slider={true} categoryId={""}                    />
                  ))}
              </CategoryProductSlider>
            </>
          ))
        ) : (
          <h4>loading</h4>
        )}
      </Container>
    </Suspense>
  );
}

export default TodayLowPriceProducts;
