"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  CategoryContentContainer,
  CustomSelectField,
  DropDownListItem,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "../../../../components/cards/ProductCard";
import { SortOptions } from "@/app/utils/data";
import { FaCheckCircle } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import CategorySidebarComponents from "@/app/components/parts/CategorySidebarComponents";
import { useQuery, useSubscription } from "@apollo/client";
import {
  AddToCartRed,
  GetProductTypeProducts,
  updateSubs,
} from "@/app/service/query";
import { useDispatch } from "react-redux";

import {
  addProductData,
  updateProductData2,
} from "../../../../redux/slices/AllProductSlice";
import ProductCardLoader from "@/app/components/loader/productCardLoader";
import { CircularProgress } from "@mui/material";
import outFocus from "@/app/hooks/useOutFocus";
const centerstyle = {
  position: "absolute" as "absolute",
  top: "45%",
  left: "58%",
  transform: "translate(-50%, -50%)",
  color: "green",
};

function DynamicPage({ params }: { params: any }) {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedSortOption, setSelectSortOption] = useState("Revelance");

  const [categoryTypeAndProducts, setCategoryTypeAndProducts] = useState<any>(
    []
  );

  const dispatch = useDispatch();
  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);
  console.log("updateData", updateSubscriptionData);

  const {
    data: categoryTypeProducts,
    loading: categoryProductLoading,
    refetch: refetchProducts,
  } = useQuery(GetProductTypeProducts, {
    variables: {
      getProductTypeId: params?.subListId,
      filter: selectedSortOption,
    },
    // skip: Boolean,
    onCompleted: (data: any) => {
      setCategoryTypeAndProducts(data?.getProductTypeId);

      console.log("res", data);
    },
  });

  useEffect(() => {
    outFocus(dropdownRef, setDropDown);
  }, []);

  useEffect(() => {
    refetchProducts();
    // let categoryTypeAndProducts = categoryTypeAndProductsList?.getProductTypeId;
  }, [selectedSortOption, setSelectSortOption]);

  // useEffect(() => {
  //   // refetchProducts();
  //   setCategoryTypeAndProducts(categoryTypeAndProductsList?.getProductTypeId);
  //   // let categoryTypeAndProducts = categoryTypeAndProductsList?.getProductTypeId;
  // }, [params?.subListId, selectedSortOption]);

  useEffect(() => {
    if (updateSubscriptionData !== undefined) {
      console.log("ipdayteDtaa", updateSubscriptionData);
      let { productId, quantity, selectedVariantId } =
        updateSubscriptionData.updateCart;

      dispatch(
        updateProductData2({
          productId: productId,
          quantity: quantity,
          variantId: selectedVariantId,
        })
      );
    }
  }, [updateSubscriptionData]);

  useEffect(() => {
    if (addSubscriptionData != undefined) {
      dispatch(
        addProductData({
          addProduct: addSubscriptionData.addCart,
          variantId: addSubscriptionData?.selectedVariantId,
        })
      );
    }
  }, [addSubscriptionData]);

  return (
    <>
      <CategorySidebarComponents />
      {categoryTypeAndProducts && !categoryProductLoading ? (
        <CategoryContentContainer $variant="productType">
          <div className="content-header">
            <h1> Buy {categoryTypeAndProducts?.name} online </h1>

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
                      <DropDownListItem
                        $colorState={data === selectedSortOption}
                        $id={SortOptions.length - 2 < i}
                        $dropdownState={dropDown}
                        onClick={() => {
                          setSelectSortOption(data);
                          setDropDown(false);
                        }}
                        key={i}
                      >
                        <span style={{}}>
                          {selectedSortOption === data ? (
                            <FaCheckCircle style={{ color: "green" }} />
                          ) : (
                            <MdOutlineRadioButtonUnchecked
                              style={{ color: "gray" }}
                            />
                          )}
                        </span>
                        {data}
                      </DropDownListItem>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {categoryTypeAndProducts?.products?.length > 0 &&
          !categoryProductLoading ? (
            <CategoryGridContainer>
              {categoryTypeAndProducts?.products?.map((data: any) => (
                <ProductCard
                  productTypeId={params?.subListId}
                  key={data.id}
                  width="100%"
                  data={data}
                  selectedSortOption={selectedSortOption}
                  categoryId={""}
                />
              ))}
            </CategoryGridContainer>
          ) : (
            <h3 className="NodataFoundText">No data found</h3>
          )}
        </CategoryContentContainer>
      ) : (
        <CircularProgress sx={centerstyle} />
      )}
    </>
  );
}

export default DynamicPage;
