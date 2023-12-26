import { Stack, Skeleton } from "@mui/material";
import React, { Fragment } from "react";
import { CardContainer, ProductTimerCard } from "../assets/style";

function ProductCardLoader() {
  return (
    <CardContainer
      $variant="productCardloader"
      $slider={true}
      $available={false}
      $offerState={false}
    >
      <div className="img-container">
        <div className="img-wrapper">
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={200}
            sx={{ backgroundColor: "#E5E4E2" }}
          />
        </div>
      </div>
      <div className="content-Wrapper">
        <div>
          <ProductTimerCard $variant="forCard">
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ backgroundColor: "#E5E4E2" }}
            />
          </ProductTimerCard>
        </div>

        <div className="title">
          <Skeleton
            variant="text"
            height={20}
            animation="wave"
            sx={{ backgroundColor: 	"#E5E4E2" }}
          />
        </div>
        <div className="cardFooter">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="offerPrice">
              <Skeleton
                width={20}
                animation="wave"
                sx={{ backgroundColor: "#E5E4E2" }}
              />
            </span>{" "}
          </div>

          <Skeleton
            variant="rounded"
            animation="wave"
            width={80}
            height={30}
            sx={{ backgroundColor: "#E5E4E2" }}
          />
        </div>
      </div>
    </CardContainer>
  );
}

export default ProductCardLoader;
