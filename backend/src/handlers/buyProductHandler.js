// const { mercadopago } = require("../mercadoPago");
// const { buyProducts } = require("../controllers/buyProductControllers");

// const buyProductHandler = async (req, res) => {
//   const { idProduct } = req.params;

//   const preference = await buyProducts(idProduct);

//   mercadopago.preferences
//     .create(preference)
//     .then((response) => res.status(200).json({ preference }))
//     .then((error) => res.status(400).json({ error: error.message }));

//   module.exports = { buyProductHandler };
// };
