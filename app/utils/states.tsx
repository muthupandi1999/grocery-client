"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

import React from "react";
export const globalContext = createContext(null) as any;

function GlobalContext({ children }:any) {
  const [categoryListArr, setCategoryListArr] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [productsByCategoryId, setProductsByCategoryId] = useState([]);
  const path = usePathname();
  const pathArr = path.split("/");

  let routesArr = pathArr.slice(1, 4);
  routesArr.toString().split(",").join("/");
  const defaultRoutes = routesArr.toString().split(",").join("/");
  return (
    <globalContext.Provider
      value={{
        categoryListArr,
        setCategoryListArr,
        categoryProducts,
        setCategoryProducts,
        defaultRoutes,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default GlobalContext;
