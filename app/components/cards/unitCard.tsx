import React, { useState } from "react";
import { styled } from "styled-components";
import { Text } from "@/app/components/AddToCart";
import { AddButton } from "@/app/components/buttons/Buttons";
import { useMutation, useQuery } from "@apollo/client";
import { AddToCart } from "@/app/service/query";
import { branchId } from "@/app/utils/data";
import { getAllCategories } from "@/app/service/query";
import { getVariant } from "@/app/service/api";
import { useSelector } from "react-redux";

const UnitWrapper = styled.section`
  .closeIcon {
    cursor: pointer;
    color: rgb(255, 255, 255);
    font-size: 20px;
    opacity: 0.6;
    background-color: rgb(74, 82, 104);
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .unitImageBox {
    width: 70px;
    height: 70px;
  }
  .image {
    width: 100%;
    height: 100%;
  }
  .outOfStockText {
    color: red;
    font-size: 12px;
  }
  .flexBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .UnitCardBox {
    background: #fff;
    position: relative;
    margin: 10px 0;
    padding: 0 10px;
    border-radius: 8px;
  }
`;

// function UnitCard({
//   product,
//   variants,
//   image,
//   onClose,
// }: Readonly<{
//   product: any;
//   variants: any;
//   image: string;
//   onClose: any;
// }>) {
//   const [count, setCount] = useState(0);
//   const [addToCartProduct, { data: AddToCartData, loading, error }] =
//     useMutation(AddToCart);
//   const addToCart = (e: any) => {
//     addToCartProduct({
//       variables: {
//         input: {
//           id: product?.id,
//           selectedVariantId: e?.id,
//           price: e?.price,
//           quantity: 1,
//           userId: "655379d96144626a275e8a14",
//           deviceToken: null,
//         },
//       },
//     });
//     console.log("variant");
//   };

//   {
//     variants.map((e: any) => {
//       const branchInventory = e?.ProductInventory?.find(
//         (item: any) => item.branchId === branchId
//       );
//       const availableStock = branchInventory?.availableStock || 0;

//       return (
//         <div className="UnitCardBox" key={e.id}>
//           <div className="flexBox">
//             <div className="unitImageBox">
//               <img className="image" src={image} alt="" />
//             </div>

//             <p style={{ width: "20%" }}>{`${e?.values}${e?.unit}`}</p>

//             <Text>${e.price}</Text>

//             {availableStock === 0 && (
//               <p className="outOfStockText">Out of Stock</p>
//             )}

//             {availableStock > 0 && (
//               <div>
//                 <p>Available: {availableStock}</p>
//                 <AddButton
//                   onClick={() => addToCart(e)}
//                   quantity={undefined}
//                   variables={undefined}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     });
//   }
// }

// export default UnitCard;
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

  let variables:any;
  const [addToCartProduct, { data: AddToCartData }] = useMutation(AddToCart);
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

    variables = {
      productId: product?.id,
      selectedVariantId: e?.id,
      totalPrice: e?.price,
      quantity: 1,
      userId: "655379d96144626a275e8a14",
      deviceToken: null,
    };

    // console.log("dataaaaaa", AddToCartData);
  };

  const allProducts = useSelector((state: any) => state.AllProducts);

  return (
    <UnitWrapper>
      {variants.map((e: any) => {
        // data?.variant?.[0]?.AddToCart?.quantity

        let variantInfo = getVariant(e?.id);

        console.log("variantInfo", variantInfo);

        // let quantity = e?.AddToCart?.quantity;

        let findIndex = allProducts?.AllProducts?.findIndex(
          (e: any) =>
            e.id === variantInfo?.GetVariantInfo?.getProductVariant?.product?.id
        );

        let selectVariant = allProducts?.AllProducts?.[findIndex]?.variant;

        console.log("selectedVa",selectVariant);
        

        let selectVariantId = selectVariant?.filter(
          (variant: any) => variant.id === e?.id
        );

        console.log("sele", selectVariantId);
        

        let quantity = selectVariantId?.[0]?.AddToCart?.quantity;

        console.log("aun", quantity);
        

        const branchInventory = e?.ProductInventory?.find(
          (item: any) => item.branchId === branchId
        );
        const availableStock = branchInventory?.availableStock || 0;

        return (
          <div className="UnitCardBox" key={e.id}>
            <div className="flexBox">
              <div className="unitImageBox">
                <img className="image" src={image} alt="" />
              </div>

              <p style={{ width: "20%" }}>{`${e?.values}${e?.unit}`}</p>

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
