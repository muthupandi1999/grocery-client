import {
  CardContainer,
  VariantContainer,
  VariantImageUnitContainer,
  VariantPriceContainer,
} from "@/app/assets/style";
import React from "react";
import { AddButton } from "../buttons/Buttons";
import PriceTag from "../elements/price";

function VariantProductCard({
  image,
  data,
}: {
  image: string;
  data: { values: string; unit: string; price: number };
}) {
  console.log("variantDta", data);

  return (
    <>
      {data?.variant?.map((variant) => (
        <CardContainer
          key={variant?.id}
          $variant="variantCard"
          $offerState={false}
          $slider={false}
          $available={false}
        >
          <VariantContainer>
            <div className="img-container">
              <div className="img-wrapper">
                <img src={data?.image?.image} alt="" />
              </div>
            </div>
            <div className="units">
              {variant?.values} {variant?.unit}
            </div>
          </VariantContainer>
          <VariantContainer>
           <PriceTag $variant={"variantCard"} price={variant?.price} discount={data?.discountPercentage}/>
          </VariantContainer>
          <VariantContainer>
            <AddButton
              variant="variantCard"
              data={data}
              variantDetails={variant}
              productId={data?.id}
            />
          </VariantContainer>
        </CardContainer>
      ))}
    </>
  );
}

export default VariantProductCard;
