"use client";

import React, { useContext, useEffect, useRef, useState, Suspense } from "react";

import { globalContext } from "@/app/utils/states";
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
import PageLoader from "@/app/components/loader/pageLoader";
import { productTypeProductsByCategoryId } from "@/app/service/api";
import { useSubscription } from "@apollo/client";
import { AddToCartRed, updateSubs } from "@/app/service/query";
import { useDispatch, useSelector } from "react-redux";
// import { updateProductData } from "@/app/redux/slices/AllProductSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProductData } from "@/app/redux/slices/AllProductSlice";
import {
  addProductData,
  updateProductData,
  updateProductData2,
} from "../../../../redux/slices/AllProductSlice";

function DynamicPage({ params }: { params: any }) {
  const [selectedSortOption, setSelectSortOption] = useState("Revelance");
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const { categoryListArr } = useContext(globalContext) as any;
  const [categoryTypeAndProducts, setCategoryTypeAndProducts] = useState([]) as any;

  const dispatch = useDispatch();
  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);
  console.log("updateData", updateSubscriptionData);

  const allProducts = useSelector((state: any) => state.AllProducts);

  const { categoryTypeAndProductsList, refetchProducts } =
    productTypeProductsByCategoryId(params?.subListId, selectedSortOption);

  useEffect(() => {
    refetchProducts()
    setCategoryTypeAndProducts(categoryTypeAndProductsList?.getProductTypeId);
    // let categoryTypeAndProducts = categoryTypeAndProductsList?.getProductTypeId;
  }, [ params?.subListId, selectedSortOption]);

  useEffect(() => {
    if (updateSubscriptionData !== undefined) {
      console.log("ipdayteDtaa", updateSubscriptionData)
      let { productId, quantity } = updateSubscriptionData.updateCart;

      dispatch(
        updateProductData2({ productId: productId, quantity: quantity })
      );
    }
  }, [updateSubscriptionData]);

  useEffect(() => {
    if (addSubscriptionData != undefined) {
      dispatch(addProductData({ addProduct: addSubscriptionData.addCart }));
    }
  }, [addSubscriptionData]);
  // useEffect(() => {
  //   if (updateSubscriptionData !== undefined) {
  //     const productIdToUpdate = updateSubscriptionData.updateCart.productId;
  //     const updatedQuantity = updateSubscriptionData.updateCart.quantity;

  //     // Update the specific product in the state
  //     const updatedProductList = allProducts.AllProducts.map((product: any) => {
  //       if (product.id === productIdToUpdate) {
  //         return {
  //           ...product,
  //           variant: [
  //             {
  //               ...product.variant[0],
  //               AddToCart: {
  //                 ...product.variant[0].AddToCart,
  //                 quantity: updatedQuantity,
  //               },
  //             },
  //           ],
  //         };
  //       }
  //       return product;
  //     });

  //     console.log("updateProductListtt", updatedProductList);

  //     // Dispatch the action to update the product data in the state
  //     dispatch(updateProductData(updatedProductList));
  //   }
  // }, [updateSubscriptionData]);

  // useEffect(() => {
  //   if (selectedSortOption) {
  //     // refetchProducts({
  //     //   getProductTypeId: params?.subListId,
  //     //   filter: selectedSortOption,
  //     // });
  //   }
  // }, [selectedSortOption]);

 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategorySidebarComponents />
      { categoryTypeAndProducts?.products && (
        <CategoryContentContainer>
          <>
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

            {categoryTypeAndProducts?.products?.length > 0 ? (
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
          </>
        </CategoryContentContainer>
      )}
    </Suspense>
  );
}

export default DynamicPage;
