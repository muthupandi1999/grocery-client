"use client";

import { DYNIProps } from "../assets/style/interface";
import CategoryNavComponent from "../components/parts/CategoryNavComponent";
import ProductByCategoryId from "./productByCategoryId";
import ProductByProductTypesId from "./productByProductTypesId";
import React from "react";

function page({ params }:DYNIProps) {
  const { DYN } = params;
  console.log("123", DYN);

  return (
    <>
      <CategoryNavComponent />
     { DYN.includes("category-id") &&
      <ProductByCategoryId categoryId={DYN[1]} />}
       { DYN.includes("productType") &&
      <ProductByProductTypesId productTypeId={ DYN?.length===3? DYN[2]:DYN[1]} />}
      
    </>
  );
}

export default page;
