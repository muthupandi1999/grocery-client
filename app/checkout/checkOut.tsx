"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { styled } from "styled-components";
import { FetchCartItems } from "../service/api";
import { usePathname } from "next/navigation";
import { PaymentIntentResult, Stripe, loadStripe } from "@stripe/stripe-js";
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
import { AllProductsWithSearch, ClientSecret } from "../service/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { PlaceOrderProducts } from "../service/query";
import { updateProductData } from "../redux/slices/AllProductSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ModelBoxstyle } from "@/app/assets/style/productCardStyle";

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

export const centerstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "200px",
  width: "400px",
};
function CheckOut({ clientSecrett }: any) {
  console.log("checkoutPagecheckoutPage2", clientSecrett);
  const [carts, setCarts] = useState<any>([]);
  const selectPaymentMethod = useState("COD");

  const { cartProducts, getUserCartRefetch } = FetchCartItems(
    "655379d96144626a275e8a14"
  );
  const router = useRouter();

  const [orderType, setOrderType] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const itemsPerPage = 5; // Number of items to show per page

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(carts?.carts?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, carts?.carts?.length);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [stripePayment, setStripePayment] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false); // Control loading state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [errorMessage, setErrorMessage] = useState<any>(null);

  console.log("orderType", orderType);
  console.log("paymentType", paymentType);

  const [placeOrder] = useMutation(PlaceOrderProducts);

  const [loadGreeting, { data: AllProductsList, loading: AllProductsLoading }] =
    useLazyQuery(AllProductsWithSearch);

  const getAllProducts = async (dispatch: any) => {
    try {
      const { data } = await loadGreeting(); // Assuming loadGreeting fetches data
      if (data?.getAllProducts) {
        // data.getAllProducts.forEach((product: any) => {
        dispatch(updateProductData(data.getAllProducts)); // Dispatch each product individually
        // });
      }
    } catch (error) {
      // Handle errors if any
    }
  };

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
      setLoading(true);
    } else {
      await stripe
        .confirmPayment({
          elements,
          //`Elements` instance that was used to create the Payment Element
          // clientSecret: clientSecrett,
          confirmParams: {
            return_url: "http://localhost:3000/orders",
          },
          redirect: "if_required",
        })
        .then(async function (result: PaymentIntentResult) {
          console.log("resultresultresult", result);
          if (result?.paymentIntent?.status === "succeeded") {
            setLoading(true);
            try {
              // Call the placeOrder mutation with the necessary parameters
              const { data } = await placeOrder({
                variables: {
                  input: {
                    orderType,
                    address: {
                      address: "North St",
                      apartment: "Bungalow",
                      label: "Home",
                      pincode: 625018,
                    },
                    addToCartId: carts?.carts?.map(
                      (cartItem: any) => cartItem.id
                    ), // Assuming you need to pass cart item IDs
                    userId: "655379d96144626a275e8a14",
                    paymentType,
                    orderAmount: Math.round(
                      carts?.subTotal - disCountAmount + 25
                    ),
                    branchId: "653f711d4bd8c0f11a3e7106",
                  },
                },
              });
              if (data) {
                setTimeout(() => {
                  setLoading(false);
                  setStripePayment(true);
                }, 3000);

                setTimeout(() => {
                  setStripePayment(false);
                  toast.success("Order placed successfully!");
                  getAllProducts(dispatch).then(() => {
                    router.push("/account/orders");
                  });
                }, 6000);
              }
              console.log("Order placed:", data);

              // Display a success message or perform any other necessary actions
            } catch (error) {
              console.error("Error placing order:", error);
              toast.error("Failed to place order");
            }
          } else if (result.error) {
            // Inform the customer that there was an error.
            setErrorMessage(result?.error.message);
          }
        });
    }

    // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecrett, {
    //   payment_method: {
    //     card: elements.getElement(PaymentElement),
    //   } as any,
    //   return_url: "http://localhost:3000/checkout/success",// Setting the success URL during payment confirmation
    // });
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
                value="Delivery"
                style={{ marginRight: "10px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setOrderType(e.target.value)
                }
              />
              <label>Delivery</label>
              <br />
            </div>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="deliveryInfo2"
                name="delivery"
                value="Takeaway"
                style={{ marginRight: "10px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setOrderType(e.target.value)
                }
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
                value="CARD"
                style={{ marginRight: "10px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPaymentType(e.target.value)
                }
              />
              <label>Stripe</label>
              <br />
            </div>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="paymentInfo2"
                name="payment"
                value="BANK"
                style={{ marginRight: "10px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPaymentType(e.target.value)
                }
              />
              <label>BANK</label>
            </div>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <input
                type="radio"
                id="paymentInfo3"
                name="payment"
                value="CASH"
                style={{ marginRight: "10px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPaymentType(e.target.value)
                }
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
            value={Math.round(carts?.subTotal - disCountAmount + 25)}
          />
          <CheckOutBtn disabled={!stripe}>Submit</CheckOutBtn>
          {errorMessage && toast.error(errorMessage)}
        </form>
      </div>
      <div>
        {loading ? ( // Display loader while loading is true
          <Modal
            open={loading} // Show modal only when both conditions are true
            onClose={() => setLoading(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              <CircularProgress sx={centerstyle} />
            </div>
          </Modal>
        ) : (
          <Modal
            open={stripePayment} // Show modal only when both conditions are true
            onClose={() => setStripePayment(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModelBoxstyle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  mr={2}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontSize: "16px" }}
                >
                  Payment Success!
                </Typography>
                <CheckCircleIcon sx={{ color: "#149914" }} />
              </div>
            </ModelBoxstyle>
          </Modal>
        )}
      </div>
    </CheckoutWrapper>
  );
}

export default CheckOut;
