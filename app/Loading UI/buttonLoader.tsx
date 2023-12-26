import { CircularProgress, circularProgressClasses } from "@mui/material";
import React from "react";
import { greenSecondary } from "../assets/style/themeColor";

function ButtonLoader() {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: "#FFFFFF",
        animationDuration: "550ms",
        position: "absolute",
        right: "20px",
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
      }}
      size={18}
      thickness={6}
    />
  );
}

export default ButtonLoader;
