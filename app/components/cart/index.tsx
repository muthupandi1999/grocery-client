import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CartProductCart from "../cards/CartProductCard";
import CloseIcon from "@mui/icons-material/Close";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { fetchCartItems } from "../../service/api/data";
import { GoChevronRight } from "react-icons/go";
import Nocart from "../cards/nocart";
import CartLoader from "@/app/Loading UI/cartLoader";
import { globalContext } from "@/app/utils/states";
import { MyContext } from "@/app/myContext";
import {
  FlexBox,
  FlexButton,
  SCContainer,
  SCLINK,
  SCScrollBox,
  SCTitle,
} from "@/app/assets/style";
import { IoIosArrowBack } from "react-icons/io";
import CustomRadio from "../elements/radio";
import { BsThreeDots } from "react-icons/bs";
import { getAddressByUserId } from "@/app/service/query";
import { useMutation, useQuery } from "@apollo/client";
import { USER_ID } from "@/app/utils/variables";
import {
  setClientSecret,
  setDeliverDetails,
  setOrderDetails,
} from "@/app/myContext/action";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { getClientSecret } from "@/app/service/mutation";
import { CartTotalAmount, CartTotalItems, SetCartArrFunc } from "@/app/helperFunctions";
export const Text = styled.h1`
  margin: 0;
  font-size: ${(props: any) => props.fontSize || "15px"};
  color: ${(props: any) => props.color || "#000"};
  padding: ${(props: any) => props.padding || "0"};
  font-weight: ${(props: any) => props.fontWeight || 700};
`;

export const SubText = styled.h1`
  margin: 0;
  font-size: ${(props: any) => props.fontSize || "12px"};
  color: ${(props: any) => props.color || "#666666"};
  padding: ${(props: any) => props.padding || "0"};
  font-weight: ${(props: any) => props.fontWeight || "normal"};
  line-height: 16px;
`;

export const BlockDiv = styled.section`
  display: block;
`;

const TitleWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 18px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 5;
`;

const Container = styled.section`
  background: #f5f7fc;
  position: relative;
  height: 100vh;
`;

const CartWrapper = styled.section`
  padding: 0 12px;
  background: #fff;
  margin: 12px;
  border-radius: 10px;
  padding: 12px 12px;
`;

const BillWrapper = styled.section`
  margin: 12px 12px 0 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px 10px 0 0;
`;

const ProductSuggestWrapper = styled.section`
  margin: 12px 12px 0 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px 10px 0 0;
`;
const PolicyWrapper = styled.section`
  margin: 12px 12px 0 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
`;

const ProceedButton = styled.section`
  background-color: #318616;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProceedWrapper = styled.section`
  padding: 12px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  background: #fff;
  color: #fff;
  position: sticky;
  top: 91vh;
  bottom: 0;

  z-index: 5;
`;

const BillFlex = styled.section`
  display: flex;
  justify-content: space-between;
`;

const DeliveryImage = styled.img`
  width: 48px;
  height: 48px;
`;

const DeliveryInfo = styled.section`
  padding-left: 16px;
`;
const FlexObject = styled.section`
  display: flex;
`;

const DeliveryImageContainer = styled.section`
  background: linear-gradient(
      to right,
      rgb(248, 248, 248) 0%,
      rgb(255, 255, 255) 10%,
      rgb(248, 248, 248) 40%,
      rgb(248, 248, 248) 100%
    )
    no-repeat rgb(248, 248, 248);
  opacity: 1;
  transition: opacity 0.25s ease-out 0s;
  will-change: opacity;
  border-radius: inherit;
  animation: 1.5s linear 0s infinite normal forwards running cypEgR;
`;

const DrawerBox = styled.section`
  width: 400px;
  @media (max-width: 425px) {
    width: 320px !important;
  }
`;

const WrapperBillText = styled.section`
  padding-bottom: 4px;
`;

const CouponNote = styled.section`
  color: rgb(130, 130, 130);
  padding: 8px 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: rgb(252, 252, 252);
  font-weight: 500;
  margin: 0 12px;
`;

export const CartDrawer = (props: any) => {
  const { open, onClose, openLogin, cartLoader } = props;
  const [userDetailsWithAddress, setUserDetailsWithAddress] = useState({});
  const router = useRouter();
  const [currentCartItems, setCurrentCartItems] = useState([]);
  const [billDetails, setBillDetails] = useState({
    subTotal: 0,
    deliveryFee: 0,
    totalAmount: 0,
  });
  const {
    authStatus,
    dispatch,
    deliverDetails,
    cartItems,
    orderAddress,
  } = useContext(MyContext);
  const [addressPage, setAddressPage] = useState(false);
  const [selectAddress, setSelectAddress] = useState(null);

  const { data: userAddress, refetch: refetchAddress } = useQuery(
    getAddressByUserId,
    {
      variables: {
        userId: USER_ID,
      },
      onCompleted(data) {
        setUserDetailsWithAddress(data?.getUserById);
      },
      fetchPolicy: "no-cache",
    }
  );

  console.log("userAddress", userAddress, userDetailsWithAddress);

  const handleSelectAddress = (data) => {
    setDeliverDetails(dispatch, data);
  };

  console.log("deliverDetails", deliverDetails);
  useEffect(() => {
    setSelectAddress(deliverDetails);
    localStorage.setItem(
      "selectedAddress",
      JSON.stringify({
        address: deliverDetails?.address,
        apartment: deliverDetails?.apartment,
        label: deliverDetails?.label,
        pincode: deliverDetails?.pincode,
      })
    );
  }, [addressPage]);
  console.log("EEE", cartItems);
  useEffect(() => {
    let findCurrent = cartItems?.filter((data) => data?.quantity > 0);
    setCurrentCartItems(findCurrent);

    setBillDetails((prev) => ({
      ...prev,
      subTotal: CartTotalAmount(cartItems),
      deliveryFee: 0,
      totalAmount: prev?.subTotal
        ? prev?.subTotal
        : 0 + prev?.deliveryFee
        ? prev?.deliveryFee
        : 0,
    }));
  }, [cartItems, billDetails.subTotal]);
  return (
    <DrawerBox style={{ width: "400px" }}>
      <Container>
        <FlexBox
          $variant={
            addressPage ? "startwhiteP20sticky0" : "betweenwhiteP20sticky0"
          }
        >
          {addressPage && (
            <span
              onClick={() => {
                setAddressPage(false);
              }}
            >
              <IoIosArrowBack size={20} />
            </span>
          )}
          <SCTitle $variant="16700">
            {addressPage ? "My Address" : "My Cart"}
          </SCTitle>
          {!addressPage && (
            <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
          )}
        </FlexBox>

        {cartLoader ? (
          <CartLoader />
        ) : currentCartItems?.length === 0 ? (
          <Nocart open={open} onClose={onClose} />
        ) : !addressPage ? (
          <>
            <SCScrollBox
              $boxHeight={!authStatus || !deliverDetails ? "83vh" : "78vh"}
            >
              <CartWrapper>
                <FlexObject>
                  <DeliveryImageContainer>
                    <DeliveryImage src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/assets/eta-icons/15-mins-filled.png"></DeliveryImage>
                  </DeliveryImageContainer>
                  <DeliveryInfo>
                    <Text
                      fontSize="15px"
                      fontWeight={700}
                      color="#000"
                      padding="0 0 4px 0"
                    >
                      Delivery in 9 minutes
                    </Text>
                    <SubText>Shipment of {CartTotalItems(cartItems)} items</SubText>
                  </DeliveryInfo>
                </FlexObject>
                {cartItems?.map(
                  (e: any) =>
                    e?.quantity > 0 && <CartProductCart key={e.id} e={e} onClose={onClose} />
                )}
              </CartWrapper>
              <BillWrapper>
                <Text padding="0 0 12px 0">Bill Details</Text>
                <WrapperBillText>
                  <BillFlex>
                    <SubText>Item Total </SubText>
                    <SubText>₹ {billDetails.subTotal}</SubText>
                  </BillFlex>
                </WrapperBillText>

                <WrapperBillText>
                  <BillFlex>
                    <SubText>Delivery Charge</SubText>
                    <SubText>₹{billDetails.deliveryFee}</SubText>
                  </BillFlex>
                </WrapperBillText>

                <BillFlex style={{ paddingTop: "8px" }}>
                  <SubText fontSize="14px" color="#000" fontWeight={500}>
                    Grand Total
                  </SubText>
                  <SubText fontSize="14px" color="#000" fontWeight={500}>
                    ₹{billDetails.totalAmount}
                  </SubText>
                </BillFlex>
              </BillWrapper>
              <CouponNote>
                <SubText>
                  Coupons are only applicable on the Blinkit app
                </SubText>
              </CouponNote>

              {/* <ProductSuggestWrapper>
          <Text padding="0 0 15px 0">Before you checkout</Text>

          <Slider className="addToCartSlider" {...AddToCartProductSliderSettings}>
             {FreshVegetables.products.map((product: any) => (
              <ProductCard key={product.id} e={product} />
            ))} 
          </Slider>
        </ProductSuggestWrapper> */}

              <PolicyWrapper>
                <Text padding="0 0 8px 0">Cancellation Policy</Text>
                <SubText fontWeight={500}>
                  Orders cannot be cancelled once packed for delivery. In case
                  of unexpected delays, a refund will be provided, if
                  applicable.
                </SubText>
              </PolicyWrapper>
            </SCScrollBox>
            <ProceedWrapper>
              {authStatus && deliverDetails && (
                <FlexBox $disable={null} $variant="align-cP-10-0">
                  <SCContainer $variant="p010">
                    <HiOutlineLocationMarker color="gray" size={20} />
                  </SCContainer>
                  <SCContainer $variant="w-4/5">
                    <SCTitle $variant="H13700">
                      Delivering to {deliverDetails?.label}
                    </SCTitle>
                    <SCTitle $variant="H12600Unit">
                      {deliverDetails?.address}
                    </SCTitle>
                  </SCContainer>
                  <SCContainer
                    onClick={() => {
                      setAddressPage(true);
                    }}
                    $variant=""
                  >
                    <SCLINK
                      onClick={() => refetchAddress()}
                      $variant="GRA14600"
                      href={""}
                    >
                      change
                    </SCLINK>
                  </SCContainer>
                </FlexBox>
              )}

              <ProceedButton
                onClick={() => {
                  if (authStatus && deliverDetails) {
                    router.push("/checkout");
                    onClose();
                  } else if (authStatus) {
                    setAddressPage(true);
                  } else {
                    openLogin();
                  }
                }}
              >
                <BlockDiv>
                  <Text fontSize="15px" fontWeight={500} color="#fff">
                    ₹{billDetails.totalAmount}
                  </Text>
                  <SubText
                    style={{ opacity: 0.8 }}
                    fontSize="11px"
                    color="#fff"
                    fontWeight={400}
                    padding="4px 0 0 0"
                  >
                    TOTAL
                  </SubText>
                </BlockDiv>
                <BlockDiv style={{ display: "flex", alignItems: "center" }}>
                  <Text fontSize="16px" fontWeight={400} color="#fff">
                    {authStatus && deliverDetails
                      ? "Proceed to pay "
                      : authStatus
                      ? "Proceed"
                      : "Login To Proceed"}
                  </Text>
                  <GoChevronRight size={20} />
                </BlockDiv>
              </ProceedButton>
            </ProceedWrapper>
          </>
        ) : (
          <>
            <FlexBox $variant="P20grayalign-c">
              <SCTitle $variant="H13UNIT">Choose Delivery Address</SCTitle>
            </FlexBox>
            {userDetailsWithAddress?.Address?.map((address) => (
              <FlexBox $variant="P20whitestart">
                <SCContainer
                  onClick={() => setSelectAddress(address)}
                  $variant="p-5-0"
                >
                  <CustomRadio
                    value={address?.id === selectAddress?.id}
                    size={20}
                  />
                </SCContainer>
                <SCContainer $variant="w-4/5">
                  <SCTitle $variant="H16000 0 8">{address?.label}</SCTitle>
                  <SCTitle $variant="H12UNIT500">{`${
                    userDetailsWithAddress?.firstName +
                    userDetailsWithAddress?.lastName
                  }`}</SCTitle>
                  <SCTitle $variant="H12UNIT500">{address?.address}</SCTitle>
                </SCContainer>
                <SCContainer $variant="p-5-0">
                  <BsThreeDots size={20} />
                </SCContainer>
              </FlexBox>
            ))}
            <FlexButton
              onClick={() => {
                if (selectAddress) {
                  setAddressPage(false);
                }
                handleSelectAddress(selectAddress);
              }}
              $disable={!selectAddress}
              $variant="P20centeralign-csticky"
            >
              <SCTitle $variant="H16600W">Done</SCTitle>
            </FlexButton>
          </>
        )}
      </Container>
    </DrawerBox>
  );
};

CartDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartDrawer;
