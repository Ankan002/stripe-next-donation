import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env["SECRET_KEY"] ?? "", {
    apiVersion: "2022-11-15",
  });

  const endpointSecret = process.env.WEBHOOK_SECRET ?? "";

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;

  if (!signature) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "No signature received",
      }),
      {
        status: 400,
      }
    );
  }

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        {
          status: 400,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Internal Server Error!!",
      }),
      {
        status: 500,
      }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      console.log(event.data.object);
      break;
    default:
      console.log("Something Went Wrong");
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
    {
      status: 200,
    }
  );
};
