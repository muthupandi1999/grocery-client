import { Text } from "@/app/assets/style/dynamicButton";
import React from "react";
import { styled } from "styled-components";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import SearchIcon from "@mui/icons-material/Search";
export const PopularCardWrapper = styled.div`

  padding: 25px;
 
  position: relative;
  background-color: #fff;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  transition: all 0.21s ease-in-out;
  cursor:pointer;
  &:hover{
    box-shadow: 0 5px 15px rgba(0,0,0,5%);
  }
  &:hover .flexBox .productImage img{
    transform: scale(1.1);
  }
  .flexBox {
    display: flex;
    align-items: start;
    justify-content: space-evenly;
    .productImage {
        img {
            transform: scale(1);
            transition: transform 1s ease-in-out;
        }
    }
    .rating {
      display: flex;
      align-items: center;
      .ratingIcon {
        font-size: 23px;
        color: #f8c519;
        padding-right: 3px;
      }
      span {
        color: #666666;
      }
    }
  }
  .offerTag {
    position: absolute;
    right: 27%;
    top: 31%;
    clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%);
    background-color: #e00000;
    color: #fff;
    height: 18px;
    line-height: 1;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 8px;
  }
  .options {
    position: absolute;
    right: 4%;
    top: 10%;
    .searchIcon {
        font-size: 24px;
        color: #666666;
        opacity: 0.5;
    }
    .tooltip {
        display:none;
        position: absolute;
        background-color: green;
        color: white;
        padding: 5px;
        border-radius: 5px;
        top: 0px;
        right: 100%;
        width: 69px;
        font-size: 10px;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 100%, 50% 130%, 30% 100%, 0 100%);
    }
    &:hover .tooltip{
        display: block;
    }
   
   
      
  }
  
}
`;

function PopuplarProductCard() {
  return (
    <PopularCardWrapper>
      <div className="flexBox">
        <div className="productImage">
          <img
            src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/product_24-100x100.png"
            alt=""
          />
        </div>
        <div>
          <Text fontSize="13px" padding="0 0 7px 0">
            Fresh Fruits
          </Text>
          <Text color="#000" fontWeight="700" padding="0 0 7px 0">
            $48.00
          </Text>
          <Text color="#000" padding="0 0 7px 0">
            Gala Original Apple
          </Text>
          <div className="rating">
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
          </div>
        </div>
      </div>
      <p className="offerTag">10%</p>
      <div className="options">
        <SearchIcon className="searchIcon" />
        <p className="tooltip">Quick view</p>
      </div>
    </PopularCardWrapper>
  );
}

export default PopuplarProductCard;
