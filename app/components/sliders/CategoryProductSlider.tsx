import CampaignCard from "@/app/components/cards/CampaignCard";
import { CampaignSliderSettings } from "@/app/utils/data";
import Slider from "react-slick";
import React from "react";
import { CategoryProductSliderWrapper } from "@/app/assets/style";

function CategoryProductSlider({ settings, children }:any) {
  return (
    <CategoryProductSliderWrapper>
      <Slider {...settings}>{children}</Slider>
    </CategoryProductSliderWrapper>
  );
}

export default CategoryProductSlider;
