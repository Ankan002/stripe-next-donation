import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// import {  } from "@stripe/stripe-js";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env["SECRET_KEY"] ?? "", {
    apiVersion: "2022-11-15",
  });
  const res = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  console.log(res);

  return new NextResponse(
    JSON.stringify({
      success: false,
      data: {
        client_secret: res.client_secret,
      },
    })
  );
};
