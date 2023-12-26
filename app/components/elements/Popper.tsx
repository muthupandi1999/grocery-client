import { CategoryHiddenListPopper } from "@/app/assets/style";
import React from "react";

function CustomPopper({ children, anchorEL, closeFunc, variant }) {
  const open = Boolean(anchorEL);

  const id = open ? "simple-popover" : undefined;
  return (
    <CategoryHiddenListPopper
      id={id}
      open={open}
      anchorEl={anchorEL}
      onClose={closeFunc}
      PaperProps={{ style: {   borderBottomLeftRadius: variant === "accountPopper" ? "16px" : "4px",
      borderBottomRightRadius: variant === "accountPopper" ? "16px" : "4px",boxShadow:variant === "accountPopper" &&"none" } }}
   
      style={{ top: variant === "accountPopper" ? "20px" : 0 }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </CategoryHiddenListPopper>
  );
}

export default CustomPopper;

{
  /* <div className="hiddenList">
{hiddenList?.map((data) => (
  <Fragment  key={data?.id}>
    <NavListItem
      onClick={() => {
        Router.push(data?.defaultRoute);
      }}
     
    >
      {data?.name}
    </NavListItem>
    <Divider light />
  </Fragment>
))}
</div> */
}
