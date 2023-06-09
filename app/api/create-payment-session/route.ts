import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env["SECRET_KEY"] ?? "", {
    apiVersion: "2022-11-15",
  });

  const body = await req.json();

  const amount = body.amount;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: amount,
          product_data: {
            name: "Donation",
          },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success-page",
    cancel_url: "http://localhost:3000/session-checkout",
    payment_method_types: ["card"],
    
  });

  console.log(session);

  return new NextResponse(
    JSON.stringify({
      success: true,
    })
  );
};
