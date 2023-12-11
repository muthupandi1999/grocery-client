import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51NjzQvSAjtfPsOjiVt5KLqh9Uc7Xzr6sF2ubVINDNoBqUPMdNJk1A33Pb0NrVm81AYUSQHVYdVXTQ2EEqRJBuhDu00Efneyegv"
    );
  }
  return stripePromise;
};

export default getStripe;
