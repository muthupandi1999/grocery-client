"use client";
import {
  CategoryNavContainer,
  SCTitle,
} from "@/app/assets/style";
import { AllCategory } from "@/app/assets/style/interface";
import { getAllCategoryWithTypes } from "@/app/service/api/data";
import { Divider, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect,  useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import CustomPopper from "../elements/Popper";
function CategoryNavComponent() {
  const Router = useRouter();
  const { allCategories, allCategoryLoader } = getAllCategoryWithTypes();
  const allCategoryArr = allCategories?.getAllCategories;
  const [anchorEL, setAnchorEL] = useState<EventTarget & HTMLHeadingElement|null>(null);
  const [sliceCount, setSliceCount] = useState(7);
  const showonList: AllCategory = allCategoryArr?.slice(0, sliceCount);
  const hiddenList: AllCategory = allCategoryArr?.slice(
    sliceCount,
    allCategoryArr?.length
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1170) {
        setSliceCount(4);
      } else {
        setSliceCount(7);
      }
    });
    return () =>
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 1170) {
          setSliceCount(4);
        } else {
          setSliceCount(7);
        }
      });
  }, []);
console.log("types",allCategoryArr);

  return (
    <CategoryNavContainer>
      <nav className="navList">
        {allCategoryLoader
          ? Array(sliceCount)
              .fill(0)
              .map((_, i) => (
                <SCTitle $variant="H14UNITNAV" key={i}>
                  <Skeleton variant="text" width={120} height={25} />
                </SCTitle >
              ))
          : showonList?.map((data) => (
              <SCTitle $variant="H14UNITNAV"
                onClick={() => {
                  Router.push(`/productType/${data?.id}/${ data?.productTypes?.[0]?.id}`);
                }}
                key={data?.id}
              >
                {data?.name}
              </SCTitle >
            ))}
        {!allCategoryLoader && (
          <>
            <SCTitle $variant="H14UNITNAV"
              style={{ position: "relative" }}
             
              onClick={(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
                setAnchorEL(event.currentTarget);
              }}
            >
              more{" "}
              <span>
                <IoChevronDownSharp />
              </span>
            </SCTitle >
            <CustomPopper anchorEL={anchorEL} closeFunc={() => setAnchorEL(null)}  variant={undefined}>
              <div className="hiddenList">
                {hiddenList?.map((data) => (
                  <Fragment key={data?.id}>
                    <SCTitle $variant="H14UNITNAV"
                      onClick={() => {
                        Router.push(`/productType/${data?.id}/${ data?.productTypes?.[0]?.id}`);
                      }}
                    >
                      {data?.name}
                    </SCTitle >
                    <Divider light />
                  </Fragment>
                ))}
              </div>
            </CustomPopper>
          </>
        )}
      </nav>
    </CategoryNavContainer>
  );
}

export default CategoryNavComponent;
