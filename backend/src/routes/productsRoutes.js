const { Router } = require("express");
const {
  createProductsHandler,
  getProductsByIdHandler,
  getProductsHandler,
  enableProducts,
  updateStock
} = require("../handlers/productsHandlers");

const router = Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

const validate = (req, res, next) => {
  const { name, price, category, description, stock, origin } = req.body;

  if (!name || !price || !category || !description || !stock || !origin)
    return res.status(400).json({ error: "Missing data" });

  next();
};

router.post("/", validate, createProductsHandler);
router.get("/:idProduct", getProductsByIdHandler);
router.get("/", getProductsHandler);
router.patch('/enable/:idProduct', enableProducts);
router.patch('/stock/:idProduct', updateStock);


module.exports = router;
