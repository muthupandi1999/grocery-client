import React from "react";
import DynamicButton from "@/app/components/buttons/DynamicButton";
import { CampaignCardWrapper, SCTitle } from "@/app/assets/style";
import Link from "next/link";

function CampaignCard({ e }:{e:any}) {
  
  return (
    <Link  href={`${e?.ProductType?.defaultRoute}`}>
      <CampaignCardWrapper $background={e.image}>
        <SCTitle $variant="H24W700">{e.title}</SCTitle>
        <SCTitle $variant="H16W">{e.description}</SCTitle>
        <div className="orderButton">
          <DynamicButton color="#000" backgroundColor="#fff" name="Order Now" />
        </div> 
      </CampaignCardWrapper>
    </Link>
  );
}

export default CampaignCard;
