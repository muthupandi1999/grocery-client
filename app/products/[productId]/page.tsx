import React from "react";
import ProductPage from "./productPage";

function page({params}:{params:any}) {
  console.log("productId", params?.productId)
  return (
    <div>
      <ProductPage productId = {params?.productId} />
    </div>
  );
}

export default page;
