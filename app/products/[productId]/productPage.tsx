"use client";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import OpenWithSharpIcon from "@mui/icons-material/OpenWithSharp";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { AddButton } from "@/app/components/buttons/Buttons";
import { Buttons, Text } from "../../assets/style/dynamicButton";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import {
  AddToCart,
  AddToCartRed,
  AllProductsWithSearch,
  GetAddToCarts,
  getProduct,
} from "@/app/service/query";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductData,
  updateProductData,
} from "@/app/redux/slices/AllProductSlice";
export const ProductPageContainer = styled.div`
  .bottomContent {
    .buttonGroup {
      display: flex;
      align-items: center;
      .styleBorder {
        border-top: 1px solid #eaeaea;
        width: 85%;
      }
    }
    .productProperties {
      padding-inline-start: 40px;
      padding-bottom: 50px;
      li {
        list-style: disc;
        color: #666666;
        font-size: 15px;
        padding-bottom: 10px;
        font-weight: 500;
      }
    }
    h4 {
      font-size: 16px;
      padding: 20px 0;
      color: #666666;
      font-weight: 400;
      line-height: 25px;
    }
    .productCodeInfo {
      padding-top: 20px;
      .flexBox {
        display: flex;
        align-items: center;
        width: 44%;
        padding: 5px 0;
        a {
          color: #666666;
          &:hover {
            color: green;
          }
        }
      }
    }
  }
`;

export const ProductPageWrapper = styled.div`
  padding: 60px 0;
  display: flex;
  justify-content: space-between;
  .productImage {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 50%;
    min-width: 400px;
    border: 1px solid #dcdcdce3;
    .expandIcon {
      position: absolute;
      right: 3%;
      top: 3%;
      font-size: 28px;
      border: 1px solid #b7b7b7;
      padding: 6px;
      background: #b7b7b7;
      color: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
    img {
      transform: scale(1);
      transition: transform 1s ease-in-out;
    }
    &:hover img {
      transform: scale(1.2);
    }
  }
  .productDetailContainer {
    padding: 20px 40px;
    max-width: 50%;
    .top1 {
      padding-bottom: 20px;
      border-bottom: 1px solid #d7d7d7;
      .productName {
        padding: 0 0 5px 0;
        font-size: 42px;
        font-weight: 600;
      }
      .rating {
        display: flex;
        align-items: center;
        .ratingIcon {
          font-size: 23px;
          color: #f8c519;
          padding-right: 3px;
        }
        span {
          color: #666666;
        }
      }
    }
    .top2 {
      .description {
        padding: 20px 0;
        font-size: 15px;
        width: 70%;
        color: #666666;
        font-weight: 500;
        line-height:25px;
      }

      .priceDetails {
        display: flex;
        width: 60%;
        align-items: center;

        .productPrize {
          padding: 20px 0;
          font-size: 20px;
        }
        .hurryInfo {
          color: red;
          padding-bottom: 10px;
        }
        .priceInfo {
          width: 60%;
          button {
            border: 1px solid green;
            padding: 5px 12px;
            border-radius: 10px;
            font-size: 12px;
            background: transparent;
            color: green;
            margin-right: 3%;
          }
          button.active {
            background: green;
            border: 1px solid transparent;
            color: #fff;
          }
        }
      }
    }
  }
  .deliveryBox {
    width: 30%;
    .deliveryContainer {
      background-color: #f7f7f7;
      border-radius: 8px;
      padding: 30px;
      ul {
        li {
          display: flex;
          gap: 20px;
          padding: 7px 0;
          line-height: 20px;
        }
      }
    }
  }
`;

function ProductPage({ productId }: { productId: string }) {
  const [activeButton, setActiveButton] = useState("Description");

  const [productData, setProductData] = useState<any>({});

  const dispatch = useDispatch();

  const [loadGreeting] = useLazyQuery(AllProductsWithSearch);

  const { data: addSubscriptionData } = useSubscription(AddToCartRed);

  const [variantId, setVariantId] = useState("");

  const handleButtonClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  const [variantDetails, setVariantDetails] = useState<any>({});

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

  const {
    data: getProductData,
    loading: productLoading,
    error: productError,
    refetch: getProductRefetch,
  } = useQuery(getProduct, {
    variables: {
      getProductId: productId,
    },
    onCompleted: (e) => {
      console.log("Eeeeeee", e);
      const index = e?.getProduct?.variant?.findIndex(
        (item: any) => item?.AddToCart?.length > 0
      );

      console.log("findINdes", index);

      const resultIndex = index !== -1 ? index : 0;

      setVariantDetails(e?.getProduct?.variant?.[resultIndex]);
    },
  });

  console.log("VaraintDetails", variantDetails);

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

  const allProducts = useSelector((state: any) => state.AllProducts);

  const [addToCartProduct, { data: AddToCartData, loading: addLoader, error }] =
    useMutation(AddToCart);

  let findIndex = allProducts?.AllProducts?.findIndex(
    (e: any) => e.id === productData?.id
  );

  const resultIndex = allProducts?.AllProducts?.[findIndex]?.variant?.findIndex(
    (item: any) => item?.id === variantDetails?.id
  );

  let quantity =
    allProducts?.AllProducts?.[findIndex]?.variant?.[
      resultIndex
    ]?.AddToCart?.find((item: any) => item.isOrder === false)?.quantity ??
    undefined;

  console.log("quantityquantity", quantity);

  const variables = {
    productId: productData?.id,
    quantity: 1,
    totalPrice: variantDetails?.price,
    userId: "65642fcb264c4f37a0b129be",
    deviceToken: null,
    selectedVariantId: variantDetails?.id,
  };

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

  useEffect(() => {
    setProductData(getProductData?.getProduct);
  }, [getProductData]);

  return (
    <>
      {productData && !productLoading ? (
        <ProductPageContainer>
          <ProductPageWrapper>
            <div className="productImage">
              <img src={productData?.image?.image} alt="" />
              <OpenWithSharpIcon className="expandIcon" />
            </div>
            <div className="productDetailContainer">
              <div className="top1">
                <h4 className="productName">{productData?.name}</h4>
                <div className="rating">
                  <StarPurple500SharpIcon className="ratingIcon" />
                  <StarPurple500SharpIcon className="ratingIcon" />
                  <StarPurple500SharpIcon className="ratingIcon" />
                  <StarPurple500SharpIcon className="ratingIcon" />
                  <StarPurple500SharpIcon className="ratingIcon" />
                  <span>(1 customer Review)</span>
                </div>
              </div>
              <div className="top2">
                <h3 className="description">{productData?.shortDescription}</h3>

                <div className="priceDetails">
                  <div className="priceInfo">
                    {productData?.variant?.length === 1 && (
                      <button className="active">
                        {variantDetails?.values}
                        {variantDetails?.unit}
                      </button>
                    )}
                    {productData?.variant?.length > 1 && (
                      <>
                        {productData?.variant?.map((e: any) => (
                          <button
                            key={e?.id}
                            onClick={() => setVariantDetails(e)}
                            className={
                              variantDetails?.id === e?.id ? "active" : ""
                            }
                          >
                            {" "}
                            {e?.values}
                            {e?.unit}
                          </button>
                        ))}
                      </>
                    )}
                    <h3 className="productPrize">${variantDetails?.price}</h3>
                    <h4 className="hurryInfo">Hurry Up! Sales Ends In:</h4>
                  </div>
                  <AddButton
                    variables={variables}
                    onClick={() => addToCart()}
                    quantity={quantity}
                    disable={undefined}
                    subListId={undefined}
                    selectedSortOption={undefined}
                  />
                </div>
              </div>
            </div>
            <div className="deliveryBox">
              <div className="deliveryContainer">
                <ul>
                  <li>
                    <img
                      width={"24px"}
                      height={"24px"}
                      alt=""
                      src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/shipping_car.svg"
                    />
                    Free worldwide shipping on all orders over $100
                  </li>
                  <li>
                    <img
                      width={"24px"}
                      height={"24px"}
                      alt=""
                      src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/bean.svg"
                    />
                    Guranteed 100% Organic from natural farmas
                  </li>
                  <li>
                    <img
                      width={"24px"}
                      height={"24px"}
                      alt=""
                      src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/round_arrow.svg"
                    />
                    1 Day Returns if you change your mind
                  </li>
                </ul>
              </div>
            </div>
          </ProductPageWrapper>
          <div className="bottomContent">
            <div className="buttonGroup">
              <Buttons
                padding={"10px 20px"}
                margin={"0 10px 0 0"}
                active={activeButton === "Description"}
                onClick={() => handleButtonClick("Description")}
                activeColor="green" // Set the background color for active state
                textColor="white" // Set the text color for active state
              >
                Description
              </Buttons>
              <Buttons
                padding={"10px 20px"}
                margin={"0 10px 0 0"}
                active={activeButton === "Review"}
                onClick={() => handleButtonClick("Review")}
                activeColor="green" // Set the background color for active state
                textColor="white" // Set the text color for active state
              >
                Review
              </Buttons>
              <div className="styleBorder"></div>
            </div>
            <div className="productCodeInfo">
              <div className="flexBox">
                <div className="flexBox">
                  <Text color="#000" fontWeight="600" minWidth="30%">
                    SKU:
                  </Text>
                  <Text>BG-1028</Text>
                </div>
                <div className="flexBox">
                  <Text color="#000" fontWeight="600" minWidth="50%">
                    Category:
                  </Text>
                  <Text>
                    <a
                      href={`http://localhost:3000/category/${productData?.ProductType?.productCategory?.name}/${productData?.ProductType?.productCategory?.id}/${productData?.ProductType?.id}`}
                      rel="tag"
                    >
                      {productData?.ProductType?.productCategory?.name}
                    </a>
                  </Text>
                </div>
              </div>
              <div className="flexBox">
                <div className="flexBox">
                  <Text color="#000" fontWeight="600" minWidth="30%">
                    Tags
                  </Text>
                  <Text>
                    <a
                      href="https://www.radiustheme.com/demo/wordpress/themes/zilly/product-tag/sweet/"
                      rel="tag"
                    >
                      Sweet
                    </a>
                    ,{" "}
                    <a
                      href="https://www.radiustheme.com/demo/wordpress/themes/zilly/product-tag/yogurt/"
                      rel="tag"
                    >
                      Yogurt
                    </a>
                  </Text>
                </div>
                <div className="flexBox">
                  <Text color="#000" fontWeight="600" minWidth="30%">
                    MFG:
                  </Text>
                  <Text>16/11/2023</Text>
                </div>
              </div>
            </div>
            <Text padding="20px 0 20px 0" lineHeight="25px" minWidth="60%">
              {productData?.shortDescription}
            </Text>

            <ul className="productProperties">
              {productData?.description?.map((e: any) => (
                <li key={e?.key}>
                  {e?.key}-{e?.value}
                </li>
              ))}
            </ul>
          </div>
        </ProductPageContainer>
      ) : (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50px, -50px)",
          }}
        />
      )}
    </>
  );
}

export default ProductPage;
