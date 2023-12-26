"use client";
import React from "react";
import CategorySidebarLoader from "@/app/Loading UI/categorySidebarLoader";
import {
  CategorySidebarContainer,
  SideBarListContainer,
} from "@/app/assets/style";
import { AllCategory } from "@/app/assets/style/interface";
import { fetchProductTypesByCategoryId } from "@/app/service/api/data";
import { Divider } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

function CategorySidebarComponents() {
  const path = usePathname();
  const pathArr = path.split("/");
  const Router = useRouter();
const {  sideBarList,sideBarLoader } =  fetchProductTypesByCategoryId(pathArr[pathArr.length - 2]);
  const productTypes = sideBarList?.getCategory?.productTypes;

  return (
    <>
    {productTypes?.length>0 && 
    <CategorySidebarContainer>
      {sideBarLoader?<CategorySidebarLoader/>:productTypes?.map((data: AllCategory) => (
        <React.Fragment key={data?.id}>
          <a
            onClick={() =>
              Router.push(
                `/productType/${
                  pathArr[pathArr.length - 2]
                }/${data.id}`
              )
            }
          >
            <SideBarListContainer
              $routeId={data.id === pathArr[pathArr.length - 1]}
            >
              <div className="img-container">
                <img
                  style={{ width: "100%", position: "relative" }}
                  src={`${data.image}`}
                  alt=""
                />
              </div>
              <div className="subtitle">{data.name}</div>
            </SideBarListContainer>
          </a>
          <Divider light />
        </React.Fragment>
      ))}
      
    </CategorySidebarContainer>}
    </>
  );
}

export default CategorySidebarComponents;
