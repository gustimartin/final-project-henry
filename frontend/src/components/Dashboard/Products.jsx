import { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useState } from "react";
import { setEnableProduct, } from "../../features/productsSlice";
import SideBar from "./SideBar";
import axios from "axios";
import Swal from "sweetalert2"
const ProductsDashboard = () => {
  const filteredProducts = useSelector((state) => state.products.enableProducts);
  const [changeStockProducts, setChangeStockProducts] = useState([]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllProducts());
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products");
        const users = response.data;
        const filterProducts = users;

        setChangeStockProducts(filterProducts);
        dispatch(setEnableProduct(filterProducts));
      } catch (error) {
        console.error(error);
      }
    };


    fetchData();
  }, [dispatch]);


  // const handleDelete = (productId) => {
  //   // dispatch(deleteProduct(productId));

  // };

  const handleDelete = async (id) => {

    try {

      await axios.patch(`/products/enable/${id}`, { enable: false });
      const response = await axios.get("/products/");
      const products = response.data;
      const filterUsers = products;
      dispatch(setEnableProduct(filterUsers));

      Swal.fire({
        icon: 'success',
        title: 'Product has been hided',

      })

    } catch (error) {
      console.error(error);
    }
  }

  const handleUnlock = async (id) => {

    try {

      await axios.patch(`/products/enable/${id}`, { enable: true });
      const response = await axios.get("/products");
      const products = response.data;
      const filterProducts = products

      dispatch(setEnableProduct(filterProducts));

      Swal.fire({
        icon: 'warning',
        title: 'Product has been showed',

      })

    } catch (error) {
      console.error(error);
    }
  }

  const updateStock = async (idProduct, action) => {
    try {
      await axios.patch(`/products/stock/${idProduct}`, { action });
      const response = await axios.get("/products");
      const products = response.data;
      const updatedStock = products;

      dispatch(setEnableProduct(updatedStock))
    } catch (error) {
      console.error(error);

    }
  };





  return (
    <div className="grid grid-cols-6">
      <SideBar />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-span-5 mt-5 mx-2 bg-yellow-200">
        {filteredProducts &&
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`border border-yellow-400 p-4 mb-4 ${!product.enable ? 'opacity-50' : ''
                }`}
            >
              <p className="font-bold">Product: {product.name}</p>
              <p>Stock: {product.stock}</p>
              <div className="flex justify-between mt-4 gap-1">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(product._id)}
                >
                  Hide Product
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleUnlock(product._id)}
                >
                  Show Product
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => updateStock(product._id, 'increment')}
                >
                  Add Stock
                </button>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                  onClick={() => updateStock(product._id, 'decrement')}
                >
                  Remove Stock
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>

  );
};

export default ProductsDashboard;
