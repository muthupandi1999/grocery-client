"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  CategoryContentContainer,
  CustomSelectField,
  DropDownListItem,
  CategoryGridContainer,
  CategoryContainer,
} from "@/app/assets/style";

import { SortOptions } from "@/app/utils/data";
import { FaCheckCircle } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import outFocus from "@/app/hooks/useOutFocus";
import CategorySidebarComponents from "@/app/components/parts/CategorySidebarComponents";
import { GetAllProductsProps } from "@/app/assets/style/interface";
import CategoryContentLoader from "@/app/Loading UI/categoryContentLoader";
import { getProductsByProductTypeId } from "@/app/service/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  setSubCategoryProducts,
  setUpdateCategoryProducts,
  setUpdateSubCategoryProducts,
} from "@/app/myContext/action";
import { MyContext } from "@/app/myContext";
import Noproducts from "@/app/search/Noproducts";
import CustomRadio from "@/app/components/elements/radio";
import ProductCard from "../components/cards/ProductCard";
import { useParams, usePathname } from "next/navigation";

function ProductByProductTypesId({productTypeId}:{productTypeId:string}) {
    const [selectedSortOption, setSelectSortOption] = useState<string>("Relevance");
    const [filterValue, setFilterValue] = useState("Revelance");
    const [dropDown, setDropDown] = useState(false);
    const { subCategoryProducts, cartItems, dispatch } = useContext(MyContext);
    const dropdownRef = useRef(null);
    const params =useParams();
    const { loading: getProductsLoader, refetch,data,error } = useQuery(
      getProductsByProductTypeId,
      {
        variables: {
          getProductTypeId: productTypeId,
          filter: filterValue,
        },
        fetchPolicy:"no-cache",
        onCompleted: (data) => {
          setSubCategoryProducts(dispatch, data?.getProductTypeId);
        },
        onError(error) {
            setSubCategoryProducts(dispatch, {});
        },
      }
    );
  
    useEffect(() => {
      outFocus(dropdownRef, setDropDown);
    }, []);
    useEffect(() => {
      setUpdateSubCategoryProducts(dispatch);
    }, [cartItems]);
  
    useEffect(() => {
      refetch();
    },[productTypeId,filterValue]);
    console.log("subCatprod",subCategoryProducts,data,params);
  return (
    <>
    {!error?   <CategoryContainer>
      <CategorySidebarComponents />
      {getProductsLoader ? (
        <CategoryContentLoader />
      ) : (
        subCategoryProducts && (
          <CategoryContentContainer>
            <>
              <div className="content-header">
                <h1> Buy {subCategoryProducts.name} online </h1>
                <div className="sort">
                  <span>Sort By</span>
                  <div className="dropDown" ref={dropdownRef}>
                    <CustomSelectField onClick={() => setDropDown(!dropDown)}>
                      {selectedSortOption}
                      <span>
                        <IoChevronDownSharp />
                      </span>
                    </CustomSelectField>
                    {dropDown && (
                      <div className="select-options">
                        {SortOptions.map((data, i) => (
                          <React.Fragment key={i}>
                            <DropDownListItem
                              $colorState={data.label=== selectedSortOption}
                              $id={SortOptions.length - 2 < i}
                              onClick={() => {
                                setSelectSortOption(data?.label);
                                setDropDown(false);
                                setFilterValue(data?.value);
                              }}
                              key={i}
                            >
                              <CustomRadio
                                size={15}
                                value={selectedSortOption === data?.label}
                              />
                              {data?.label}
                            </DropDownListItem>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {subCategoryProducts?.products?.length !== 0 ? (
                <CategoryGridContainer $showBackground={true}>
                  {subCategoryProducts?.products?.map(
                    (data: GetAllProductsProps) => (
                      <ProductCard
                        key={data?.id}
                        data={data}
                        slider={false}
                        parent={undefined}
                      />
                    )
                  )}
                </CategoryGridContainer>
              ) : (
                <Noproducts />
              )}
            </>
          </CategoryContentContainer>
        )
      )}
    </CategoryContainer>:
    <h1>Error occured</h1> }
    
    </>
  )
}

export default ProductByProductTypesId
