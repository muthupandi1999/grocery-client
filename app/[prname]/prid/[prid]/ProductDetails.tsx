import React from "react";
import { ProductDetailsList } from "../../../utils/data";
import { DetailsContainer,  SCTitle } from "../../../assets/style";

function ProductDetails() {
  
  return (
    <DetailsContainer >
      <SCTitle $variant="H2432 0 16600" >product details </SCTitle>
      {ProductDetailsList.map((data, index) => (
        <div className="list-container" key={index} >
          <SCTitle $variant="H140 0 8600">{data.detailName}</SCTitle>
          <SCTitle $variant="H14UNIT">{data.description}</SCTitle>
        </div>
      ))}
    </DetailsContainer>
  );
}

export default ProductDetails;
