"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NjzQvSAjtfPsOjiVt5KLqh9Uc7Xzr6sF2ubVINDNoBqUPMdNJk1A33Pb0NrVm81AYUSQHVYdVXTQ2EEqRJBuhDu00Efneyegv"
);

function SuccessPayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [stripePayment, setStripePayment] = useState(false);

  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  useEffect(() => {
    if (clientSecret && stripe) {
      setStripePayment(true);
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
            console.log("paymentIntent", paymentIntent)
          // Handle paymentIntent status
          switch (paymentIntent?.status) {
            case "succeeded":
              toast.success("Success! Your Order Placed.");
              break;

            case "processing":
              toast.error(
                "Payment processing. We'll update you when payment is received."
              );
              break;

            case "requires_payment_method":
              toast.error("Payment failed. Please try another payment method.");
              break;

            default:
              toast.error("Something went wrong.");
              break;
          }
        })
        .catch((error) => {
          console.error("Error retrieving PaymentIntent:", error);
        });
    }
  }, [clientSecret, stripe]);
  return <div>Success</div>;
}

export default SuccessPayment;
