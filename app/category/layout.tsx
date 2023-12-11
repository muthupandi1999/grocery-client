"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import CategoryNavComponent from "../components/parts/CategoryNavComponent";
import CategorySidebarComponents from "../components/parts/CategorySidebarComponents";
import { CategoryContainer } from "../assets/style";

import { globalContext } from "../utils/states";
import { useQuery } from "@apollo/client";
import { getAllCategories } from "../service/query";

function Layout({ children }:any) {
  const { defaultRoutes, setCategoryListArr } = useContext(globalContext) as any;

  const { data } = useQuery(getAllCategories);
  useEffect(() => {
    if (data) {
      setCategoryListArr(data.getAllCategories);
    }
  }, [data]);

  return (
    <>
      {defaultRoutes !== "category" ? (
        <>
          <CategoryNavComponent />
          <CategoryContainer>{children}</CategoryContainer>{" "}
        </>
      ) : (
        <> {children}</>
      )}
    </>
  );
}

export default Layout;
