"use client"
import React from "react";
import DynamicButton from "@/app/components/buttons/DynamicButton";
import { CampaignCardWrapper } from "@/app/assets/style";
import { useRouter } from "next/navigation";


function CampaignCard({ e }: Readonly<{ e: any }>) {
  const router = useRouter()
  return (
    <CampaignCardWrapper  onClick={() => router.push(e?.ProductType?.defaultRoute)}  style={{ backgroundImage: `url(${e.image})` }}>
      <h4 color={e.color}>{e.title}</h4>
      <h5 color={e.color}>{e.description}</h5>
      <div className="orderButton">
        <DynamicButton color="#000" backgroundColor="#fff" name="Order Now" />
      </div>
    </CampaignCardWrapper>
  );
}

export default CampaignCard;
