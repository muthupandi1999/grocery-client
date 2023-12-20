import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Text } from "@/app/components/AddToCart";
import { AddButton } from "@/app/components/buttons/Buttons";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { AddToCart, AddToCartRed } from "@/app/service/query";
import { branchId } from "@/app/utils/data";
import { getAllCategories } from "@/app/service/query";
import { GetVariant } from "@/app/service/api";
import { useDispatch, useSelector } from "react-redux";
import { addProductData } from "@/app/redux/slices/AllProductSlice";
import { UnitWrapper } from "@/app/assets/style/unitCardStyle";

function UnitCard({
  product,
  variants,
  image,
}: {
  product: any;
  variants: any;
  image: string;
  onClose: any;
}) {
  const [count, setCount] = useState(0);
  // const [variables, setVariables] = useState({});

  const dispatch = useDispatch();
  const [addToCartProduct, { data: AddToCartData }] = useMutation(AddToCart);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);
  const allProducts = useSelector((state: any) => state.AllProducts);

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

  // const { AddToCartsRefetch } = GetAddToCartsApi("65642fcb264c4f37a0b129be");
  const addToCart = async (e: any) => {
    const addToCartProductData = await addToCartProduct({
      variables: {
        input: {
          productId: product?.id,
          selectedVariantId: e?.id,
          totalPrice: e?.price,
          quantity: 1,
          userId: "65642fcb264c4f37a0b129be",
          deviceToken: null,
        },
      },
    });

    // setVariables({
    //   productId: product?.id,
    //   selectedVariantId: e?.id,
    //   totalPrice: e?.price,
    //   quantity: 1,
    //   userId: "65642fcb264c4f37a0b129be",
    //   deviceToken: null,
    // });

    // console.log("dataaaaaa", AddToCartData);
  };

  return (
    <UnitWrapper>
      {variants.map((e: any) => {
        // data?.variant?.[0]?.AddToCart?.quantity

        let variantInfo = GetVariant(e?.id);

        let variables = {
          productId: product?.id,
          selectedVariantId: e?.id,
          totalPrice: e?.price,
          quantity: 1,
          userId: "65642fcb264c4f37a0b129be",
          deviceToken: null,
        };

        // let quantity = e?.AddToCart?.quantity;

        let findIndex = allProducts?.AllProducts?.findIndex(
          (e: any) =>
            e.id === variantInfo?.GetVariantInfo?.getProductVariant?.product?.id
        );

        let selectVariant = allProducts?.AllProducts?.[findIndex]?.variant;

        let selectVariantId = selectVariant?.filter(
          (variant: any) => variant.id === e?.id
        );

        let quantity =
          selectVariantId?.[0]?.AddToCart?.find(
            (item: any) => item.isOrder === false
          )?.quantity ?? undefined;

        const branchInventory = selectVariant?.[0]?.ProductInventory.find(
          (item: any) => item.branchId === branchId
        );
        const availableStock = branchInventory?.availableStock || 0;

        return (
          <div className="UnitCardBox" key={e.id}>
            <div className="flexBox">
              <div className="unitImageBox">
                <img className="image" src={image} alt="" />
              </div>

              <p
                style={{ width: "20%", textAlign: "center" }}
              >{`${e?.values}${e?.unit}`}</p>

              <Text>${e.price}</Text>

              {availableStock === 0 && (
                <p className="outOfStockText">Out of Stock</p>
              )}

              {availableStock > 0 && (
                <div>
                  {/* <p>Available: {availableStock}</p> */}
                  <AddButton
                    onClick={() => addToCart(e)}
                    variables={variables}
                    quantity={quantity}
                    disable={undefined}
                    subListId={undefined}
                    selectedSortOption={undefined}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </UnitWrapper>
  );
}

export default UnitCard;
