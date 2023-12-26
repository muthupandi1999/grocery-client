import ProductCardLoader from "@/app/Loading UI/productCardLoader";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "@/app/components/cards/ProductCard";
import { Skeleton } from "@mui/material";
import React from "react";

function CategoryContentLoader() {
  return (
    <CategoryContentContainer>
      <div className="content-header">
        <Skeleton variant="text" sx={{backgroundColor:"#E5E4E2"}}  width={200} height={30} />
      </div>

      <CategoryGridContainer $showBackground={true}>
        {Array(10).fill(0).map((_,i) => (
          <ProductCardLoader key={i}  />
        ))}
      </CategoryGridContainer>
    </CategoryContentContainer>
  );
}

export default CategoryContentLoader;
