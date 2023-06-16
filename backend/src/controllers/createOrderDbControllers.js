const Order = require("../models/Order");

const createOrder = async (customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);
    const userId = customer.metadata.userId;

    const newOrder = new Order({
        userId: userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: Items,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    });

    try {
        const saveOrder = await newOrder.save();
        console.log("Order save", saveOrder);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createOrder };