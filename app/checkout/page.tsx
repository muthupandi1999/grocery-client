"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  BorderLessInput,
  CheckoutBtn,
  FlexBox,
  ProductImage,
  ProductImageContainer,
  SCCategoryImgBox,
  SCContainer,
  SCIMGBOX,
  SCIMGTAG,
  SCLINK,
  SCScrollBox,
  SCTitle,
} from "../assets/style";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Backdrop,
} from "@mui/material";
import page from "../page";
import { MyContext } from "../myContext";

import { IoIosArrowBack } from "react-icons/io";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { PaymentIntentResult, loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { getClientSecret, placeOrder } from "../service/mutation";
import { Elements } from "@stripe/react-stripe-js";
import CartLoader from "../Loading UI/cartLoader";
import { CartTotalAmount, SetCartArrFunc } from "../helperFunctions";
import { fetchCartItems } from "../service/api/data";
import { USER_ID } from "../utils/variables";
import { PaymentFailed, PaymentSuccess } from "../toast";
import { useRouter } from "next/navigation";
import { setCartEmpty } from "../myContext/action";
import CustomRadio from "../components/elements/radio";
import { toast } from "react-toastify";

const Renderchild = ({ orderAmount }) => {
  const stripe = useStripe();
  const [paymentMethod, setPaymentMethod] = useState("credit card");
  const [orderType, setOrderType] = useState("Delivery");
  const elements = useElements();
  const { cartItems, dispatch, orderAddress } = useContext(MyContext);
  const router = useRouter();
  const choosenAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  console.log("getAddressfromStorage", choosenAddress, cartItems);
  const { address, apartment, label, pincode } = choosenAddress;
  const [getOrderStatus, { data: palceOrderData }] = useMutation(placeOrder);
  const addToCartIdArray = cartItems.map((data) => data?.addToCartId);
  console.log("CartID", addToCartIdArray);
  const postOrderDetails = async () => {
    try {
      const { data } = await getOrderStatus({
        variables: {
          input: {
            orderType: orderType,
            address: {
              address: address,
              apartment: apartment,
              label: label,
              pincode: pincode,
            },
            addToCartId: addToCartIdArray,
            userId: USER_ID,
            paymentType: paymentMethod ? "CARD" : null,
            orderAmount: orderAmount,
            branchId: "653f711d4bd8c0f11a3e7106",
          },
        },
      });
      console.log("asyncOrderStatus", data);
      setCartEmpty(dispatch);
      PaymentSuccess(router);
    } catch {
      PaymentFailed();
    }
  };
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    console.log("called");

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    } else {
      const callFunc = async () => {
        await stripe
          .confirmPayment({
            elements,
            //`Elements` instance that was used to create the Payment Element
            // clientSecret: clientSecrett,
            confirmParams: {
              return_url: "https://localhost:3000/orders",
            },
            redirect: "if_required",
          })
          .then(async function (result: PaymentIntentResult) {
            console.log("resultresultresult", result);

            alert("success!");
            await postOrderDetails();
          })
          .catch((err) => {
            console.log(err);
          });
      };
      callFunc();
    }
  };
  const paymentRadioOptionsArr = [
    {
      label: "Payment Method",
      options: [
        { label: " Credit Card", value: "credit card" },
        { label: " Debit Card", value: "debit card" },
      ],
    },
    {
      label: "Order Type",
      options: [
        { label: "Delivery ", value: "Delivery" },
        { label: "Takeaway", value: "Takeaway" },
      ],
    },
  ];
  return (
    <form onSubmit={handleSubmit}>
      {paymentRadioOptionsArr.map((data, index) => (
        <SCContainer key={index} $variant="p-5-0">
          <SCTitle $variant="h13Unit">{data.label}</SCTitle>
          {data.options.map((options, index) => (
            <FlexBox key={index} $variant="align-cP-10-0start">
              <CustomRadio
                value={
                  data.label === "Payment Method"
                    ? paymentMethod === options.value
                    : orderType === options.value
                }
                size={18}
              />
              <SCTitle
                onClick={
                  data.label === "Payment Method"
                    ? () => setPaymentMethod(options.value)
                    : () => setOrderType(options.value)
                }
                $variant="H18600"
              >
                {options.label}
              </SCTitle>
            </FlexBox>
          ))}
        </SCContainer>
      ))}

      <PaymentElement />

      <CheckoutBtn>Check Out</CheckoutBtn>
    </form>
  );
};
function Page() {
  const { cartItems, dispatch, orderAddress } = useContext(MyContext);
  const [checkoutLoader, setCheckOutLoader] = useState(false);
  const [secretKey, setSecretKey] = useState(null);
  const [getClient, { data }] = useMutation(getClientSecret);
  const rowsArr = [3, 6, 10];
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(null);
  const [checkOutItems, setCheckoutItems] = useState([]);
  const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  const [billDetails, setBillDetails] = useState({
    subTotal: null,
    discount: null,
    total: null,
  });
  console.log("getAddress", selectedAddress);
  const { cartProducts, cartRefetch, cartLoader } = fetchCartItems({
    userId: USER_ID,
    index: pageNumber + 1,

    limit: rowsPerPage,
  });

  useEffect(() => {
    async function fetchClientDetails() {
      try {
        const { data } = await getClient({
          variables: {
            input: {
              amount: cartProducts?.getAddToCartsByUserId?.subTotal,
              currency: "inr",
              email: "user@gmail.com",
              name: "user",
            },
          },
        });
        setSecretKey(data?.cardPayment?.clientSecret);
      } catch (err) {
        console.log(err);
      }
    }
    fetchClientDetails();
  }, [cartProducts]);
  console.log(secretKey, "secretttttttttt");

  useEffect(() => {
    console.log(
      "homeCart",
      cartProducts,
      typeof cartProducts?.getAddToCartsByUserId?.subTotal
    );

    console.log(data);

    if (cartProducts?.getAddToCartsByUserId?.count) {
      setCheckoutItems(cartProducts?.getAddToCartsByUserId?.carts);

      setTotalRows(cartProducts?.getAddToCartsByUserId?.count);
    }
  }, [cartProducts]);
  console.log("checkoutItems", checkOutItems);
  console.log("effect run", cartProducts);
  useEffect(() => {
    if (cartProducts?.getAddToCartsByUserId?.subTotal) {
      setBillDetails((prev) => ({
        ...prev,
        subTotal: cartProducts?.getAddToCartsByUserId?.subTotal,
        discount:
          cartProducts?.getAddToCartsByUserId?.subTotal > 500 ? "Free" : 50,
      }));
    }
  }, [cartProducts]);
  //stripe
  useEffect(() => {
    setBillDetails((prev) => ({
      ...prev,
      total:
        prev.subTotal > 500 ? prev.subTotal : prev.subTotal + prev.discount,
    }));
  }, [billDetails?.subTotal]);

  const stripePromise = loadStripe(
    "pk_test_51NjzQvSAjtfPsOjiVt5KLqh9Uc7Xzr6sF2ubVINDNoBqUPMdNJk1A33Pb0NrVm81AYUSQHVYdVXTQ2EEqRJBuhDu00Efneyegv"
  );
  const options = {
    // passing the client secret obtained in step 3
    clientSecret: secretKey,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <>
      {cartLoader && (
        <Backdrop open={cartLoader} sx={{ zIndex: 1 }}>
          <CartLoader />
        </Backdrop>
      )}

      <FlexBox $disable={null} $variant="betweenwhite">
        <SCContainer $variant="w-3/5">
          <SCContainer $variant="">
            <SCTitle $variant="H246000 0 8">Delivery Address:</SCTitle>
            <SCTitle $variant="H14UNIT0 0 8">
              {`${selectedAddress?.label}: ${selectedAddress?.address},${selectedAddress?.apartment},${selectedAddress?.pincode}`}
            </SCTitle>
          </SCContainer>
          <SCTitle $variant="H24700">Shopping Cart.</SCTitle>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              boxShadow: "none",
              position: "relative",
              zIndex: 0,
            }}
          >
            <SCScrollBox $boxHeight="90vh">
              {/* {!cartLoader && ( */}
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {["Product", "Size", "Quantity", "Total Price"].map(
                      (column) => (
                        <TableCell
                          sx={{
                            padding: 0,
                            paddingTop: "10px",
                            paddingBottom: "10px",
                          }}
                          //   key={column.id}
                          //   align={column.align}
                          //   style={{ minWidth: column.minWidth }}
                        >
                          <SCTitle $variant="H14600">{column}</SCTitle>
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {checkOutItems?.map((rowData) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowData?.id}
                        sx={{
                          ":hover": {
                            backgroundColor: "transparent !important",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            padding: 0,
                            paddingTop: "10px",
                            paddingBottom: "10px",
                          }}
                        >
                          <FlexBox $variant="align-cstart" $disable={null}>
                            <SCCategoryImgBox $variant="">
                              <SCIMGTAG src={rowData?.product?.image?.image} />
                            </SCCategoryImgBox>

                            <SCTitle $variant="H13600">
                              {rowData?.product?.name}
                            </SCTitle>
                          </FlexBox>
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: 0,
                            paddingTop: "10px",
                            paddingBottom: "10px",
                          }}
                        >
                          <SCTitle $variant="H12UNIT">
                            {rowData?.selectedVariant?.values +
                              " " +
                              rowData?.selectedVariant?.unit}
                          </SCTitle>
                        </TableCell>
                        <TableCell>{rowData?.quantity}</TableCell>
                        <TableCell>
                          <SCTitle $variant="H16UNIT600">
                            ₹
                            {rowData?.quantity * rowData?.selectedVariant.price}
                          </SCTitle>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {/* )}   */}
            </SCScrollBox>
            <TablePagination
              rowsPerPageOptions={rowsArr}
              component="div"
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={pageNumber}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FlexBox $variant="end" $disable={null}>
            <SCContainer $variant="w-3/10">
              <FlexBox $variant="betweenP-10-0" $disable={null}>
                <SCTitle $variant="H16UNIT600">Subtotal:</SCTitle>
                <SCTitle $variant="H16600">₹ {billDetails?.subTotal}</SCTitle>
              </FlexBox>
              <FlexBox $variant="betweenP-10-0" $disable={null}>
                <SCTitle $variant="H16UNIT600">Shipping:</SCTitle>
                <SCTitle $variant="H16600">₹ {billDetails?.discount}</SCTitle>
              </FlexBox>
              <hr />
            </SCContainer>
          </FlexBox>
          <FlexBox $variant="betweenP-10-0" $disable={false}>
            <SCLINK $variant="" href={"/"}>
              <FlexBox $variant="align-c">
                <IoIosArrowBack size={18} />
                <SCTitle $variant="H16700">Continue Shopping</SCTitle>
              </FlexBox>
            </SCLINK>
            <SCContainer $variant="w-3/10">
              <FlexBox $variant="between">
                <SCTitle $variant="H16600">Total:</SCTitle>
                <SCTitle $variant="H16600">₹ {billDetails?.total}</SCTitle>
              </FlexBox>
            </SCContainer>
          </FlexBox>
        </SCContainer>
        <SCContainer $variant="w-3/10p15bg-gray">
          <SCTitle $variant="H24600">Payment Info.</SCTitle>
          {secretKey && (
            <Elements stripe={stripePromise} options={options}>
              <Renderchild
                setCheckOutLoader={setCheckOutLoader}
                orderAmount={cartProducts?.getAddToCartsByUserId?.subTotal}
              />
            </Elements>
          )}
        </SCContainer>
      </FlexBox>
    </>
  );
}

export default Page;
