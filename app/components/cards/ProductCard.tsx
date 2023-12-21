import React, { useEffect } from "react";
import { ProductTimerCard, Text1 } from "@/app/assets/style";
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
  FlexImage,
  ModelBoxstyle,
} from "@/app/assets/style/productCardStyle";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loadGreeting] = useLazyQuery(AllProductsWithSearch);

  let count = 1;

  const getAllProducts = async (dispatch: any) => {
    try {
      const { data } = await loadGreeting(); // Assuming loadGreeting fetches data
      if (data?.getAllProducts) {
        dispatch(updateProductData(data.getAllProducts)); // Dispatch each product individually
      }
    } catch (error) {
      // Handle errors if any
    }
  };

  useEffect(() => {
    if (count === 1) {
      getAllProducts(dispatch);
      count = count + 1;
    }
  }, []);

  const allProducts = useSelector((state: any) => state.AllProducts);

  const [addToCartProduct, { data: AddToCartData, loading: addLoader, error }] =
    useMutation(AddToCart);

  const handleOpen = (e:any) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  console.log("allProducts?.AllProducts", allProducts?.AllProducts);

  let findIndex = allProducts?.AllProducts?.findIndex(
    (e: any) => e.id === data?.id
  );

  const index = allProducts?.AllProducts?.[findIndex]?.variant?.findIndex(
    (item: any) => item?.AddToCart?.length > 0
  );

  console.log("index", index);

  // If no such index is found, return the first index
  const resultIndex = index !== -1 ? index : 0;

  const variables = {
    productId: data?.id,
    quantity: 1,
    totalPrice: data?.variant?.[resultIndex]?.price,
    userId: "65642fcb264c4f37a0b129be",
    deviceToken: null,
    selectedVariantId: data?.variant?.[resultIndex]?.id,
  };

  let quantity =
    allProducts?.AllProducts?.[findIndex]?.variant?.[
      resultIndex
    ]?.AddToCart?.find((item: any) => item.isOrder === false)?.quantity ??
    undefined;

  // console.log("quanity", quantity);
  // console.log(
  //   "allProducts?.AllProducts?.[findIndex]",
  //   allProducts?.AllProducts?.[findIndex]?.variant?.[resultIndex]
  // );
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
      onClick={() => router.push(`/products/${data?.id}`)}
    >
      <FlexBox width="140px" height="140px">
        <FlexImage src={data?.image?.image}></FlexImage>
      </FlexBox>
      <div className="cardDetails">
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
          <Text1 fontSize="13px" marginBottom="6px">
            {data.name.length < 40
              ? data?.name
              : data?.name.substring(0, 50) + "..."}
          </Text1>
        </div>

        {data?.variant?.length === 1 && (
          <div className="productUnit">{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</div>
        )}
        {data?.variant?.every(
          (f: any) =>
            f.ProductInventory?.filter((e: any) => e?.branchId === branchId)
              .availableStock === 0
        ) && <button className="StockOutBtn">Out Of Stock</button>}

        {data?.variant?.length > 1 && (
          <>
            <div onClick={handleOpen} className="productUnitVariant">
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
        )}

        <div className="cardFooter">
          {data?.dicountPercentage === null && (
            <h5 className="productPrice">
              ${data?.variant?.[resultIndex]?.price}
            </h5>
          )}
          {data?.dicountPercentage && (
            <div className="priceBox">
              <h5 className="discountPrice">
                $
                {Math.round(
                  data?.variant?.[resultIndex]?.price -
                    data?.variant?.[resultIndex]?.price *
                      (data?.dicountPercentage / 100)
                )}
              </h5>
              <h5 className="cumulativePrice">
                ${data?.variant?.[resultIndex]?.price}
              </h5>
            </div>
          )}

          <AddButton
            variables={variables}
            onClick={() => addToCart()}
            quantity={quantity}
            disable={addLoader}
            subListId={productTypeId}
            selectedSortOption={selectedSortOption}
          />
        </div>
        {data?.dicountPercentage && (
          <OfferTag discount={data?.dicountPercentage} />
        )}
      </div>
    </CardContainer>
  );
}

export default ProductCard;
