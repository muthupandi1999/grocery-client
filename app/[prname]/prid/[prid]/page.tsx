"use client";

import { ProductContainer, ProductLeftSection } from "@/app/assets/style";
import ProductDetails from "@/app/[prname]/prid/[prid]/ProductDetails";
import ProductRight from "@/app/[prname]/prid/[prid]/ProductRight";
import { getProduct } from "@/app/service/query";
import { useQuery } from "@apollo/client";
import ReactImageMagnify from "react-image-magnify";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/myContext";
import {
  setIndividualProduct,
  setUpdateIndividualProduct,
} from "@/app/myContext/action";
import SimpleSlider from "./slider";
import { setProductObj } from "@/app/helperFunctions";

function page({ params }: { params: { prid: string } }) {
  const { productById, dispatch, cartItems } = useContext(MyContext);

  const [image, setImage] = useState("");
  const [variantDetails, setVariantDetails] = useState<{ id?: string }>({});
  const { refetch } = useQuery(getProduct, {
    variables: {
      getProductId: params?.prid,
    },
    onCompleted: (data) => {
      setIndividualProduct(dispatch, setProductObj(data));
      setImage(data?.getProduct?.image?.imageList?.[0]);
      console.log("API Data",data);
      
    },
  });

  console.log("globalProductByID", productById);
  useEffect(() => {
    refetch();
  }, [params?.prid]);
  useEffect(() => {
    setUpdateIndividualProduct(dispatch);
  }, [cartItems]);

  useEffect(() => {
    if (productById?.product?.variant?.length > 1) {
      let defaultVariant = productById?.product?.variant?.find(
        (data) => data?.id === variantDetails?.id
      );
      if (defaultVariant) {
        console.log("sdddddddd", defaultVariant);

        setVariantDetails(defaultVariant);
      }
    } else {
      console.log("edsd", productById?.product?.variant?.[0]);

      setVariantDetails(productById?.product?.variant?.[0]);
    }
  }, [productById]);
  console.log("variantDetailsfrompage", productById, variantDetails);
  const selectVariantFunc = (variant: { id: string }) => {
    setVariantDetails(variant);
  };
  return (
    <div>
      <ProductContainer>
        <ProductLeftSection>
          <div className="productViewer">
            <div className="perimeter">
              <div className="image">
                <ReactImageMagnify
                  enlargedImageContainerStyle={{
                    left: "120%",
                    top: "6%",
                    zIndex: 20,
                    borderColor: "#f2f2f2",
                    backgroundColor: "white",
                  }}
                  {...{
                    smallImage: {
                      src: image,
                      width: 480,
                      height: 480,
                      isFluidWidth: false,
                    },
                    largeImage: {
                      src: image,
                      width: 1700,
                      height: 2000,
                    },
                    enlargedImageContainerDimensions: {
                      width: "200%",
                      height: "150%",
                    },

                    isHintEnabled: true,
                  }}
                />
              </div>
            </div>
            <SimpleSlider
              imagesArr={productById?.product?.imageList}
              setImage={setImage}
              image={image}
            />
          </div>
          <ProductDetails />
        </ProductLeftSection>
        <ProductRight
          data={productById}
          variantDetails={variantDetails}
          selectVariant={(variant: { id: string }) =>
            selectVariantFunc(variant)
          }
        />
      </ProductContainer>
    </div>
  );
}

export default page;
