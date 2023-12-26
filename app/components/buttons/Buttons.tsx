"use client";

import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  ReactEventHandler,
} from "react";
import { CustomAddButton } from "../../assets/style";
import { HiPlusSm } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { addProducts, updateProducts } from "@/app/service/api/data";
import { IProductsById, IVariant, MyContext } from "../../myContext";
import { updateQuantity } from "@/app/helperFunctions";
import { USER_ID } from "@/app/utils/variables";
import ButtonLoader from "@/app/Loading UI/buttonLoader";
import { Opacity } from "@mui/icons-material";

export const AddButton = ({
  data,
  variant,
  variantDetails,
  productId,
  ref,
  hideBackground,
}: {
  data: IVariant;
  variant: string;
  variantDetails?: IVariant;
  productId: string;
  ref?: React.LegacyRef<HTMLButtonElement>;
  hideBackground?: boolean;
}) => {
  const { addItems, addLoader } = addProducts();
  const { updateItems, deleteLoader } = updateProducts();
  const { dispatch } = useContext(MyContext);
  const [count, setCount] = useState(0);
  const [variantId, setVariantId] = useState<string>("");
  const [productPrice, setProductPrice] = useState(0);
  console.log("SSS", data);

  useEffect(() => {
    switch (variant) {
      case "productCard":
        if (data?.AddToCart?.length > 0) {
          console.log("ADDDDDD", data?.AddToCart);

          setCount(data?.AddToCart?.[0]?.quantity);
        } else {
          setCount(0);
        }
        setVariantId(data?.id);
        setProductPrice(data?.price);

        break;
      case "cartCard":
        if (data?.selectedvariant) {
          setCount(data?.quantity);
          setVariantId(data?.selectedvariant?.id);
        }
        break;
      case "variantCard":
        console.log(data);
        if (variantDetails?.AddToCart?.length > 0) {
          setCount(variantDetails?.AddToCart?.[0]?.quantity);
        } else {
          setCount(0);
        }
        setVariantId(variantDetails?.id);
        setProductPrice(variantDetails?.price);

        console.log("variDetails", variantDetails);

        break;
    }
    console.log(
      "count receive",
      data,
      "cccc",
      count,
      "56",
      data?.variant?.[0]?.id,
      variantId
    );
  }, [data, variantDetails]);

  const addToCart = async (quantity: number, prodId: string, varId: string) => {
    const response = await addItems({
      variables: {
        input: {
          productId: prodId,
          quantity: quantity,
          userId: USER_ID,
          deviceToken: null,
          selectedVariantId: varId,
          totalPrice: productPrice,
        },
      },
    });
    if (response) {
      const responseObj = response.data.addToCartProduct;
      console.log("addResponse", responseObj);
      updateQuantity(dispatch, responseObj);
    } else {
      alert("promise failed");
    }
  };
  const updateCart = async (
    quantity: number,
    prodId: string,
    varId: string
  ) => {
    const response = await updateItems({
      variables: {
        input: {
          productId: prodId,
          quantity: quantity,
          userId: USER_ID,
          variantId: varId,
        },
      },
    });
    if (response) {
      const responseObj = response.data.updateAddToCart;
      console.log("updateResponse", responseObj);
      updateQuantity(dispatch, responseObj);
    }
  };

  // Function to debounce another function
  const debounce = (delay: number) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    return function (
      quantity: number,
      prodId: string,
      varId: string,
      func: (quantity: number, prodId: string, varId: string) => Promise<void>
    ) {
      // Clear the previous timeout
      clearTimeout(timeoutId);

      // Set a new timeout
      timeoutId = setTimeout(() => func(quantity, prodId, varId), delay);
    };
  };
  const updateDebouncedApiCallRef = useRef(debounce(500));
  return (
    <CustomAddButton
      ref={ref}
      $variant="productCard"
      $count={count}
      disabled={addLoader || deleteLoader}
      $disable={addLoader || deleteLoader}
      onClick={(e) => {
        e.stopPropagation();
      }}
      hideBackground={hideBackground}
    >
      {count === 0 ? (
        <span
        style={{visibility:(addLoader||deleteLoader)?"hidden":"visible"}}
          onClick={() => {
            setCount(1);
            updateDebouncedApiCallRef.current(
              1,
              productId,
              variantId,
              addToCart
            );
          }}
        >
          ADD
        </span>
      ) : (
        <>
          {" "}
          <span
            onClick={() => {
              setCount((prev) => prev - 1);
              updateDebouncedApiCallRef.current(
                count - 1,
                productId,
                variantId,
                updateCart
              );
              console.log(count);
            }}
          >
            {hideBackground ? (
              <HiMinusSm color={"black"} size={11} />
            ) : count === 1 ? (
              <AiOutlineDelete color={"white"} size={11} />
            ) : (
              <HiMinusSm color={"white"} size={11} />
            )}
          </span>{" "}
         <span  style={{visibility:(addLoader||deleteLoader)?"hidden":"visible"}}> {count}</span>
          <span
            defaultValue={count}
            onClick={(e) => {
              setCount((prev) => prev + 1);

              updateDebouncedApiCallRef.current(
                count + 1,
                productId,
                variantId,
                updateCart
              );
              console.log("ccc", count, variantId);
            }}
          >
            <HiPlusSm color={hideBackground ? "black" : "white"} size={11} />
          </span>{" "}
        </>
      )}
      {(addLoader || deleteLoader) && <ButtonLoader />}
    </CustomAddButton>
  );
};
