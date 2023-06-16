const {
  createProduct,
  getProductById,
  getAllProducts,
  getProductByName,
} = require("../controllers/productsControllers");
const Category = require("../models/Category");
const { uploadImage } = require("../cloudinary");
const fs = require("fs-extra");
const Products = require('../models/Products')

const createProductsHandler = async (req, res) => {
  const { name, price, category, description, stock, origin, enable } = req.body;

  try {
    const image = await uploadImage(req.file.path);

    const newProduct = await createProduct(
      name,
      price,
      category,
      description,
      stock,
      origin,
      image,
      enable
    );

    for (const categoryName of category) {
      let categories = await Category.findOne({ name: categoryName });

      if (categories) {
        newProduct.category.push(categories.id);
      }
    }

    await newProduct.save();
    await fs.unlink(req.file.path);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductsByIdHandler = async (req, res) => {
  const { idProduct } = req.params;

  try {
    const product = await getProductById(idProduct);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductsHandler = async (req, res) => {
  const { name, category, origin } = req.query;
  try {
    let products = await getAllProducts();

    // Aplica el filtro por nombre si está presente
    if (name) {
      products = products.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Aplica el filtro por categoría si está presente
    if (category && category !== "All") {
      products = products.filter((el) => el.category.includes(category));
    }

    // Aplica el filtro por origen si está presente
    if (origin && origin !== "All") {
      products = products.filter((el) => el.origin === origin);
    }

    // Devuelve los productos filtrados
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const enableProducts = async (req, res) => {
  const { idProduct } = req.params;
  const { enable } = req.body;

  try {
    const product = await Products.findById(idProduct);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    product.enable = enable;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStock = async (req, res) => {
  const { idProduct } = req.params;
  const { action } = req.body;

  try {
    const product = await Products.findById(idProduct);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (action === "increment") {
      product.stock += 1;
    } else if (action === "decrement") {
      product.stock -= 1;
    } else {
      return res.status(400).json({ error: "Acción inválida" });
    }

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


  


module.exports = {
  createProductsHandler,
  getProductsByIdHandler,
  getProductsHandler,
  enableProducts,
  updateStock
};
