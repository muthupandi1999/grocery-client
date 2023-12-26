import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderImageContainer, SliderWrapper } from "../../../assets/style";
import { IImageSliderProps } from "@/app/assets/style/interface";

export default function SimpleSlider({
  setImage,
  image,
  imagesArr,
}: IImageSliderProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipe: false,
  };
  return (
    <SliderWrapper>
      <Slider {...settings}>
        {imagesArr?.map((data, index) => (
          <SliderImageContainer
            key={index}
            $imageUrl={image}
            $url={data}
            onClick={() => setImage(data)}
          >
            <img src={`${data}`} alt="tyy" />
          </SliderImageContainer>
        ))}
      </Slider>
    </SliderWrapper>
  );
}
