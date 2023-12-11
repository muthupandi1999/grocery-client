import React from "react";
import ProductByCategory from "./productByCategory";

function page({ params }: { params: any }) {
  return <ProductByCategory params={params} />;
}

export default page;
