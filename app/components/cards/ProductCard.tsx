// import React, { useState } from "react";
// // import product from "../../assets/img/prod2.avif"
// // import DeliverTime from "./DeliverTime";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   CardContainer,
//   ListTitle,
//   OutOfStock,
//   ProductTimerCard,
// } from "@/app/assets/style";
// import { AddButton } from "@/app/components/buttons/Buttons";
// import OfferTag from "../../products/OfferTag";
// import Modal from "@mui/material/Modal";
// import { Box } from "@mui/material";
// import UnitCard from "./unitCard";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// function ProductCard({ data, slider }: { data: any; slider?: any }) {
//   const router = useRouter();
//   const [count, setCount] = useState(0);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   // onClick={()=>router.push("/products")}
//   return (
//     <CardContainer
//       style={{
//         opacity: data?.variant?.every(
//           (f: any) => f.ProductInventory?.availableStock === 0
//         )
//           ? 0.5
//           : 1,
//       }}
//       offerState={data?.dicountPercentage}
//       slider={slider}
//       // available={!data?.available}
//     >
//       <div className="img-container">
//         <div className="img-wrapper">
//           <img src={data?.image?.front} alt="" />
//         </div>
//         {/* {!data?.available && <OutOfStock>out of stock</OutOfStock>} */}
//       </div>

//       <div>
//         <ProductTimerCard variant="forCard">
//           <img
//             style={{ width: 11, height: 11 }}
//             src="https://cdn.grofers.com/assets/eta-icons/15-mins.png"
//             alt=""
//           />
//           <span>20 MINS</span>
//         </ProductTimerCard>
//       </div>
//       <div className="title">
//         <ListTitle>
//           {data?.name?.substring(0, 33)} {data?.name?.length > 33 && "..."}{" "}
//         </ListTitle>
//       </div>
//       <div className="quantity">
//         <p>{data?.quantity}</p>
//       </div>
//       {data?.variant.length === 1 && (
//         <p className="unitDiv">{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</p>
//       )}

//       {data?.variant?.every(
//         (f: any) => f.ProductInventory?.availableStock === 0
//       ) && <button className="StockOutBtn">Out Of Stock</button>}

//       {data?.variant.length > 1 && (
//         <>
//           <div onClick={handleOpen} className="productUnit">
//             <p className="unit">{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</p>
//             <ExpandMoreIcon className="unitIcon" fontSize="small" />
//           </div>
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <div className="modelBox">
//               <UnitCard
//                 image={data?.image.front}
//                 productName={data?.name}
//                 variants={data?.variant}
//                 onClose={handleClose}
//               />
//             </div>
//           </Modal>
//         </>
//       )}
//       <div className="cardFooter">
//         {data.dicountPercentage ? (
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <span className="offerPrice">
//               ₹{" "}
//               {Math.ceil(
//                 data?.variant?.[0].price -
//                   (data.dicountPercentage / 100) * data?.variant?.[0].price
//               )}
//             </span>{" "}
//             <span className="price">₹{data?.variant?.[0].price}</span>
//           </div>
//         ) : (
//           <span>₹{data?.variant?.[0].price}</span>
//         )}

//         <AddButton count={count} setCount={setCount} />
//       </div>
//       {data?.dicountPercentage && (
//         <OfferTag discount={data.dicountPercentage} />
//       )}
//     </CardContainer>
//   );
// }

// export default ProductCard;

// import React, { useState } from "react";
// // import product from "../../assets/img/prod2.avif"
// // import DeliverTime from "./DeliverTime";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   CardContainer,
//   ListTitle,
//   OutOfStock,
//   ProductTimerCard,
// } from "@/app/assets/style";
// import { AddButton } from "@/app/components/buttons/Buttons";
// import OfferTag from "../../products/OfferTag";

// function ProductCard({ data, slider }) {
//   const router =useRouter()
//   const [count, setCount] = useState(0);
//   return (
//     <CardContainer onClick={()=>router.push("/products")}
//       offerState={data?.offer}
//       slider={slider}
//       available={!data?.available}
//     >
//       <div className="img-container">
//         <div className="img-wrapper">
//           <img src={data?.productImage} alt="" />
//         </div>
//         {!data?.available && <OutOfStock>out of stock</OutOfStock>}
//       </div>

//       <div>
//         <ProductTimerCard variant="forCard">
//           <img
//             style={{ width: 11, height: 11 }}
//             src="https://cdn.grofers.com/assets/eta-icons/15-mins.png"
//             alt=""
//           />
//           <span>20 MINS</span>
//         </ProductTimerCard>
//       </div>
//       <div className="title">
//         <ListTitle>
//           {data?.productName.substring(0, 33)}{" "}
//           {data?.productName.length > 33 && "..."}{" "}
//         </ListTitle>
//       </div>
//       <div className="quantity">
//         <p>{data?.quantity}</p>
//       </div>
//       <div className="cardFooter">
//         {data.offer ? (
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <span className="offerPrice">
//               ₹ {Math.ceil(data?.price - (data.offer / 100) * data?.price)}
//             </span>{" "}
//             <span className="price">₹{data?.price}</span>
//           </div>
//         ) : (
//           <span>₹{data?.price}</span>
//         )}

//         <AddButton count={count} setCount={setCount} />
//       </div>
//       {data?.offer && <OfferTag discount={data.offer} />}
//     </CardContainer>
//   );
// }

// export default ProductCard;

import React, { useEffect } from "react";
import { CardFooder, ListTitle, ProductTimerCard } from "@/app/assets/style";
import { AddButton } from "@/app/components/buttons/Buttons";

import { FlexBox } from "@/app/assets/style/commonStyles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import UnitCard from "./unitCard";
import OfferTag from "@/app/products/OfferTag";
import {
  AddToCart,
  AllProductsWithSearch,
  GetAddToCarts,
} from "@/app/service/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { branchId } from "@/app/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { updateProductData } from "@/app/redux/slices/AllProductSlice";
import {
  CardContainer,
  CardDetails,
  FlexImage,
  ModelBoxstyle,
  ProductCumPrice,
  ProductPrice,
  UnitDiv,
} from "@/app/assets/style/productCardStyle";

function ProductCard({
  data,
  slider,
  width,
  categoryId,
  productTypeId,
  selectedSortOption,
}: Readonly<{
  data: any;
  slider?: any;
  width?: string;
  categoryId: string;
  productTypeId?: any;
  selectedSortOption?: any;
}>) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const [loadGreeting, { data: AllProductsList, loading: AllProductsLoading }] =
    useLazyQuery(AllProductsWithSearch);

  let count = 1;

  const getAllProducts = async (dispatch: any) => {
    try {
      const { data } = await loadGreeting(); // Assuming loadGreeting fetches data
      if (data?.getAllProducts) {
        // data.getAllProducts.forEach((product: any) => {
        dispatch(updateProductData(data.getAllProducts)); // Dispatch each product individually
        // });
      }
    } catch (error) {
      // Handle errors if any
    }
  };

  useEffect(() => {
    // setSliderData(CategoryProductsSlider?.getCategoryWithProductTypes);

    // getAllProducts(dispatch);
    // let allProducts = loadGreeting()
    // console.log("allProducts", AllProductsList?.getAllProducts);
    if (count === 1) {
      getAllProducts(dispatch);
      count = count + 1;
    }
  }, []);

  const allProducts = useSelector((state: any) => state.AllProducts);

  const [addToCartProduct, { data: AddToCartData, loading: addLoader, error }] =
    useMutation(AddToCart);

  // const { CategoryProductsRefetch } = fetchCategoryWithProducts(categoryId);

  // const { AddToCartsRefetch } = GetAddToCartsApi("655379d96144626a275e8a14");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let findIndex = allProducts?.AllProducts?.findIndex(
    (e: any) => e.id === data?.id
  );

  const index = allProducts?.AllProducts?.[findIndex]?.variant?.findIndex(
    (item: any) => item.AddToCart && item.AddToCart !== null
  );

  // If no such index is found, return the first index
  const resultIndex = index !== -1 ? index : 0;
  // const { CategoryListArr } = useContext(globalContext);
  const variables = {
    productId: data?.id,
    quantity: 1,
    totalPrice: data?.variant?.[resultIndex]?.price,
    userId: "655379d96144626a275e8a14",
    deviceToken: null,
    selectedVariantId: data?.variant?.[resultIndex]?.id,
  };

  console.log("Match1", allProducts);
  console.log("Match2", data?.id);

 

  console.log("quantity345", allProducts);

  

  let quantity =
    allProducts?.AllProducts?.[findIndex]?.variant?.[resultIndex].AddToCart
      ?.quantity;

  console.log("qunaitutt", quantity);

  console.log("resultIndex", resultIndex);

  // let quantity = data?.variant?.[0]?.AddToCart?.quantity;

  const addToCart = async () => {
    const addToCartData = await addToCartProduct({
      variables: {
        input: variables,
      },
      refetchQueries: [
        GetAddToCarts, // DocumentNode object parsed with gql
        "getAddToCartsByUserId", // Query name
      ],
    });

    if (addToCartData) {
      // AddToCartsRefetch();
      // CategoryProductsRefetch();
    }
  };
  return (
    <CardContainer
      width={width}
      style={{
        opacity: data?.variant?.every(
          (f: any) => f.ProductInventory?.availableStock === 0
        )
          ? 0.5
          : 1,
      }}
    >
      <FlexBox width="140px" height="140px">
        <FlexImage src={data?.image?.image}></FlexImage>
      </FlexBox>
      <CardDetails>
        <div>
          <ProductTimerCard variant="forCard">
            <img
              style={{ width: 11, height: 11 }}
              src="https://cdn.grofers.com/assets/eta-icons/15-mins.png"
              alt=""
            />
            <span>20 MINS</span>
          </ProductTimerCard>
        </div>
        <div className="title">
          <ListTitle fontSize="13px" marginBottom="6px">
            {data?.name}
          </ListTitle>
        </div>

        {data?.variant?.length === 1 && (
          <UnitDiv>{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</UnitDiv>
        )}
        {data?.variant?.every(
          (f: any) =>
            f.ProductInventory?.filter((e: any) => e.branchId === branchId)
              .availableStock === 0
        ) && <button className="StockOutBtn">Out Of Stock</button>}

        {data?.variant?.length > 1 &&
          (console.log("variant123", data?.variant),
          (
            <>
              <div onClick={handleOpen} className="productUnit">
                <p className="unit">{`${data?.variant[resultIndex]?.values}${data?.variant?.[resultIndex]?.unit}`}</p>
                <ExpandMoreIcon className="unitIcon" fontSize="small" />
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                <ModelBoxstyle>
                  <UnitCard
                    image={data?.image?.image}
                    product={data}
                    variants={data?.variant}
                    onClose={handleClose}
                  />
                </ModelBoxstyle>
              </Modal>
            </>
          ))}

        <CardFooder>
          {data?.dicountPercentage === null && (
            <ProductPrice>${data?.variant?.[resultIndex]?.price}</ProductPrice>
          )}
          {data?.dicountPercentage && (
            <div className="priceBox">
              <ProductPrice>
                $
                {Math.round(
                  data?.variant?.[resultIndex]?.price -
                    data?.variant?.[resultIndex]?.price * (data?.dicountPercentage / 100)
                )}
              </ProductPrice>
              <ProductCumPrice>${data?.variant?.[resultIndex]?.price}</ProductCumPrice>
            </div>
          )}

          <AddButton
            variables={variables}
            onClick={() => addToCart()}
            quantity={quantity}
            disable={addLoader}
            subListId={productTypeId}
            selectedSortOption={selectedSortOption}
            // refetchFun={undefined}
          />
        </CardFooder>
        {data?.dicountPercentage && (
          <OfferTag discount={data?.dicountPercentage} />
        )}
      </CardDetails>
    </CardContainer>
  );
}

export default ProductCard;
