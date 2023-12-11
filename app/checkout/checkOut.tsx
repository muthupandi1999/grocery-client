"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FetchCartItems } from "../service/api";
import { usePathname } from "next/navigation";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import getStripe from "../utils/get-stripejs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import { ClientSecret } from "../service/query";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckOutBtn = styled.button`
  background-color: green;
  padding: 10px 20px;
  width: 150px;
  text-align: center;
  color: #fff;
  border: none;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: "#666",
    fontSize: "14px",
    textTransform: "uppercase",
    fontWeight: "600",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff",
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PagenationWrapper = styled.section`
  float: right;
  padding: 20px 0;
  button {
    font-size: 12px;
  }
`;

export const InputCommon = styled.input`
  border: none;
  padding: 10px 15px;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 17.5px 0;
`;

export const InputLabel = styled.label`
  color: #666;
  font-size: 13px;
`;

export const CommonBtn = styled.button`
  background-color: green;
  padding: 10px 20px;
  width: 150px;
  text-align: center;
`;

export const CheckoutWrapper = styled.section`
  table,
  th,
  td {
    border-collapse: collapse;
    box-shadow: none;
  }
  th,
  td {
    padding: 10px 15px 0 10px;
  }
  th {
    text-align: left;
  }
  .PaymentOption {
    background: #fafafa;
    padding: 20px;
    width: 27%;
    .PaymentCard {
      .p-Input {
        input {
          border: none;
          padding: 10px 15px;
          width: 100%;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          margin: 17.5px 0;
        }
      }
    }
  }
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  .ProductList {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 100%;
    height: 508px;
    h5 {
      font-size: 18px;
      font-weight: 500;
      padding: 0 15px;
    }
    .addressDetails {
      border-bottom: 1px solid #eeeeee;
      padding-top: 20px;
    }
    .address {
      margin-top: 6px;
      color: rgb(153, 153, 153);
      overflow-wrap: break-word;
      width: 90%;
      padding: 0 15px;
      span {
        color: #000;
      }
      padding-bottom: 20px;
    }
    .productWrapper {
      height: 400px;
      overflow-y: scroll;
    }
  }
  .ProductCount {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    padding: 16px 30px 16px 15px;

    h6 {
      font-size: 14px;
      font-weight: 600;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-transform: uppercase;
    }
  }

  .ProductInfo {
    display: flex;
    align-items: center;

    background: #fff;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    font-size: 12px;
    padding: 16px 26px 0 26px;
    width: 100%;
    vertical-align: middle;
    align-items: center;

    div img {
      width: 80px;
      height: 80px;
    }
    .productCount {
      padding-right: 10px;
    }

    .productImage {
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .productDetails {
      padding-left: 6px;
      h3 {
        color: #666;
        font-size: 12px;
      }
      p {
        color: #999;
        padding-top: 5px;
      }
      p.price {
        color: #666;
      }
    }
  }
`;
function CheckOut({ clientSecrett }: any) {
  const [carts, setCarts] = useState<any>([]);
  const selectPaymentMethod = useState("COD");

  const { cartProducts, getUserCartRefetch } = FetchCartItems(
    "655379d96144626a275e8a14"
  );

  const itemsPerPage = 5; // Number of items to show per page

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(carts?.carts?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, carts?.carts?.length);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cartProducts) {
          getUserCartRefetch();
          setCarts(cartProducts?.getAddToCartsByUserId);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData();
  }, [cartProducts]);

  let disCountAmount = carts.carts?.reduce((acc: any, index: any) => {
    return (
      acc +
      index?.quantity *
        (index.selectedVariant?.price *
          (index.product?.dicountPercentage / 100))
    );
  }, 0);

  console.log("Cartasdfdas", carts?.carts);

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/success",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      console.log("heyyyyyyyyyyyyyyyyyyyy42354325");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <CheckoutWrapper>
      <div style={{ width: "70%" }}>
        <div className="ProductList">
          <div className="addressDetails">
            <h5>Delivery Address</h5>
            <p className="address">
              <span>Home:</span> test, test, Mumbai Central railway station
              building, Mumbai Central, Mumbai, Maharashtra, India
            </p>
          </div>

          <div className="ProductCount">
            <h6>MY CART</h6>
            <h6>{carts?.carts?.length} items</h6>
          </div>
          <TableContainer
            sx={{
              "&:.css-11xur9t-MuiPaper-root-MuiTableContainer-root": {
                boxShadow: "none",
              },
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell width={"60%"} style={{ textAlign: "start" }}>
                    Product
                  </StyledTableCell>
                  <StyledTableCell align="center">Unit</StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carts?.carts?.slice(startIndex, endIndex).map((task: any) => (
                  <StyledTableRow key={task.id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                        className="productImage"
                      >
                        <div>
                          <img
                            width={50}
                            height={50}
                            src={task?.product?.image?.image}
                            alt=""
                          />
                        </div>
                        <p
                          style={{
                            color: "#000",
                            fontWeight: "600",
                            fontSize: "12px",
                            paddingLeft: "8px",
                          }}
                        >
                          {task?.product?.name}
                        </p>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ color: "#666" }}
                      align="center"
                    >{`${task?.selectedVariant?.values}${task?.selectedVariant?.unit}`}</StyledTableCell>
                    <StyledTableCell style={{ color: "#666" }} align="center">
                      {task?.quantity}
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "#000" }} align="center">
                      ${task?.selectedVariant?.price}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <PagenationWrapper>
          <Pagination
            size="small"
            count={Math.round(carts?.carts?.length / 5)}
            defaultPage={1}
            siblingCount={0} // Use the totalPages calculated earlier
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </PagenationWrapper>
      </div>

      <div className="PaymentOption">
        {/* <h2 style={{ paddingBottom: "20px" }}>Payment Info</h2>
        <p style={{ margin: "10x 10px" }}>Delivery Type</p>
        <div style={{ display: "flex", gap: "10px", padding: "15px 0" }}>
          <div style={{ marginRight: "20px", display: "flex" }}>
            <input
              type="radio"
              id="deliveryInfo1"
              name="delivery"
              value="delivery"
              style={{ marginRight: "10px" }}
            />
            <label>Delivery</label>
            <br />
          </div>
          <div style={{ marginRight: "20px", display: "flex" }}>
            <input
              type="radio"
              id="deliveryInfo2"
              name="delivery"
              value="takeaway"
              style={{ marginRight: "10px" }}
            />
            <label>Takeaway</label>
          </div>
        </div>
        <p style={{ margin: "10x 10px" }}>Payment Method</p>
        <div style={{ display: "flex", gap: "10px", padding: "10px 0" }}>
          <div style={{ marginRight: "20px", display: "flex" }}>
            <input
              type="radio"
              id="paymentInfo1"
              name="payment"
              value="stripe"
              style={{ marginRight: "10px" }}
            />
            <label>Stripe</label>
            <br />
          </div>
          <div style={{ marginRight: "20px", display: "flex" }}>
            <input
              type="radio"
              id="paymentInfo2"
              name="payment"
              value="paypal"
              style={{ marginRight: "10px" }}
            />
            <label>Paypal</label>
          </div>
          <div style={{ marginRight: "20px", display: "flex" }}>
            <input
              type="radio"
              id="paymentInfo3"
              name="payment"
              value="COD"
              style={{ marginRight: "10px" }}
            />
            <label>COD</label>
          </div>
        </div>

        <br />
        <form action="/" />
        <InputLabel>First name:</InputLabel>
        <br />
        <InputCommon type="text" id="fname" name="fname" value="" />

        <br />
        <InputLabel>Email:</InputLabel>
        <br />
        <InputCommon type="text" id="email" name="email" value="" />
        <br />
        <InputLabel>Amount:</InputLabel>
        <br />
        <InputCommon disabled type="text" id="amount" name="amount" value={carts?.subTotal} />
        <br />
        <CheckOutBtn onClick={handlePaymentIntent}>Submit</CheckOutBtn>
        <form /> */}

        <form onSubmit={handleSubmit}>
          <h2 style={{ paddingBottom: "20px" }}>Payment Info</h2>
          <p style={{ margin: "10x 10px" }}>Delivery Type</p>
          <div style={{ display: "flex", gap: "10px", padding: "15px 0" }}>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="deliveryInfo1"
                name="delivery"
                value="delivery"
                style={{ marginRight: "10px" }}
              />
              <label>Delivery</label>
              <br />
            </div>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="deliveryInfo2"
                name="delivery"
                value="takeaway"
                style={{ marginRight: "10px" }}
              />
              <label>Takeaway</label>
            </div>
          </div>
          <p style={{ margin: "10x 10px" }}>Payment Method</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px 0",
              marginBottom: "20px",
            }}
          >
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="paymentInfo1"
                name="payment"
                value="stripe"
                style={{ marginRight: "10px" }}
              />
              <label>Stripe</label>
              <br />
            </div>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="paymentInfo2"
                name="payment"
                value="paypal"
                style={{ marginRight: "10px" }}
              />
              <label>Paypal</label>
            </div>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="paymentInfo3"
                name="payment"
                value="COD"
                style={{ marginRight: "10px" }}
              />
              <label>COD</label>
            </div>
          </div>
          <PaymentElement className="PaymentCard" />
          <InputLabel>Amount:</InputLabel>
          <br />
          <InputCommon
            disabled
            type="text"
            id="amount"
            name="amount"
            value={carts?.subTotal - disCountAmount + 25}
          />
          <CheckOutBtn disabled={!stripe}>Submit</CheckOutBtn>
          {/* Show error message to your customers  */}
          {errorMessage && toast.error(errorMessage)}
        </form>
      </div>
    </CheckoutWrapper>
  );
}

export default CheckOut;
