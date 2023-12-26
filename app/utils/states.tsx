"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

import React from "react";
import { ChildrenProps, GlobalContext } from "../assets/style/interface";
export const globalContext = createContext<GlobalContext>({
  setSearch: function (value: React.SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
});

function GlobalContext({ children }: ChildrenProps) {
  const [productsByCategoryId, setProductsByCategoryId] = useState({
    staticCategoryId:[
      "65549be6b8cc555881cb43f3",
      "6555c9459ad354780c2e6c4c",
    ],
    productByCategoryID:[]
});
  const [search, setSearch] = useState("");

  const path = usePathname();
  const pathArr = path.split("/");

  let routesArr = pathArr.slice(1, 4);
  routesArr.toString().split(",").join("/");
  const defaultRoutes = routesArr.toString().split(",").join("/");
  // console.log("defaultRoutes", defaultRoutes.length);
  return (
    <globalContext.Provider
      value={{
        defaultRoutes,
        search,
        setSearch,
        productsByCategoryId,
        setProductsByCategoryId,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default GlobalContext;
