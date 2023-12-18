import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { styled } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { getOrder } from "@/app/service/query";
const OrderCardWrapper = styled.div`
  max-width: 754px;
  width: 754px;
  padding: 32px;
  @media only screen and (max-width: 1440) {
    width: 654px;
  }
  @media only screen and (max-width: 1024) {
    width: 554px;
  }
  @media only screen and (max-width: 768) {
    width: 425px;
  }
  @media only screen and (max-width: 425) {
    width: 320px;
  }
  .orderIdText {
    display: flex;
    align-items: center;
    h3 {
      padding-left: 15px;
      color: #282c3f;
      font-size: 18px;
    }
  }
  .locationInfo {
    padding: 20px 0;
    border-bottom: 1px solid #e6e6e6;
    width: 50%;
  }
  .locationIcon {
    font-size: 25px;
  }
  .fromLocation {
    display: flex;
    justify-content: start;
    align-items: center;

    .fromAddress {
      padding-left: 20px;
    }
    .toAddress {
      padding-left: 20px;
    }
  }
  .toLocation {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 20px;
    .toAddress {
      padding-left: 20px;
    }
  }
  .deliveryDateInfo {
    display: flex;
    align-items: center;
    padding: 20px 0;
    width: 50%;
    border-bottom: 1px solid #000;
    .tickIcon {
      font-size: 20px;
      color: green;
    }
    .deliveryDatetext {
      padding-left: 20px;
      p {
        font-size: 12px;
      }
    }
  }

  .orderProducts {
    padding-top: 20px;
    border-bottom: 1px dashed #e6e6e6;
    width: 80%;
    h5 {
      font-size: 12px;
      color: #000;
      font-weight: 600;
    }
    .productList {
      padding: 10px 0;
      display: flex;
      width: 100%;
      justify-content: space-between;
     
      h6 {
        font-size: 11px;
        color: #000;
        font-weight: 500;
      }
      p {
        font-size: 12px;
        color: #000;
        font-weight: 500;
      }
    }
  }
  .paidInfo {
    padding: 15px 0;
    border-bottom: 1px solid #000;
    width: 80%;
    .flexObject {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .price {
        font-weight: 500;
      }
    }
    p {
      font-size: 12px;
      color: #7e808c;
      font-weight: 500 !important;
    }
  }
  .paid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    padding: 10px 0;
  }
`;
function OrderDetailsCard({ onClose, e }: Readonly<{ onClose: any; e: any }>) {
  const [orderData, setOrderData] = useState<any>({});
  const { data, loading, error } = useQuery(getOrder, {
    variables: {
      orderId: e?.id,
    },
    onCompleted: (data: any) => {
      setOrderData(data?.getOrder);
    },
  });
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  console.log("orderData", orderData);
  return (
    <>
      {orderData && (
        <OrderCardWrapper>
          <div className="orderIdText">
            <CloseIcon
              sx={{ cursor: "pointer", fontSize: "20px" }}
              onClick={onClose}
            />
            <h3>Order# {orderData?.orderId}</h3>
          </div>
          <div className="locationInfo">
            <div className="fromLocation">
              <PlaceOutlinedIcon className="locationIcon" />
              <div className="fromAddress">
                <h4>Quick Basket Hub</h4>
                <p>Madurai Branch</p>
              </div>
            </div>
            <div className="toLocation">
              <PlaceOutlinedIcon className="locationIcon" />
              <div className="toAddress">
                <h4>{orderData?.address?.label}</h4>
                <p>{orderData?.address?.address}-{orderData?.address?.pincode}</p>
              </div>
            </div>
          </div>
          <div className="deliveryDateInfo">
            <CheckOutlinedIcon className="tickIcon" />
            <div className="deliveryDatetext">
              <p>Delivered on Wed, Jul 26, 2023, 11:22 PM</p>
              <p>by Muthupandi M</p>
            </div>
          </div>
          <div className="orderProducts">
            <h5>{orderData?.addToCart?.length} ITEM</h5>
            {orderData?.addToCart?.map((e: any) => (
              <div className="productList" key={e?.id}>
                <h6>
                  {e?.product?.name}({e?.selectedVariant?.values}{" "}
                  {e?.selectedVariant?.unit}){" "}
                  <span style={{ fontWeight: 700, paddingLeft: "3px" }}>x</span>{" "}
                  <span style={{ fontWeight: 700, paddingLeft: "3px" }}>
                    {" "}
                    {e?.quantity}
                  </span>
                </h6>
                <p>${e?.totalPrice}</p>
              </div>
            ))}
          </div>
          <div className="paidInfo">
            <div className="flexObject">
              <p style={{ color: "#000", fontWeight: 500 }}>Item Total</p>
              <p className="price">
                $
                {Number.isInteger(orderData?.totalOrderPrice)
                  ? `${orderData?.totalOrderPrice}.00`
                  : orderData?.totalOrderPrice?.toFixed(2)}
              </p>
            </div>
            <div className="flexObject">
              <p>Delivery partner fee</p>
              <p className="price">$25.00</p>
            </div>
            <div className="flexObject">
              <p style={{ color: "green" }}>Discount Applied</p>
              <p style={{ color: "green" }} className="price">
                -${Number.isInteger(orderData?.orderDiscountPrice)
                  ? `${orderData?.orderDiscountPrice}.00`
                  : orderData?.orderDiscountPrice?.toFixed(2)}
              </p>
            </div>
            <div className="flexObject">
              <p>Taxes</p>
              <p className="price">$0</p>
            </div>
          </div>
          <div className="paid">
            <p>Paid via cash</p>
            <h4>BILL TOTAL</h4>
            <h4>${orderData?.orderAmount}</h4>
          </div>
        </OrderCardWrapper>
      )}
    </>
  );
}

export default OrderDetailsCard;
