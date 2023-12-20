import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getUserOrders } from "@/app/service/query";
import { useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import OrderStatusSlider from "./statusSlider";
import { Drawer } from "@mui/material";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import OrderDetailsCard from "@/app/components/models/viewOrderDetails";
export const OrdersWrappers = styled.div`
  h3.title {
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  .containerCard {
    border: 1px solid #d4d5d9;
    padding: 20px;
    margin: 0 0 20px 0;
    .paidAmount {
      display: flex;
      justify-content: end;
      align-items: center;
      padding-top: 10px;
      span {
        font-weight: 600;
        padding-left: 3px;
      }
    }
    .bottomSlider {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 20px;
      & .css-1630bv1-muislider-root: {
        color: green !important;
      }
      & .css-6g7qdi {
        width: 70%;
      }
    }
  }
  .orderCard {
    display: flex;
    padding-bottom: 15px;
    border-bottom: 1px dashed #e6e6e6;
    .OrderInfo {
      display: flex;
      align-items: start;
      justify-content: center;
      .orderImg {
        width: 70px;
        height: 70px;
        object-fit: cover;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .deliveryInfo {
      display: flex;
      align-items: start;
      padding-left: 40px;
      h6 {
        font-size: 12px;
        font-weight: 500;
      }
      .tickIcon {
        font-size: 20px;
        color: green;
        position: relative;
        top: -2px;
        left: 2px;
      }
    }
    div .orderId {
      font-size: 14px;
      font-weight: 600;
    }
    div .orderDate {
      padding-top: 5px;
      font-size: 11px;
      font-weight: 500;
    }
    div .viewDetails {
      color: orange;
      text-transform: uppercase;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      margin-top: 10px;
      border: none;
      color: orange;
      background: none;
      font-size: 12px;
    }
  }
`;

const PagenationWrapper = styled.section`
  float: right;
  button {
    font-size: 12px;
  }
`;

function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  const itemsPerPage = 3; // Number of items to show per page

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orderList.length / itemsPerPage);
  const [ordersData, setOrdersData] = useState({});
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, orderList?.length);
  const { loading: OrderListLoading, refetch: orderListRefetch } = useQuery(
    getUserOrders,
    {
      variables: {
        userId: "65642fcb264c4f37a0b129be",
      },
      onCompleted: (data: any) => {
        setOrderList(data?.getUserOrder);
      },
    }
  );
  useEffect(() => {
    orderListRefetch();
  }, []);

  return (
    <>
      <OrdersWrappers>
        <h3 className="title">Past Orders</h3>
        <>
          {orderList && !OrderListLoading ? (
            orderList.slice(startIndex, endIndex).map((e: any) => (
              <div className="containerCard" key={e?.id}>
                <div className="orderCard">
                  <div className="OrderInfo">
                    <div className="orderImg">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/5643/5643764.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h3 className="orderId">ORDER ID - {e?.orderId}</h3>
                      <h3 className="orderDate">
                        {new Date(e?.orderTime).toLocaleString()}
                      </h3>
                      <button
                        onClick={() => {
                          setOpen(true);
                          setOrdersData(e);
                        }}
                        className="viewDetails"
                      >
                        view details
                      </button>
                    </div>
                  </div>
                  <div className="deliveryInfo">
                    <h6>
                      {e?.orderStatus === "DELIVERED"
                        ? "Delivered on Wed, Jul 26, 2023, 11:22 PM"
                        : "Expect Delivery on Wed, Jul 26, 2023, 11:22 PM"}
                    </h6>
                    {e?.orderStatus === "DELIVERED" && (
                      <CheckCircleIcon className="tickIcon" />
                    )}
                  </div>
                </div>
                <div className="bottomSlider">
                  {e?.orderStatus === "DELIVERED" ? (
                    <h4
                      style={{
                        position: "relative",
                        left: "-10px",
                        fontSize: "12px",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        border: " 1px solid #008000c7",
                        padding: "10px 20px",
                        marginTop: "10px",
                        background:
                          "linear-gradient(135deg, rgb(33,167,131) 0%,rgb(192,223,125) 100%)",
                      }}
                    >
                      DELIVERED
                    </h4>
                  ) : (
                    <OrderStatusSlider status={e?.orderStatus} />
                  )}

                  <p className="paidAmount">
                    Total paid: <span> ${e?.orderAmount}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading</p>
          )}
          <Drawer
            sx={{
              background: "1f1f1f",
              "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
                backgroundColor: "#f5f7fc",
              },
            }}
            anchor="right"
            open={open}
            onClose={handleClose}
          >
            <OrderDetailsCard e={ordersData} onClose={handleClose} />
          </Drawer>
        </>
      </OrdersWrappers>

      <PagenationWrapper>
        <Pagination
          size="small"
          count={Math.round(orderList.length / 3)}
          defaultPage={1}
          siblingCount={0} // Use the totalPages calculated earlier
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </PagenationWrapper>
    </>
  );
}

export default Orders;
