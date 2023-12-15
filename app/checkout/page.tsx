"use client";
import React, { useEffect, useState } from "react";
import CheckOut from "./checkOut";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ClientSecret } from "../service/query";
import { useMutation } from "@apollo/client";
import { FetchCartItems } from "../service/api";

const stripePromise = loadStripe(
  "pk_test_51NjzQvSAjtfPsOjiVt5KLqh9Uc7Xzr6sF2ubVINDNoBqUPMdNJk1A33Pb0NrVm81AYUSQHVYdVXTQ2EEqRJBuhDu00Efneyegv"
);

function page() {
  const [clientSecret, setClientSecret] = useState("");

  const [createPaymentIntent] = useMutation(ClientSecret);

  const [checkoutPage, setCheckoutPage] = useState(false);

  const { cartProducts, getUserCartRefetch } = FetchCartItems(
    "655379d96144626a275e8a14"
  );

  useEffect(() => {
    const getSecretClient = async () => {
      try {
        let disCountAmount = cartProducts?.getAddToCartsByUserId?.carts?.reduce(
          (acc: any, index: any) => {
            return (
              acc +
              index?.quantity *
                (index.selectedVariant?.price *
                  (index.product?.dicountPercentage / 100))
            );
          },
          0
        );
        disCountAmount = Math.round(disCountAmount);

        const { data } = await createPaymentIntent({
          variables: {
            input: {
              name: "Muthupandi",
              email: "Test@gmail.com",
              amount:
                cartProducts?.getAddToCartsByUserId?.subTotal -
                disCountAmount +
                25,
            },
          },
        });
        if (data) {
          setClientSecret(data?.cardPayment?.clientSecret);
          setCheckoutPage(true);

          console.log("clientSecret", clientSecret);
        }
        console.log("data45", data?.cardPayment);
      } catch (error) {}

      // const clientSecret = data.cardPayment.clientSecret;
      // console.log("cleintsecrettdafds", clientSecret);
    };

    getSecretClient();
  }, []);

  const options = {
    // passing the client secret obtained in step 3
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  console.log("checkoutPagecheckoutPage1", clientSecret);
  return (
    <>
      {checkoutPage && (
        <Elements stripe={stripePromise} options={options}>
          <CheckOut clientSecrett={clientSecret} />
        </Elements>
      )}
    </>
  );
}

export default page;
