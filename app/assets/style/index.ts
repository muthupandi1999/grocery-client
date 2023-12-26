"use client";
import { createGlobalStyle, styled } from "styled-components";
//Interface
import {
  CardContainerProps,
  CategoryGridContainerProps,
  CustomAddButtonProps,
  IButton,
  IImgTag,
  SliderImageContainerProps,
  StyleLink,
  VariantProps,
  dropdownListItem,
  sidebarListContainer,
} from "./interface";
//Next Tags
import Image from "next/image";
//Colors
import { white } from "./themeColor";
import { Grid, Popover } from "@mui/material";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
export const GlobalStyle = createGlobalStyle`
    body{
        font-family: 'Open Sans', sans-serif;
        font-size:14px;
    }
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
    h1,h2,h3,h4,h5,h6{
        color:${(props) => props.theme.color.txtPrimary};
        text-transform:capitalize;
    }
    p{
        color:${(props) => props.theme.color.txtSecondary}
    }
    li, button, i, span, a{
      font-family: 'Open Sans', sans-serif;
      text-decoration:none;
      list-style:none;
    }
    button{
      cursor:pointer;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
    .p-Input input {
      border-radius: 25px;
  }
input {
  -moz-appearance: textfield;
  &:-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
    input, button{
        &:focus{
            outline:none;
        }
    }

  .hiddenList{
    display:flex;
    flex-direction:column;
  }


  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }

  
`;
export const ImgTag = styled(Image)<IImgTag>`
  object-position: center;
  display: block;
  ${(props) =>
    props.$imgfit === "cover" &&
    `
    object-fit: cover;
`}
  ${(props) =>
    props.$imgfit === "contain" &&
    `
    object-fit: contain;
`}
`;
export const HTMLImgtag = styled.img`
  width: 100%;
  height: 100%;
`;
export const CustomPTag = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.color.black};
  font-weight: 500;
`;
export const CustomH3 = styled.h3`
  margin-bottom: 8px;
  font-size: 18px;
  color: ${(props) => props.theme.color.black};
`;
export const CustomSpan = styled.span`
  color: ${(props) => props.theme.color.greyprimary};
  padding-bottom: 20px;
`;
export const BreadCrumbsLink = styled(MuiLink)`
  font-size: 12px !important;
`;
export const CustomLinkTag = styled.div<{ variant: string }>`
  text-decoration: underline dotted;
  padding: 5px 0;
  ${(props) =>
    props.variant === "link" &&
    `text-decoration:none; padding:10px 0 ; &:hover{background:${props.theme.background.greyPrimary}};padding:5px 10px;
    cursor:pointer; `}
`;
export const Button = styled.button<IButton>`
  background: ${(props) => props.theme.gradient.primary};
  color: ${white};
  font-weight: 700;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  box-shadow: 0px 5px 10px rgb(33 167 131 / 28%);
  transition-duration: 0.3s;

  .cart-icon {
    &:hover: {
      animation: shake 0.5s;
      animation-iteration-count: 2;
      @keyframes shake {
        0% {
          transform: rotate(0);
        }

        50% {
          transform: rotate(10deg);
        }

        100% {
          transform: rotate(-10deg);
        }
      }
    }
  }
  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.$icon &&
    `
     ${
       props.$icon === "left" &&
       `
        svg{
          margin-right:5px;
        }
     `
     }
     ${
       props.$icon === "right" &&
       `
        svg{
          margin-left:5px;
        }
     `
     }
  `}
`;
export const LogoSec = styled.div`
  ${ImgTag} {
    width: 135px;
    height: 30px;
  }
`;
export const LocationSec = styled.div`
  max-width: 275px;
  min-width: 175px;
  overflow: hidden;

  border-left: 1px solid ${(props) => props.theme.border.primary};
  @media only screen and (max-width: 1000px) {
    border: 0;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 3px;
    @media only screen and (max-width: 350px) {
      font-size: 15px;
    }
  }
  .contentSec {
    display: flex;
    align-items: center;
    .content {
      font-size: 13px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 45px;
  width: 100%;
  max-width: 1120px;
  input {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    border: 1px solid ${(props) => props.theme.border.primary};
    background: ${(props) => props.theme.background.greyPrimary};
    padding-left: 40px;
    &::-webkit-input-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
    &::-moz-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
    &:-ms-input-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
    &:-moz-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
  }
  .searchIcon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
  }
`;
export const SearchSec = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
`;
export const HeaderRightSec = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1020px) {
    justify-content: flex-end;
  }
  @media only screen and (max-width: 1000px) {
    display: none;
  }
  .buttonLink {
    border: none;
    background: unset;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    transition-duration: 0.3s;
    svg {
      margin-right: 5px;
      font-size: 20px;
    }
    &:hover {
      color: ${(props) => props.theme.color.primary};
    }
  }
  button {
    margin-left: 25px;
    margin-right: 25px;
    @media only screen and (max-width: 1300px) {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
  }
  ${LogoSec}, ${LocationSec}, ${SearchSec} {
    padding: 15px 25px;
  }
  ${LocationSec}, ${SearchSec} {
    @media only screen and (max-width: 1300px) {
      padding: 15px 5px;
    }
  }
  ${LogoSec} {
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }
  ${SearchSec} {
    width: 100%;
  }
`;
export const LocationWrapper = styled.div`
display:flex;

align-items-center;
justify-content:space-between;
@media  only screen and (max-width:1000px){
  width:100%;
 }
.login{
  display:none;
@media  only screen and (max-width:1000px){
  display:flex;
  align-items:center;
  justify-content:center;
 }
}
`;
export const HeaderContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: white;
`;
export const ChildContainer = styled.div`
  max-width: 1300px;
  margin: 129px auto 0;

  @media only screen and (max-width: 1300px) {
    padding-right: 0;
    margin: 120px 20px 0 20px;
  }
  @media only screen and (max-width: 1000px) {
    padding-right: 0;
    margin: 185px 20px 0 20px;
  }
`;
export const AccountPopupWrapper = styled.div`
  width: 250px;
  padding: 20px 0;
`;
export const AccountHeader = styled.div`
  margin: 10px;
`;
export const AccountMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  row-gap: 10px;
`;
//category
export const CategoryNavContainer = styled.div`
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0 2px 3px 0 ${(props) => props.theme.shadow.secondary};
  position: fixed;
  top: 82px;
  left: 0;
  right: 0;
  z-index: 2;
  .navList {
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
`;
export const NavListItem = styled.a`
  padding: 14px 13px;
  text-decoration: none;
  color: ${(props) => props.theme.color.greyTertiary};
  text-transform: capitalize;

  &:hover {
    background: ${(props) => props.theme.background.greyPrimary};
  }
`;
export const CategoryHiddenListPopper = styled(Popover)`
  top: 1px;
  overflow: auto;
  .hiddenList {
    width: 200px;
    max-height: 690px;
    overflow: auto;
  }
`;
export const CategoryContainer = styled.div`
  margin-top: 131px;
  display: flex;
  height: 100%;
  position: relative;
  height: 90vh;
  overflow: auto;
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  border-right: 1px solid ${(props) => props.theme.border.primary};

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const CategorySidebarContainer = styled.div`
  width: 350px;
  position: sticky;
  top: 0;

  border-left: 1px solid ${(props) => props.theme.border.primary};
  border-right: 1px solid ${(props) => props.theme.border.primary};
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const SideBarListContainer = styled.div<sidebarListContainer>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$routeId ? props.theme.background.lightGreen : ""};
  border-left: 4px solid
    ${(props) =>
      props.$routeId ? props.theme.background.greenPrimary : "transparent"};
  .img-container {
    width: 48px;
    height: 48px;
    overflow: hidden;
    background-color: #f8f8f8;
    border-radius: 12px;
  }
  .subtitle {
    color: ${(props) => props.theme.color.black};
    font-size: 14px;
    text-transform: capitalize;
  }
`;
export const CategoryContentContainer = styled.div`
  width: 100%;

  .content-header {
    background: white;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: none;
    border-bottom: 1px solid ${(props) => props.theme.border.primary};
    border-left: 1px solid ${(props) => props.theme.border.primary};

    border-right: 1px solid ${(props) => props.theme.border.primary};

    h1 {
      font-size: 16px;
    }
    .sort {
      display: flex;
      align-items: center;
      gap: 15px;
      .dropDown {
        position: relative;

        .select-options {
          background-color: ${(props) => props.theme.color.white};
          position: absolute;
          border: 1px solid ${(props) => props.theme.border.primary};
          width: 100%;
          transition: all 0.5s ease-in-out;
          z-index: 1;
        }
      }
    }
  }
`;
export const DropDownListItem = styled.li<dropdownListItem>`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 1px solid
    ${(props) => (props.$id ? "transparent" : props.theme.border.primary)};
  color: ${(props) => (props.$colorState ? "green" : "")};

  span {
    display: flex;
    alignitems: center;
  }
`;
export const CustomSelectField = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 32px;
  border: 1px solid ${(props) => props.theme.border.primary};
  border-radius: 4px;
  color: ${(props) => props.theme.color.greenPrimary};
  font-weight: 600;
`;
export const CategoryGridContainer = styled.div<CategoryGridContainerProps>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  background-color: ${(props) =>
    props.$showBackground ? props.theme.background.greyPrimary : ""};
  @media only screen and (max-width: 1020px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const SCIMGBOX = styled.div<{ $variant: string }>`
  width: 100%
  height: 100%;
  margin:auto;
  overflow: hidden;
  transition:all .7s ease-in-out;

`;
export const SCIMGTAG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.7s ease-in-out;
`;
export const CardContainer = styled.div<CardContainerProps>`
  width: ${(props) => (props.$slider ? "95%" : "100%")};
  position: relative;

  border: 1px solid #e8e8e8;
  background: white;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 2px 2px 8px;
  gap: 6px;
  display: flex;
  flex-direction: ${(props) =>
    props.$variant?.includes("productCard") ||
    props.$variant?.includes("cartEmptyCard")
      ? "column"
      : "row"};
  opacity: ${(props) => (props.$available ? 0.5 : 1)};
  align-items: ${(props) =>
    props.$variant?.includes("cartEmptyCard") && "center"};
  justify-content: ${(props) =>
    props.$variant?.includes("productCard" || "cartEmptyCard")
      ? "center"
      : "space-between"};
  margin: ${(props) =>
    props.$variant?.includes("productCard")
      ? 0
      : props.$variant?.includes("cartEmptyCard")
      ? "10px"
      : "10px 0"};
  &:hover {
    ${SCIMGTAG} {
      scale: 1.2;
    }
  }
  .img-container {
    display: flex;
    justify-content: center;
    position: relative;
    width: ${(props) =>
      props.$variant?.includes("productCard") ? "100%" : "80px"};
    height: ${(props) =>
      props.$variant?.includes("productCard") ? "100%" : "65px"};
    .img-wrapper {
      width: 100%;

      object-fit: fill;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
  .content-Wrapper {
    padding: 10px;
  }
  .title {
    height: 36px;
    margin: 5px 0;
  }
  .quantity {
    padding: 6px 0;
    margin-bottom: 10px;
  }
  .cardFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export const PriceContainer = styled.div<{
  $offerState: Boolean;
  $variant: string;
}>`
  display: flex;
  align-items: center;

  font-weight: ${(props) => (props.$offerState ? 500 : 600)};
  flex-direction: ${(props) =>
    props.$variant === "variantCard" || props.$variant === "productPage"
      ? "row"
      : "column"};
  column-gap: 10px;
  color: ${(props) =>
    props.$offerState
      ? props.theme.color.greyTertiary
      : props.theme.color.black};
  .price {
    text-decoration: ${(props) =>
      props.$offerState ? "line-through" : "none"};
  }
  .offerPrice {
    color: ${(props) => props.theme.color.black};
    font-weight: 600;
  }
`;
export const VariantContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
export const VariantCardWrapper = styled.div`
  width: 500px;
  padding: 10px;
`;

// expo
export const OutOfStock = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  right: 20%;
  text-align: center;
  background-color: black;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

//products

export const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
  overflow: auto;
  overflow-x: visible;
  &::-webkit-scrollbar {
    width: 0.5em;
  }

  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;
export const ProductLeftSection = styled.div`
  width: 50%;
  height: fit-content;
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  display: flex;
  align-items: center;

  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.border.primary};
  // margin-top: 90px;
  .productViewer {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .slick-prev,
    .slick-next {
      display: block;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
        rgba(0, 0, 0, 0.14) 0px 6px 10px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
      border-radius: 50%;
      width: 34px;
      height: 34px;
    }
    .slick-prev:before,
    .slick-next:before {
      content: "";
    }
    .slick-prev {
      background-image: url(https://cdn-icons-png.flaticon.com/512/271/271220.png);
      left: -50px;
    }

    .slick-arrow.slick-prev.slick-disabled {
      display: none !important;
    }
    .slick-arrow.slick-next.slick-disabled {
      display: none !important;
    }
    .slick-next {
      background-image: url(https://cdn-icons-png.flaticon.com/512/32/32213.png) !important;
    }
    .perimeter {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .image {
      width: 500px;
      height: 500px;

      display: flex;
      gap: 20px;

      align-items: center;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;
export const ProductPriceWrapper = styled.div<{ $discount: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 5px;
  .offerPrice {
    font-weight: 700;
    color: black;
  }
  .price {
    color: ${(props) =>
      props.$discount
        ? props.theme.color.greyPrimary
        : props.theme.color.black};
    span {
      text-decoration: ${(props) =>
        props.$discount ? "line-through" : "none"};
      font-weight: ${(props) => (props.$discount ? 500 : 700)} !important;
    }
  }
  .offerCard {
    font-size: 8px;
    padding: 5px;
    background: #538cee;
    color: white;
    border-radius: 4px;
  }
`;
export const SliderWrapper = styled.div`
  width: 80%;
  height: 100%;
`;
export const SliderImageContainer = styled.div<SliderImageContainerProps>`
  width: 64px !important;
  height: 64px;
  object-fit: fill;
  border-radius: 8px;
  border: ${(props) =>
    props.$imageUrl !== props.$url ? "1px solid #f2f2f2" : "1px solid #0c831f"};

  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
  }
`;
export const DetailsContainer = styled.div`
  max-width: 100%;
  //   margin-left: 20%;
  margin-bottom: 28px;
  border-top: 1px solid #f2f2f2;
  padding-right: 20px;
  .list-container {
    margin: 12px 0;
  }
`;
//login
export const LoginWrapper = styled.div`
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  row-gap: 20px;
  position: relative;
  .back-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .otp-box {
    margin: 5px;
    width: 50px !important;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #ccc;
    &:focus {
      border: 1px solid #999;
    }
  }
  .number_Details {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const LogoImageContainer = styled.div`
  width: 75px;
  height: 75px;
  overflow: hidden;
  border-radius: 12px;
  margin-top: 20px;
`;
export const InputWrapper = styled.div`
  width: 50%;
  border: 1px solid #ccc;
  &:focus {
    border: 1px solid #999;
  }
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
export const CustomInput = styled.input`
  outline: none;
  border: none;
  background: transparent;
  width: 85%;
  padding: 20px 0;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 16px;
  .no-spin::-webkit-inner-spin-button,
  .no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }

  .no-spin {
    -moz-appearance: textfield !important;
  }
`;
export const LoginButton = styled.button`
  width: 50%;
  padding: 20px;
  border-radius: 12px;
  border: none;
  background: ${(props) =>
    props.disabled ? "gray" : props.theme.color.greenPrimary};
  color: ${(props) => props.theme.color.white};
  font-size: 14px;
  font-weight: 600;
`;
export const OTPPageHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0px 0px 8px 0px ${(props) => props.theme.shadow.secondary};
  font-size: 18px;
`;
export const ProductRightSection = styled.div`
  width: 50%;
  position: sticky;
  top: 0;
  padding: 70px 0 0 48px;
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  height: 100%;

  .productInfo {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .viewCategory {
      border-bottom: 1px solid ${(props) => props.theme.border.primary};
      padding: 10px 0 15px 0;
      a {
        color: ${(props) => props.theme.color.greenPrimary};
        font-size: 18px;
        text-decoration: none;
        display: flex;
        align-items: center;
      }
      .right-arrow {
        color: ${(props) => props.theme.color.greenPrimary};
        font-size: 12px;
      }
    }
    .product-info-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .quantity {
        color: #4f4f4f;
        margin: 5px 0;
        font-weight: 600;
        font-size: 12px;
      }
      .price {
        margin: 5px 0;
        font-weight: 500;
        color: ${(props) => props.theme.color.black};
        span {
          font-weight: 700;
        }
      }
    }
  }
  .benefits {
    h4 {
      font-size: 16px;
      color: ${(props) => props.theme.color.black};
      padding-top: 24px;
      margin: 0;
      font-weight: 600;
    }
    .benefitlistContainer {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 20px 0;
      .list-wrapper {
        display: flex;
        .icon {
          margin-right: 20px;
          width: 64px;
          height: 64px;
          object-fit: fill;
          img {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
        .content {
          display: flex;
          justify-content: center;
          flex-direction: column;
          p {
            font-size: 12px;
            color: ${(props) => props.theme.color.black};
            margin-bottom: 4px;
          }
          span {
            font-size: 12px;
            color: ${(props) => props.theme.color.greyTertiary};
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const TitleTag = styled.h3<VariantProps>`
  color: ${(props) => props.theme.color.black};
  font-weight: ${(props) => (props.$variant === "productTitle" ? 700 : 600)};
  font-size: ${(props) =>
    props.$variant === "productTitle"
      ? "24px"
      : props.$variant === "number"
      ? "14px"
      : "18px"};
  text-transform: capitalize;
  padding: ${(props) =>
    props.$variant === "detailsTitle"
      ? " 32px 0 16px"
      : props.$variant === "cardTitle"
      ? "16px 0"
      : 0};
`;
export const ProductTimerCard = styled.div<VariantProps>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 4px 1px;
  border-radius: 4px;
  font-weight: 700;
  color: ${(props) => props.theme.color.black};
  background-color: ${(props) => props.theme.background.greyPrimary};
  font-size: ${(props) => (props.$variant === "forCard" ? "9px" : "12px")};
  width: 70px;
  img {
    width: 11px;
    height: 11px;
  }
`;
export const CustomAddButton = styled.button<CustomAddButtonProps>`
  position: relative;
  font-size: 13px;
  padding: 10px 15px;
  ${(props) => props.$variant === "productCard" && "width:60px;height:33px;"}

  border:1px solid ${(props) =>
    props.hideBackground ? "transparent" : " #318616"};
  border-radius: 6px;
  background-color: ${(props) =>
    !props.hideBackground && props.$count !== 0
      ? props.$disable
        ? "gray"
        : "green"
      : props.$disable
      ? "gray"
      : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.hideBackground ? "black" : props.$count !== 0 ? "white" : "#318616"};
  font-weight: 600;
  gap: 5px;
  transition: all 0.7s;
  &:hover {
    background-color: ${(props) =>
      props.$count === 0 && props.theme.color.greenPrimary};
    color: ${(props) => props.$count === 0 && "white"};
  }
`;
export const ListTitle = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: ${(props) => props.theme.color.black};
  text-transform: capitalize;
  min-height: 36px;
  white-space: wrap;
  width: 80%;
  overflow: hidden;
  max-height: 36px;
  text-overflow: ellipsis;
`;

//home page
export const Wrapper = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

export const CategoryFlexBox = styled.section`
  padding: 20px 0 60px 0;
`;

export const Banner = styled.section`
  background-image: url(https://groca.myshopify.com/cdn/shop/files/slider-3.jpg?v=1614918563);
  background-repeat: no-repeat;
  background-size: cover;
  height: 15rem;
  background-size: cover;
  background-position: 40% 60%;
  border-radius: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media only screen and (max-width: 480px) {
    height: 8rem;
  }
`;

export const BannerInfo = styled.section`
  margin-right: 10px;
`;

export const BannerText = styled.section`
  font-size: 35px;
  font-weight: 700;
  color: #666666;
  padding-bottom: 20px;
  @media only screen and (max-width: 960px) {
    font-size: 25px;
    padding-bottom: 10px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 18px;
    padding-bottom: 10px;
  }
`;

export const BannerSubText = styled.section`
  font-size: 30px;
  color: #64a125;
  padding-bottom: 30px;
  @media only screen and (max-width: 960px) {
    font-size: 20px;
    padding-bottom: 10px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 15px;
    padding-bottom: 15px;
  }
`;

export const CategoryProductSliderWrapper = styled.div`
  .slick-prev,
  .slick-next {
    display: block;
    position: absolute;
    background-size: 15px 15px;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    background-color: white;
  }
  .slick-prev:before,
  .slick-next:before {
    content: "";
  }
  .slick-prev {
    background-image: url(https://cdn-icons-png.flaticon.com/512/271/271220.png);
    left: -8px;
    z-index: 1;
  }

  .slick-arrow.slick-prev.slick-disabled {
    display: none !important;
  }
  .slick-arrow.slick-next.slick-disabled {
    display: none !important;
  }
  .slick-next {
    background-image: url(https://cdn-icons-png.flaticon.com/512/32/32213.png) !important;
    right: -11px;
  }
`;
export const LoaderFlexContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const CategoryListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin-top: 15px;
  gap: 10px;
  @media screen and (max-width: 1020px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SCCategoryImgBox = styled(SCIMGBOX)`
  width: 50px;
  height: 50px;
`;
export const CategoryListWrapper = styled.div<{ $Loader: Boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  margin: 10px 0;

  &:hover {
    ${SCCategoryImgBox} {
      transform: translateY(-20px);
    }
  }
  .img-container {
    border-radius: 16px;
    width: 100%;
    height: 120px;
    overflow: hidden;
    background-color: ${(props) =>
      props.$Loader ? "transparent" : props.theme.background.lightGreen};
    object-fit: fill;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
      height: 80%;
    }
  }
  p {
    text-align: center;
  }
`;
//cards
export const CampaignCardWrapper = styled.section<{ $background: string }>`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 95%;
  height:20vh;
  overflow:hidden;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-size: 100% 100% ;
  background-position: center;
  padding: 20px;
  background-image: ${(props) =>
    props.$background.trim() !== "" ? `url(${props.$background})` : ""};\
    transition:all .7s;
&:hover{
  background-size:130% 130% ;
}
  .orderButton {
    padding: 10px 0;
  }
`;

export const ProductImageContainer = styled.section`
  border: 1px solid rgb(242, 242, 242);
  border-radius: 8px;
  height: 70px;
  width: 70px;
`;
export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;
export const ProductWrapper = styled.section`
  display: flex;
  padding-top: 20px;
  justify-content: flex-start;
  position: relative;
  gap: 20px;
`;

export const ProductInfoDetails = styled.section`
  padding: 0;
  width: 70%;
`;

export const AddToCartButton = styled.section`
  cursor: pointer;
  width: 66px;
  border: 1px solid rgb(49, 134, 22);
  height: 31px;
  font-weight: 600;
  font-size: 13px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  background-color: #318616;
  color: rgb(255, 255, 255);
  justify-content: space-between;
  padding: 6px;
  position: absolute;
  top: 40%;
  right: 0;
`;

export const CaregoryCardWrapper = styled.section`
  margin: 30px 0;
  background: #f0f8ff;
  width: 94%;
  border-radius: 30px;
  .categoryText {
    font-size: 14px;
    text-align: center;
    width: 90%;
    line-height: 16px;
    font-weight: 600;
    margin: auto;
    word-wrap: break-word;
    min-height: 52px;
    padding: 10px 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: none;
  }
`;
//offer
export const OfferTagWrapper = styled.section`
  position: absolute;
  left: 10%;
  top: 0;
`;

export const OfferText = styled.text`
  color: #fff;
  font-size: 8px;
  position: absolute;
  left: 0%;
  top: 13%;
  text-align: center;
  width: 100%;
`;
//footer
export const FooterContainer = styled(Grid)`
  span {
    background-repeat: repeat-x;
    width: calc(100% + 800px);
    margin: auto;
    background-image: url(https://grostore.themetags.com/public/frontend/default/assets/img/shapes/section-curve.png?v=v3.0.0);
    -webkit-animation: 25s curve_wave infinite linear alternate;
    animation: 25s curve_wave infinite linear alternate;
    border-bottom: 1px solid #666666;

    @keyframes curve_wave {
      0% {
        background-position: 100% 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    height: 140px;
  }

  .footerSecContainer {
    background-color: #191d28;
    width: 100%;
    position: relative;
    .tomatoAnimation {
      position: absolute;
      left: 60px;
      top: 50px;
      -webkit-animation: 6s upsdown_animation infinite;
      animation: 6s upsdown_animation infinite;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    @keyframes upsdown_animation {
      0% {
        top: 25px;
      }
      25% {
        top: 50px;
      }
      50% {
        top: 75px;
      }

      100% {
        top: 50px;
      }
    }

    .animation2 {
      position: absolute;
      left: 150px;
      top: 180px;
      -webkit-animation: 6s moving-x-animation infinite;
      animation: 6s moving-x-animation infinite;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    @keyframes moving-x-animation {
      0% {
        left: 100px;
      }
      25% {
        left: 150px;
      }
      50% {
        left: 200px;
      }

      100% {
        left: 150px;
      }
    }

    .animation3 {
      position: absolute;
      left: 50px;
      top: 300px;
      -webkit-animation: 5s upsdown_animation1 linear infinite;
      animation: 5s upsdown_animation1 linear infinite;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    @keyframes upsdown_animation1 {
      0% {
        top: 250px;
      }
      25% {
        top: 300px;
      }
      50% {
        top: 350px;
      }

      100% {
        top: 300px;
      }
    }

    .animation4 {
      position: absolute;
      left: 130px;
      top: 50%;
      -webkit-animation: 6s upsdown_animation2 infinite;
      animation: 6s upsdown_animation2 infinite;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    @keyframes upsdown_animation2 {
      0% {
        top: 40%;
      }
      25% {
        top: 50%;
      }
      50% {
        top: 60%;
      }

      100% {
        top: 50%;
      }
    }

    .animation5 {
      position: absolute;
      bottom: 40px;
      left: 40px;
      -webkit-animation: 8s rotate_animation infinite linear;
      animation: 8s rotate_animation infinite linear;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    @keyframes rotate_animation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .animation6 {
      position: absolute;
      right: 100px;
      top: 130px;
      -webkit-animation: 12s rotate_animation infinite linear;
      animation: 12s rotate_animation infinite linear;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    @keyframes rotate_animation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .animation7 {
      position: absolute;
      right: 50px;
      top: 300px;
      -webkit-animation: 5s upsdown_animation1 linear infinite;
      animation: 5s upsdown_animation1 linear infinite;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    .animation8 {
      position: absolute;
      right: 200px;
      top: 50%;
      -webkit-animation: 6s upsdown_animation2 linear infinite;
      animation: 6s upsdown_animation2 linear infinite;
      overflow-clip-margin: content-box;
      overflow: clip;
    }

    .animation9 {
      position: absolute;
      bottom: 80px;
      right: 110px;
      -webkit-animation: 6s moving-x-animation linear infinite;
      animation: 6s moving-x-animation linear infinite;
      overflow-clip-margin: content-box;
      overflow: clip;
    }


    
    @keyframes moving-x-animation {
      0% {
        right: 100px;
      }
      25% {
        right: 150px;
      }
      50% {
        right: 200px;
      }

      100% {
        right: 150px;
      }
    }

   

    .footerSection {
      max-width: 1300px;
      margin: auto;
      color: #fff !important;
    }
  }

  .subscripe {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 20px;
    color: #fff;
  }
  .subscripeInput {
    position: relative;
    input {
      border: 0.4px solid #e6e6e6;
      padding: 10px;
      border-radius: 4px;
      width: 100%;
    }
    .subscripeIcon {
      position: absolute;
      right: 1.1%;
      font-size: 31px;
      top: 7%;
      background: #adadad;
      padding: 6px;
      color: #fff;
    }
  }
  .followUs {
    padding-top: 20px;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
  }
  .followIcons {
    text-align: center;
    padding-top: 20px;
    .Icon {
      margin: 0 10px;
      color: #fff;
    }
  }
`;
export const StyledLink = styled.li<StyleLink>`
  font-size: ${(props) => (props.variant === "categoryLink" ? "16px" : "14px")};
  text-transform: capitalize;
  margin: 5px 0;
  color: ${(props: any) => props.theme.color.white};
  padding: 3px 0;
  width: 80%;
  line-height: 26px;
`;
export const LinksTitleTag = styled.h3`
  color: ${(props) => props.theme.color.black};
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 12px;
  width: fit-content;
  span {
    color: ${(props: any) => props.theme.color.greenPrimary};
    margin-left: 20px;
    text-transform: lowercase;
  }
`;
export const DisableText = styled.p`
  color: ${(props) => props.theme.color.greyTertiary};
  font-size: 14px;
  padding: 20px 0;
`;

export const SeeAllText = styled.div`
  line-height: 32px;
  font-size: 20px;
  color: rgb(12, 131, 31);
  padding: 16px 0;
  cursor: pointer;
`;
//search
export const Showresults = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.color.black};
  padding: 0 10px;
`;
export let Container = styled.section`
  max-width: 1280px;
  margin: 20px auto;
`;
export const FlexBox = styled.section<{ $variant: string; $disable?: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props?.$variant?.includes("between")
      ? "space-between"
      : props?.$variant?.includes("center")
      ? "center"
      : props?.$variant?.includes("end")
      ? "flex-end"
      : "flex-start"};
  align-items: ${(props) =>
    props.$variant.includes("align-c") ? "center" : "start"};
  width: 100%;
  margin: ${(props) => (props.$variant.includes("PAD") ? "15px 0" : 0)};
  background-color: ${(props) =>
    props.$variant?.includes("white")
      ? props.theme.color.white
      : props.$variant?.includes("gray")
      ? props.theme.color.greyPrimary
      : props.$variant?.includes("light-green")
      ? props.theme.background.lightGreen
      : "transparent"};
  padding: ${(props) =>
    props.$variant.includes("P20")
      ? "20px"
      : props.$variant.includes("P-10-0")
      ? " 10px 0"
      : 0};
  column-gap: ${(props) => (props.$variant.includes("start") ? "10px" : 0)};
  position: ${(props) =>
    props.$variant.includes("sticky") ? "sticky" : "relative"};
  top: ${(props) =>
    props.$variant.includes("sticky0")
      ? 0
      : props.$variant.includes("sticky90")
      ? "94vh"
      : 0};
  bottom: ${(props) => props.$variant.includes("sticky") && 0};
  z-index: ${(props) => props.$variant.includes("sticky") && 1};
`;
//cartLoader
export const FlexButton = styled(FlexBox)`
  background: ${(props) =>
    !props?.$disable
      ? props.theme.color.greenPrimary
      : props.theme.color.greyTertiary};
`;
export const CartLoaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 10;
`;
export const CartLoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  border: 2px solid #f3f3f3;
  border-radius: 50%;

  border-right: 2px solid green;
  border-bottom: 2px solid green;
  border-left: 2px solid green;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const VariantWrapper = styled.div`
width:100%;
padding: 5px 10px ;
border:1px solid  #eee ;
border-radius:4px;
display:flex;
align-items-center;
justify-content:space-between;
margin-bottom:10px;
`;

//new
export const SCTitle = styled.h3<{ $variant: string }>`
  cursor: pointer;
  font-weight: ${(props) =>
    props.$variant.includes("700")
      ? 700
      : props.$variant.includes("600")
      ? 600
      : props.$variant.includes("500")
      ? 500
      : 400};
  font-size: ${(props) =>
    props.$variant.includes("H24")
      ? "24px"
      : props.$variant.includes("H16")
      ? "16px"
      : props.$variant.includes("H14")
      ? "14px"
      : props.$variant.includes("H13")
      ? "13px"
      : props.$variant.includes("H12")
      ? "12px"
      : "18px"};
  color: ${(props) =>
    props.$variant.includes("W")
      ? props.theme.color.white
      : props.$variant.includes("H16CAT")
      ? props.theme.color.black
      : props.$variant.includes("UNIT")
      ? props?.theme?.color?.greyTertiary
      : props.theme.color.black};
  text-align: ${(props) =>
    props.$variant.includes("H16CAT") ? "center" : "left"};
  text-decoration: ${(props) =>
    props?.$variant.includes("STRIKED") ? "line-through" : "none"};
  padding: ${(props) =>
    props.$variant.includes("NAV")
      ? "14px 13px "
      : props.$variant.includes("32 0 16")
      ? "32px 0 16px"
      : props.$variant.includes("15 0")
      ? "15px 0"
      : props.$variant.includes("0 0 8")
      ? "0 0 8px"
      : (props) => (props.$variant.includes("P12") ? "12px" : 0)};
`;

export const SCLINK = styled(Link)<{ $variant: string }>`
  font-size: ${(props) =>
    props?.$variant.includes("A20")
      ? "20px"
      : props?.$variant.includes("A14")
      ? "14px"
      : props?.$variant.includes("A12")
      ? "12px"
      : "16px"};
  color: ${(props) =>
    props.$variant.includes("GR")
      ? props.theme.color.greenPrimary
      : props.theme.color.greyTertiary};
  font-weight: ${(props) => (props.$variant.includes("600") ? 600 : 400)};
  text-transform: ${(props) =>
    props.$variant.includes("CAPS") ? "capitalize" : "lowercase"};
  cursor: pointer;
  ${(props) =>
    props?.$variant.includes("Hover") &&
    `&:hover{
    color:green;
    transition:color .7s ease-in-out;
    font-weight:600
  }`}
`;

export const OfferPriceHolder = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: ${(props) =>
    props.$variant.includes("productCard") ? "column" : "row"};
  align-items: center;
  column-gap: 5px;
`;
export const VariantSelector = styled.div<{ $selectedVariant: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid
    ${(props) =>
      props.$selectedVariant
        ? props.theme.color.greenPrimary
        : props.theme.color.txtTertiary};
  background-color: ${(props) =>
    props.$selectedVariant ? props.theme.background.lightGreen : "transparent"};
  width: 130px;
  padding: 10px;
  border-radius: 12px;
  row-gap: 5px;
`;
export const VariantSelectorContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;
export const VariantSelectorOfferCardWrapper = styled.span`
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translate(-50%, 0);
  span {
    position: absolute;
    top: 0;
    font-size: 9px;
    color: white;
    left: 50%;
    transform: translate(-50%, 0);
    width: 52%;
  }
`;
export const SCContainer = styled.div<{ $variant: string }>`
  padding: ${(props) =>
    props.$variant.includes("p010")
      ? "0 10px"
      : props.$variant.includes("p-5-0")
      ? "5px 0"
      : props.$variant.includes("p15")
      ? "15px"
      : props.$variant.includes("p-15-0")
      ? "15px 0"
      : 0};
  width: ${(props) =>
    props.$variant.includes("w-4/5")
      ? "80%"
      : props.$variant.includes("w-3/5")
      ? "60%"
      : props.$variant.includes("w-2/5")
      ? "40%"
      : props.$variant.includes("w-full")
      ? "100%"
      : props.$variant.includes("w-1/5")
      ? "20%"
      : props.$variant.includes("w-1/2")
      ? "50%"
      : props.$variant.includes("w-3/10")
      ? "30%"
      : ""};
  background-color: ${(props) =>
    props.$variant?.includes("bg-gray") ? "#f8f8f8" : "transparent"};
`;
export const BorderLessInput = styled.input`
  border: none;
  width: 100%;
  padding: 10px 0;
  background: transparent;
  caret-color: rgb(0, 0, 0, 0.4);
  font-size: 16px;
  font-weight: 600;
  opacity: 0.6;
`;
export const CheckoutBtn = styled.button`
  display: flex;
  width: 100%;
  background: ${(props) => props.theme.background.greenPrimary};
  padding: 20px;
  margin: 50px 0;
  border-radius: 12px;
  border: none;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
  justify-content: center;
  transition: all 0.7s;
  &:hover {
    background: ${(props) => props.theme.color.greyTertiary};
  }
`;
export const SCScrollBox = styled.div<{ $boxHeight: string }>`
  max-height: ${(props) => (props.$boxHeight ? props.$boxHeight : "100%")};
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FooterAbout = styled.div`
  padding: 50px 0;
  display: grid;
  max-width: 1300px;
  margin: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    .col {
      margin: 0 10px;
    }
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    .col {
      margin: 0 10px;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    .col {
      margin: 0 10px;
    }
  }
  .col {
    border: 1px solid #e8e8e8;
    padding: 20px 10px;
    border-radius: 12px;
  }
  .footerAboutContainer {
    display: flex;
    align-items: flex-start;
  }
  .footerAboutContainerDetails {
    display: flex;
    flex-direction: column;
    h5 {
      font-size: 16px;
      padding-bottom: 12px;
      font-weight: 600;
    }
    p {
      line-height: 25px;
      font-size: 14px;
    }
  }

  .footerAboutIcon {
    margin: 0 12px;
  }
`;

export const Rights = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #fff;
  max-width: 1440px;
  margin: auto;
  padding: 10px 0px;
  border-top: 1px solid #d8d8d8 .Icon {
    margin: 0 4px;
    cursor: pointer;
  }
`;
