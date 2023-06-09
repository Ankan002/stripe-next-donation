"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

const WrappedFunction = () => {
  const stripe = useStripe();
  const elements = useElements();

  const onPayClick = async () => {
    console.log("clicked!!");
    if (!stripe || !elements) return;

    const { error } = await elements.submit();

    if (error) {
      console.log(error);
      return;
    }

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
    });

    const data = await response.json();

    console.log(data.data.client_secret);

    const someRes = await stripe.confirmPayment({
      elements,
      clientSecret: data.data.client_secret,
      confirmParams: {
        return_url: "http://localhost:3000/success-page",
      },
    });

    console.log(someRes);
  };

  // const options: StripePaymentElementOptions = {
  //   fields: 
  // } 

  return (
    <>
      <PaymentElement />
      <button
        className="m-10 bg-[#00DFA2] text-black text-xl tracking-wide px-4 py-2 rounded-lg border-2 border-black"
        onClick={onPayClick}
      >
        Pay Now
      </button>
    </>
  );
};

export default function Home() {
  const stripePromise = loadStripe(process.env["NEXT_PUBLIC_PUBLIC_KEY"] ?? "");
  const options: StripeElementsOptions = {
    amount: 100,
    mode: "payment",
    currency: "inr",
    appearance: {
      theme: "night",
      variables: {
        colorBackground: "#fff",
        colorText: "#000",
      },
    },
  };

  return (
    <main className="min-h-screen w-full bg-[#F1F6F9] flex flex-col justify-center items-center">
      <Elements stripe={stripePromise} options={options}>
        <WrappedFunction />
      </Elements>
    </main>
  );
}
