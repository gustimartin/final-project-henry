import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCart } from "../../features/cartSlice";
import { getTotal } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

function Card({
  id,
  name,
  image,
  price,
  description,
  stock,
  category,
  enable,
}) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let { isAuthenticated, loginWithPopup } = useAuth0();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const product = { name, price, stock, image, id, category };
  const amount = cart.cartItem;
  let stockControl = "";
  for (let i = 0; i < amount.length; i++) {
    stockControl = amount[i].cartAmount;
  }
  const HandleAddToCart = (product) => {
    if (isAuthenticated) {
      if (product.stock === 0) {
        toast.error("we are trully sorry, there is no more stock left 😔", {
          position: "bottom-left",
        });
      } else if (stockControl === product.stock) {
        toast.error("we are trully sorry, there is no more stock left 😔", {
          position: "bottom-left",
        });
      } else {
        dispatch(setCart(product));
      }
    } else {
      loginWithPopup();
    }
  };
  return (
    <div className="max-w-md w-pxmx-auto bg-amber-50 rounded-xl shadow-md overflow-hidden  h-48 hover/edit:translate-x-0.5  hover/edit:bg-amber-200">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={image}
            width="200"
            alt="image"
          />
        </div>
        <div className="p-1">
          <div className="uppercase tracking-wide text-sm   text-yellow-900 font-semibold">
            {name}
          </div>

          <p className="block  text-lg leading-tight font-medium text-black ">
            price: ${price}
          </p>
          <p className="block   text-lg leading-tight font-medium text-black ">
            stock: {stock}
          </p>

          <p className=" text-black text-lg ">category: {category}</p>
          <Link to={`/categories/products/${id}`}>
            <button className=" text-white w-28 cursor-pointer p-2 flex justify-center rounded-md bg-yellow-900  hover:bg-amber-800  mt-1">
              Detail
            </button>
          </Link>
          <button
            onClick={() => {
              HandleAddToCart(product);
              getTotal();
            }}
            className=" text-white cursor-pointer w-28 p-2 flex justify-center rounded-md bg-yellow-900  hover:bg-amber-800  mt-1  "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
