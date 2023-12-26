"use client";
import { SCLINK, SCTitle } from "../assets/style";
import { Grid } from "@mui/material";
import React from "react";
import { getAllCategoryWithTypes } from "../service/api/data";
import { ICategory } from "../assets/style/interface";

function page() {
  const { allCategories } = getAllCategoryWithTypes();
  const CategoryArr: ICategory[] = allCategories?.getAllCategories;
  console.log("test", CategoryArr);

  return (
    <>
      <SCTitle $variant="H2460032 0 16">categories</SCTitle>
      {CategoryArr?.map((data) => {
        return (
          <React.Fragment key={data?.id}>
            <SCTitle $variant="H1870015 0">{data?.name}</SCTitle>
            <Grid rowGap={2} container>
              {data?.productTypes.map((value) => (
                <Grid key={value.id} item sm={6}>
                  <SCLINK
                    $variant=""
                    href={`/productType/${data?.id}/${value?.id}`}
                  >
                    {value?.name}
                  </SCLINK>
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default page;
