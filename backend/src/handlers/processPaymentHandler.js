// const mercadopago = require("../mercadoPago");

// const processPaymentHandler = async (req, res) => {
//   const { name } = req.body;
//   console.log(name);
//   const preference = {
//     items: [
//       {
//         title: "hello",
//         currency_id: "ARS",
//         unit_price: "3",
//         quantity: 1,
//       },
//     ],
//     back_urls: {
//       success: "http://127.0.0.1:5173",
//       failure: "http://127.0.0.1:5173",
//       pending: "http://127.0.0.1:5173",
//     },
//     //Le notificamos que una vez realizada la compra, la autoredirección este aprobada para realizarce
//     auto_return: "approved",
//     //binary_mode => solo acepta pagos en el momento
//     binary_mode: true,
//   };
//   console.log(preference);
//   //Creamos nuestra preferencias, que contendra los detalles de la compra:
//   mercadopago.preferences
//     .create(preference)
//     .then((response) => {
//       console.log(response.body);
//       //En esta instancia se debera asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//       //Que sera lo que enviemos al frontend como el ID de la compra
//       res.json({
//         global: response.body.id,
//         //url: response.body.sandbox_init_point
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).json({ error: error.message });
//     });
// };

// module.exports = { processPaymentHandler };
