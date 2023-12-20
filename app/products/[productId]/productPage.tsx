"use client";
import React from "react";
import { styled } from "styled-components";
import OpenWithSharpIcon from "@mui/icons-material/OpenWithSharp";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { AddButton } from "@/app/components/buttons/Buttons";
export const ProductPageWrapper = styled.div`
  padding: 60px 0;
  display: flex;
  justify-content: space-between;
  .productImage {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 25%;
    border: 1px solid #dcdcdce3;
    .expandIcon {
      position: absolute;
      right: 3%;
      top: 3%;
      font-size: 28px;
      border: 1px solid #b7b7b7;
      padding: 6px;
      background: #b7b7b7;
      color: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .productDetailContainer {
    padding: 20px 40px;
    .top1 {
      padding-bottom: 20px;
      border-bottom: 1px solid #d7d7d7;
      .productName {
        padding: 0 0 20px 0;
        font-size: 42px;
        font-weight: 600;
      }
      .rating {
        padding-bottom: 20px;
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
    .top2 {
      .description {
        padding: 20px 0;
        font-size: 16px;
        width: 70%;
        color: #666666;
        font-weight: 500;
      }
      .productProperties {
        padding-inline-start: 40px;
        padding-bottom: 10px;
        li {
          list-style: disc;
          color: #666666;
          font-size: 15px;
          padding-bottom: 10px;
          font-weight: 500;
        }
      }
      .priceDetails {
        display: flex;
        width: 60%;
        align-items: center;

        .productPrize {
          padding-bottom: 20px;
          font-size: 20px;
        }
        .hurryInfo {
          color: red;
          padding-bottom: 10px;
        }
        .priceInfo {
          width: 60%;
        }
      }
    }
  }
  .deliveryBox {
    width: 30%;
    .deliveryContainer {
      background-color: #f7f7f7;
      border-radius: 8px;
      padding: 30px;
      ul {
        li {
          display: flex;
          gap: 20px;
          padding: 7px 0;
          line-height: 22px;
        }
      }
    }
  }
`;

function ProductPage() {
  return (
    <ProductPageWrapper>
      <div className="productImage">
        <img
          src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/product_24.png"
          alt=""
        />
        <OpenWithSharpIcon className="expandIcon" />
      </div>
      <div className="productDetailContainer">
        <div className="top1">
          <h4 className="productName">Gala Orinal Apple</h4>
          <div className="rating">
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
            <StarPurple500SharpIcon className="ratingIcon" />
            <span>(1 customer Review)</span>
          </div>
        </div>
        <div className="top2">
          <h3 className="description">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor.
          </h3>
          <ul className="productProperties">
            <li>Pellentesque habitant tristique senectus</li>
            <li>Turpis egestaVestibulum tortor quam</li>
            <li>Eugiat vitae ultricies eget tempor</li>
          </ul>
          <div className="priceDetails">
            <div className="priceInfo">
              <h3 className="productPrize">$48.00</h3>
              <h4 className="hurryInfo">Hurry Up! Sales Ends In:</h4>
            </div>
            <AddButton />
          </div>
        </div>
      </div>
      <div className="deliveryBox">
        <div className="deliveryContainer">
          <ul>
            <li>
              <img
                width={"24px"}
                height={"24px"}
                alt=""
                src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/shipping_car.svg"
              />
              Free worldwide shipping on all orders over $100
            </li>
            <li>
              <img
                width={"24px"}
                height={"24px"}
                alt=""
                src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/bean.svg"
              />
              Guranteed 100% Organic from natural farmas
            </li>
            <li>
              <img
                width={"24px"}
                height={"24px"}
                alt=""
                src="https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2023/11/round_arrow.svg"
              />
              1 Day Returns if you change your mind
            </li>
          </ul>
        </div>
      </div>
    </ProductPageWrapper>
  );
}

export default ProductPage;
