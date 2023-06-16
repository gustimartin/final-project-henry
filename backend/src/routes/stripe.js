const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const { Router } = require("express");
const router = Router();
const { createOrder } = require("../controllers/createOrderDbControllers");
const { stockUpdateDb } = require("../controllers/stockUpdateDbControllers");

router.post("/create-checkout-session", express.json(), async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        cart: JSON.stringify(req.body.item),
      },
    });

    const line_items = req.body.item?.map((el) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: el.name,
            images: [el.image],
            description: el.category,
            metadata: {
              id: el.id,
            },
          },
          unit_amount: Math.round(el.price * 100),
        },
        quantity: el.cartAmount,
      };
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/#/CheckoutSuccess",
      cancel_url: "http://localhost:5173/#/cart",

      //!DEPLOY
      //! success_url: "https://frontend-pf-seven.vercel.app/#/CheckoutSuccess",
      //! cancel_url: "https://frontend-pf-seven.vercel.app/#/cart",
    });
    console.log("session console", session);
    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

//get stripe: status paid
router.get("/success", async (req, res) => {
  const { id } = req.query;
  try{
    const session = await stripe.checkout.sessions.retrieve(id);
    //console.log("====", session.payment_status, "====");
    res.json({status: session.payment_status});
  }catch(error){
    res.status(500).json({error: error.message});
  }
});


//stripe webhook

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const endpointSecret = process.env.ENDPOINT;
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log("verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    const data = event.data.object;
    // Handle the event1
    if (event.type === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
          stockUpdateDb(customer);
        })
        .catch((error) => console.log(error.message));
    }

    response.json(data.payment_status);
  }
);

module.exports = router;
