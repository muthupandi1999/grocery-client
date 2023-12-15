import React, { useEffect, useState, Suspense } from "react";
import { Container, FlexBox, SliderHeader } from "../assets/style/commonStyles";
import ProductCard from "./cards/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeProductSliderSettings } from "../utils/data";
import { useRouter } from "next/navigation";
import CategoryProductSlider from "./sliders/CategoryProductSlider";
import { AddToCartRed, updateSubs } from "../service/query";
import { SeeAllText, TitleTag } from "../assets/style";
import { useSubscription } from "@apollo/client";
import { FetchCategoryWithProducts } from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  addProductData,
  updateProductData,
  updateProductData2,
} from "../redux/slices/AllProductSlice";
import ProductCardLoader from "./loader/productCardLoader";

function TodayLowPriceProducts({ id }: { id: string }) {
  const {
    CategoryProductsSlider,
    CategoryProductLoading,
    CategoryProductsRefetch,
  } = FetchCategoryWithProducts(id) as any;
  const dispatch = useDispatch();

  const [categoryProductData, setCategoryProductData] = useState([]) as any;
  let cart = useSelector((state: any) => state.cartData);
  const allProducts = useSelector((state: any) => state.AllProducts);
  console.log("AllProductssss", allProducts);
  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);

  useEffect(() => {
    CategoryProductsRefetch();
    // setCategoryProductData(CategoryProductsSlider?.getCategoryWithProductTypes);
  }, [CategoryProductsSlider]);

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
      console.log("ADdddddddddddddddddddddddddddd")
      dispatch(
        addProductData({
          addProduct: addSubscriptionData.addCart,
          variantId: addSubscriptionData?.selectedVariantId,
        })
      );
    }
  }, [addSubscriptionData]);

  const router = useRouter();

  if (CategoryProductLoading) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      {CategoryProductsSlider?.getCategoryWithProductTypes?.products ? (
        (console.log("totalCarts", cart),
        (
          <>
            <SliderHeader>
              <TitleTag variant="productTitle">
                {CategoryProductsSlider?.getCategoryWithProductTypes?.name}
              </TitleTag>

              <SeeAllText
                onClick={() =>
                  router.push(
                    `/category/everyday-low-prices/by-category-id/${CategoryProductsSlider?.getCategoryWithProductTypes?.id}`
                  )
                }
              >
                See all
                <ArrowRightAltIcon sx={{fontSize:"22px", position:"relative", top:"4px"}} />
              </SeeAllText>
            </SliderHeader>
            {CategoryProductLoading ? (
              <div style={{display:"flex", gap:"5px"}}>
                {[...Array(7)].map((_: any, index: number) => (
                  <ProductCardLoader />
                ))}
              </div>
            ) : (
              <CategoryProductSlider settings={HomeProductSliderSettings}>
                {CategoryProductsSlider?.getCategoryWithProductTypes?.products
                  ?.slice(0, 15)
                  .map((product: any) => (
                    <ProductCard
                      key={product.id}
                      data={product}
                      slider={true}
                      categoryId={""}
                    />
                  ))}
              </CategoryProductSlider>
            )}
          </>
        ))
      ) : (
        <h4>loading</h4>
      )}
    </Container>
  );
}

export default TodayLowPriceProducts;
