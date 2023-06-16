import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { setById } from "../../features/productsSlice";
import { getProductsById } from "../../features/productsSlice";
import { setCart } from "../../features/cartSlice";
import { getTotal } from "../../features/cartSlice";
import RelaitedProducts from "./RelaitedProducts";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

function CardDetail() {
  const { id } = useParams();
  let { isAuthenticated, loginWithPopup } = useAuth0();

  const {
    productId: { name, price, image, category, description, stock, enable },
  } = useSelector((state) => state.products);
  const detail = { name, price, image, id, stock, enable };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  const amount = cart.cartItem;
  let stockControl = "";
  for (let i = 0; i < amount.length; i++) {
    stockControl = amount[i].cartAmount;
  }

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);
  const HandleAddToCart = (detail) => {
    if (isAuthenticated) {
      if (detail.stock === 0) {
        toast.error("we are trully sorry, there is no more stock left 😔", {
          position: "bottom-left",
        });
      } else if (stockControl === detail.stock) {
        toast.error("we are trully sorry, there is no more stock left 😔", {
          position: "bottom-left",
        });
      } else {
        dispatch(setCart(detail));
      }
    } else {
      loginWithPopup();
    }
  };
  return (
    <>
      <div className="  h-screen w-full flex bg-cover bg-[url('/../bg2.jpg')]  bg-center ">
        <div className="max-w-md mx-auto justify-center  bg-amber-100 rounded-xl  overflow-hidden shadow-lg md:max-w-2xl  hover/edit:translate-x-0.5 hover/edit:bg-amber-200 self-center  ">
          <div className="md:flex">
            <img
              src={image}
              alt="image"
              className=" h-full w-full md:h-96
               mr-3 md:w-56 object-fill"
            />
            <ul className=" my-4 text-lg leading-relaxed ">
              <li className=" ">
                <h1 className=" font-semibold  text-yellow-900 "> product:</h1>
                <p>{name}</p>
              </li>
              <li>
                <h3 className=" font-semibold text-yellow-900 ">category:</h3>
                <p> {category}</p>{" "}
              </li>

              <li>
                <h3 className=" font-semibold text-yellow-900">description:</h3>
                <p>{description}</p>
              </li>
              <li>
                <button
                  onClick={() => {
                    HandleAddToCart(detail);
                    getTotal();
                  }}
                  className=" text-white cursor-pointer  p-2 flex justify-center rounded-md bg-yellow-900  hover:bg-amber-800  mt-4  w-3/4  "
                >
                  Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>{" "}
      <div className="  m-1 mb-6 ">
        <RelaitedProducts item={category} />
      </div>
    </>
  );
}

export default CardDetail;
