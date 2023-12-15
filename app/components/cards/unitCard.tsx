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
 
  const dispatch = useDispatch()
  const [addToCartProduct, { data: AddToCartData }] = useMutation(AddToCart);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);
  const allProducts = useSelector((state: any) => state.AllProducts);

  useEffect(() => {
    if (addSubscriptionData != undefined) {
      console.log("addSubscriptionData541", addSubscriptionData)
      dispatch(
        addProductData({
          addProduct: addSubscriptionData.addCart,
          variantId: addSubscriptionData?.selectedVariantId,
        })
      );
      console.log("Hiiiii", allProducts)
    }
  }, [addSubscriptionData]);


  // const { AddToCartsRefetch } = GetAddToCartsApi("655379d96144626a275e8a14");
  const addToCart = async (e: any) => {
    const addToCartProductData = await addToCartProduct({
      variables: {
        input: {
          productId: product?.id,
          selectedVariantId: e?.id,
          totalPrice: e?.price,
          quantity: 1,
          userId: "655379d96144626a275e8a14",
          deviceToken: null,
        },
      },
    });

    // setVariables({
    //   productId: product?.id,
    //   selectedVariantId: e?.id,
    //   totalPrice: e?.price,
    //   quantity: 1,
    //   userId: "655379d96144626a275e8a14",
    //   deviceToken: null,
    // });

    // console.log("dataaaaaa", AddToCartData);
  };



  return (
    <UnitWrapper>
      {variants.map((e: any) => {
        // data?.variant?.[0]?.AddToCart?.quantity

        console.log("eeeeee", e)

        let variantInfo = GetVariant(e?.id);

        console.log("variantInfo", variantInfo);

        let variables = {
          productId: product?.id,
          selectedVariantId: e?.id,
          totalPrice: e?.price,
          quantity: 1,
          userId: "655379d96144626a275e8a14",
          deviceToken: null,
        }

        // let quantity = e?.AddToCart?.quantity;

        let findIndex = allProducts?.AllProducts?.findIndex(
          (e: any) =>
            e.id === variantInfo?.GetVariantInfo?.getProductVariant?.product?.id
        );

        let selectVariant = allProducts?.AllProducts?.[findIndex]?.variant;

        console.log("selectedVa", selectVariant);

        let selectVariantId = selectVariant?.filter(
          (variant: any) => variant.id === e?.id
        );

        console.log("sele", selectVariantId);

        let quantity = selectVariantId?.[0]?.AddToCart?.find((item:any) => item.isOrder === false)?.quantity ?? undefined;

        console.log("aun", quantity);

        const branchInventory = selectVariant?.[0]?.ProductInventory.find(
          (item: any) => item.branchId === branchId
        );
        console.log("banchInd", branchInventory)
        const availableStock = branchInventory?.availableStock || 0;

        return (
          <div className="UnitCardBox" key={e.id}>
            <div className="flexBox">
              <div className="unitImageBox">
                <img className="image" src={image} alt="" />
              </div>

              <p style={{ width: "20%", textAlign:"center" }}>{`${e?.values}${e?.unit}`}</p>

              <Text>${e.price}</Text>

              {availableStock === 0 && (
                <p className="outOfStockText">Out of Stock</p>
              )}

              {availableStock > 0 &&
                (console.log("variables", variables),
                (
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
                ))}
            </div>
          </div>
        );
      })}
    </UnitWrapper>
  );
}

export default UnitCard;
