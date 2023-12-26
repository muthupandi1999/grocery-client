"use client";
import { CategoryGridContainer, Showresults } from "@/app/assets/style";
import ProductCard from "@/app/components/cards/ProductCard";
import { filterProducts } from "@/app/service/query";
import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import Noproducts from "../Noproducts";
import { globalContext } from "@/app/utils/states";
import {
  GetAllProductsProps,
  GlobalContext,
} from "@/app/assets/style/interface";
import ProductCardLoader from "@/app/Loading UI/productCardLoader";
import { searchProducts } from "@/app/service/api/data";
import { MyContext } from "@/app/myContext";
import { setProducts } from "@/app/myContext/action";

function page({ params }: { params: { term: string } }) {
  const { setSearch,search } = useContext(globalContext);
 const{searchedResults,searchLoader} =searchProducts(params?.term);
 const { dispatch, cartItems } = useContext(MyContext);

  useEffect(() => {
    setSearch(params.term);
  }, []);
  useEffect(() => {
    setProducts(dispatch);
  }, [cartItems]);
  return (
    <>
      {searchedResults?.getAllProducts?.length !== 0 ? (
        <>
          <Showresults>showing results for "{params.term}"</Showresults>

          <CategoryGridContainer $showBackground={false}>
            {searchedResults?.getAllProducts?.map((data: GetAllProductsProps) => (
              <ProductCard
                key={data?.id}
                data={data}
                slider={false}
                categId={undefined}
                subListId={undefined}
                searchTerm ={search}
              />
            ))}
          </CategoryGridContainer>
        </>
      ) : (
        <Noproducts />
      )}

      {searchLoader && (
        <CategoryGridContainer $showBackground={false}>
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <ProductCardLoader key={i} />
            ))}
        </CategoryGridContainer>
      )}
    </>
  );
}

export default page;
