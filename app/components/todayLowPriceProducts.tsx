import React, { useEffect, useState, Suspense } from "react";
import { Container, FlexBox } from "../assets/style/commonStyles";
import ProductCard from "./cards/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeProductSliderSettings } from "../utils/data";
import { useRouter } from "next/navigation";
import CategoryProductSlider from "./sliders/CategoryProductSlider";
import { updateSubs } from "../service/query";
import { SeeAllText, TitleTag } from "../assets/style";
import { useSubscription } from "@apollo/client";
import { fetchCategoryWithProducts } from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { updateCartData } from "../redux/slices/cartSlice";

function TodayLowPriceProducts({ id }: { id: string }) {
  const [sliderData, setSliderData] = useState([]) as any;
  const { CategoryProductsSlider, CategoryProductsRefetch } =
    fetchCategoryWithProducts(id) as any;
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cartData);
  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  console.log("updaertee", updateSubscriptionData);
  useEffect(() => {
    console.log(
      "CategoryProductsSliderCategoryProductsSlider",
      CategoryProductsSlider
    );

    // setSliderData(CategoryProductsSlider?.getCategoryWithProductTypes);
    dispatch(
      updateCartData(CategoryProductsSlider?.getCategoryWithProductTypes)
    );

    console.log("cart456", cart);
    // console.log("Cartsstt", cart)
  }, []);

  useEffect(() => {
    if (updateSubscriptionData != undefined) {
      const updatedProductList = cart.products.map((product: any) => {
        if (product.id === updateSubscriptionData.updateCart.productId) {
          return {
            ...product,
            variant: [
              {
                ...product.variant[0],
                AddToCart: {
                  ...product.variant[0].AddToCart,
                  quantity: updateSubscriptionData.updateCart.quantity,
                },
              },
            ],
          };
        }
        return product;
      });

      console.log("updatedProductList", updatedProductList);

      dispatch(updateCartData({ products: updatedProductList }));
    }

    // dispatch(updateCartData({ products: updatedProductList }));
  }, [updateSubscriptionData]);

  const router = useRouter();

  console.log("listingdfataa", updateSubscriptionData);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Container>
        {cart?.products ? (
          <>
            <FlexBox>
              <TitleTag variant="productTitle">{cart?.name}</TitleTag>

              <SeeAllText
                onClick={() =>
                  router.push(
                    `/category/everyday-low-prices/by-category-id/${cart?.id}`
                  )
                }
              >
                See all
              </SeeAllText>
            </FlexBox>

            <CategoryProductSlider settings={HomeProductSliderSettings}>
              {cart?.products?.slice(0, 15).map((product: any) => (
                <ProductCard key={product.id} data={product} slider={true} />
              ))}
            </CategoryProductSlider>
          </>
        ) : (
          <h4>loading</h4>
        )}
      </Container>
    </Suspense>
  );
}

export default TodayLowPriceProducts;
