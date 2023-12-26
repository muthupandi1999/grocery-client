"use client";
import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { filterProducts } from "../service/query";
import { CategoryGridContainer, Showresults } from "../assets/style";
import { GetAllProductsProps } from "../assets/style/interface";
import ProductCard from "../components/cards/ProductCard";
import ProductCardLoader from "../Loading UI/productCardLoader";
import { searchProducts } from "../service/api/data";
import { MyContext } from "../myContext";
import { setAllProducts, setProducts } from "../myContext/action";

function page() {
  const { cartItems, allProducts, dispatch } = useContext(MyContext);

  const { loading: searchLoader } = useQuery(filterProducts, {
    variables: {
      filter: "",
    },
    onCompleted(data) {
      console.log("allData",data.getAllProducts,setAllProducts);
      setAllProducts(dispatch,data.getAllProducts);
    },
  });

  console.log("contextProducts", allProducts);

  console.log(cartItems);
  useEffect(() => {
    setProducts(dispatch);
  }, [cartItems]);
  return (
    <>
      {searchLoader ? (
        <CategoryGridContainer $showBackground={false}>
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <ProductCardLoader key={i} />
            ))}
        </CategoryGridContainer>
      ) : (
        <>
          <Showresults>showing results for "All Products"</Showresults>
          <CategoryGridContainer $showBackground={false}>
            {allProducts?.map((data: GetAllProductsProps) => (
              <ProductCard
                key={data?.id}
                data={data}
                slider={false}
                categId={undefined}
                subListId={undefined}
                searchTerm={undefined}
                parent={undefined}
              />
            ))}
          </CategoryGridContainer>
        </>
      )}
    </>
  );
}

export default page;
