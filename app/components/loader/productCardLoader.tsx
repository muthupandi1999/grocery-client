import { Stack, Skeleton } from "@mui/material";
import React from "react";
import { CardContainer, ProductTimerCard } from "../../assets/style";

function ProductCardLoader() {
  return (
    <CardContainer $variant="productCard" $slider={true} $available={false} $offerState={false}>
      <div className="img-container">
        <div className="img-wrapper">
          <Skeleton variant="rectangular" animation="wave"  height={200} sx={{backgroundColor:"rgb(204,204,204)" }}  />
        </div>
      </div>
      <div>
        <ProductTimerCard $variant="forCard">
          <Skeleton variant="text" animation="wave"    sx={{backgroundColor:"rgb(227,227,227)" }} />
         
        </ProductTimerCard>
      </div>

      <div className="title" >
        <Skeleton variant="text" height={20} animation="wave"   sx={{backgroundColor:"rgb(227,227,227)" }}/>
       
      </div>
      <div className="cardFooter">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="offerPrice">
            <Skeleton width={20} animation="wave"   sx={{backgroundColor:"rgb(227,227,227)" }}/>
          </span>{" "}
        
        </div>

        <Skeleton variant="rounded" animation="wave"  width={80} height={30}  sx={{backgroundColor:"rgb(227,227,227)" }}/>
      </div>
    </CardContainer>
  );
}

export default ProductCardLoader;
