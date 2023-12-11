"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SuccessPayment from "./sucessPayment";

const stripePromise = loadStripe(
  "pk_test_51NjzQvSAjtfPsOjiVt5KLqh9Uc7Xzr6sF2ubVINDNoBqUPMdNJk1A33Pb0NrVm81AYUSQHVYdVXTQ2EEqRJBuhDu00Efneyegv"
);

function page() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <SuccessPayment />
      </Elements>
    </>
  );
}

export default page;
