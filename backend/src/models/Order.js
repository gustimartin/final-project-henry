const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      // require: true,
    },
    customerId: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
    products: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        category: {
          type: Array,
        },
        id: {
          type: String,
        },
        image: {
          type: String,
        },
        cartAmount: { type: Number },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, require: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("order", orderSchema);
