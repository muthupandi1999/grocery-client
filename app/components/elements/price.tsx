import { OfferPriceHolder, PriceContainer, PriceHolder, SCTitle } from "@/app/assets/style";
import React from "react";

function PriceTag(props: {
  price: number;
  discount: number;
  $variant: string;
}) {
  const { price, discount, $variant } = props;
  return (
    <PriceContainer $variant={$variant} $offerState={discount ? true : false}>
      {discount ? (
        <OfferPriceHolder  $variant={$variant}>

          <SCTitle $variant="H14700">
            ₹ {Math.ceil(price - (discount / 100) * price)}
          </SCTitle>{" "}
         {$variant==="productPage"&& <SCTitle $variant="H12700UNIT">MRP</SCTitle>}
          <SCTitle $variant="H12STRIKEDUNIT600">₹{price}</SCTitle>
        </OfferPriceHolder>
      ) : (
        <SCTitle $variant="H14700">
          {$variant === "productPage"&&"MRP"}₹{price}
        </SCTitle>
      )}
    </PriceContainer>
  );
}

export default PriceTag;
