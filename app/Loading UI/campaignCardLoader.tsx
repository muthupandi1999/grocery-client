import React from "react";
import { CampaignCardWrapper } from "../assets/style";
import DynamicButton from "../components/buttons/DynamicButton";
import { Skeleton } from "@mui/material";

function CampaignCardLoader() {
  return (
    <CampaignCardWrapper $background={""}>
      <div
        className="loaderWrapper"
        style={{
          padding: "20px 20px",
  
        }}
      >
        <Skeleton variant="text" width={250} height={70}></Skeleton>
        <Skeleton variant="text" width={250} height={50}></Skeleton>

        <Skeleton
          variant="rounded"
          width={120}
          height={30}
          sx={{ margin: "20px 0" }}
        ></Skeleton>
      </div>
    </CampaignCardWrapper>
  );
}

export default CampaignCardLoader;
