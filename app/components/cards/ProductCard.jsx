"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import {
  CardContainer,
  ListTitle,
  ProductTimerCard,
  SCIMGBOX,
  SCIMGTAG,
  SCTitle,
  TitleTag,
  VariantCardWrapper,
  VariantContainer,
  VariantWrapper,
} from "@/app/assets/style";
import { AddButton } from "@/app/components/buttons/Buttons";
import OfferTag from "../../[prname]/prid/[prid]/OfferTag";
import { MyContext } from "../../myContext";
import { FaAngleDown } from "react-icons/fa6";
import { Box, Modal, Typography } from "@mui/material";
import VariantProductCard from "./VariantProductCard";
import PriceTag from "../elements/price";
import CustomModal from "../elements/Modal";
import { IoCloseCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import DeleverTime from "../elements/DeleverTime";
function ProductCard({ data, slider, parent }) {
  const [productObj, setProductObj] = useState({});
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});
  const productRef = useRef(null);
  const buttonRef = useRef(null);
  const router =useRouter();
  useEffect(() => {
    setProductObj(data);
    if (data?.variant?.length > 1) {
      if (data?.variant?.[0].AddToCart?.[0] || data?.variant?.[1].AddToCart?.[0]) {
        if (data?.variant?.[0].AddToCart?.[0]) {
          setSelectedVariant(data?.variant?.[0]);
        } else {
          setSelectedVariant(data?.variant?.[1]);
        }
      } else {
        setSelectedVariant(data?.variant?.[0]);
      }
    } else {
      setSelectedVariant(data?.variant?.[0]);
    }
  }, [data]);
  console.log(
    "Sssssss",
    data,data?.name,".....",selectedVariant
  );

  return (
    <CardContainer
      onClick={() => {
        router.push(`/product/prid/${productObj?.id}`)
      }}
      ref={productRef}
      $variant="productCard"
      $offerState={productObj?.dicountPercentage}
      $slider={slider}
      $available={""}
    >
      {/* <div className="img-container">
        <div className="img-wrapper">
          <img src={productObj?.image?.image} alt="" />
        </div>
      </div> */}
      <SCIMGBOX $variant="H150">
        {/* <SCIMGTAG  src={productObj?.image?.image}/> */}
        <img src={productObj?.image?.image} alt="" />
      </SCIMGBOX>
      <div className="content-Wrapper">
      <DeleverTime time={45}/>
      <div className="title">
        <SCTitle $variant="H13600">
          {productObj?.name?.substring(0, 33)}{" "}
          {productObj?.name?.length > 33 && "..."}{" "}
        </SCTitle>
      </div>
      {productObj?.variant?.length > 1 ? (
        <>
          <VariantWrapper   onClick={(e) =>{
            e.stopPropagation();
            setShowVariantModal(true)

          } }>
            <>
              <p>
                {selectedVariant?.values} <span>{selectedVariant?.unit}</span>
              </p>{" "}
              {productObj?.variant?.length > 1 && (
                <span>
                  <FaAngleDown />
                </span>
              )}
            </>
          </VariantWrapper>
          <CustomModal 
            open={showVariantModal}
            onClose={() => setShowVariantModal(false)}
          >
            <VariantCardWrapper onClick={(e)=>e.stopPropagation()} >
              <VariantContainer>
                <TitleTag> {productObj?.name} </TitleTag>
                <IoCloseCircle
                  onClick={() => setShowVariantModal(false)}
                  size={30}
                  color={"gray"}
                />
              </VariantContainer>

              <VariantProductCard data={productObj} />
            </VariantCardWrapper>
          </CustomModal>
        </>
      ) : (
        <div className="quantity">
          <SCTitle $variant="H12UNIT">
            {selectedVariant?.values} <span>{selectedVariant?.unit}</span>
          </SCTitle>{" "}
          {productObj?.variant?.length > 1 && (
            <span>
              <FaAngleDown />
            </span>
          )}
        </div>
      )}

      <div className="cardFooter">
        <PriceTag 
          $variant="productCard"
          price={selectedVariant?.price}
          discount={productObj?.dicountPercentage}
        />

        <AddButton
          ref={buttonRef}
          variant={"productCard"}
          data={selectedVariant}
          productId={productObj?.id}
        />
      </div>
      {productObj?.dicountPercentage && (
        <OfferTag discount={productObj.dicountPercentage} />
      )}
      </div>
    </CardContainer>
  );
}

export default ProductCard;
