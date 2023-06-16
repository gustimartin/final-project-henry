import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PayButton from "./PayButton";
import { toast } from "react-toastify";

import {
  decreaseAmount,
  removeCartItem,
  setCart,
  clearCart,
  getTotal,
} from "../../../features/cartSlice";
function Cart() {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  // const [preferenceId, setPreferenceId] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);
  const { cartItem } = useSelector((store) => store.cart);

  const handelRemove = (cartItem) => {
    dispatch(removeCartItem(cartItem));
  };
  const handeldecrease = (cartItem) => {
    dispatch(decreaseAmount(cartItem));
  };
  const handleIncrement = (cartItem) => {
    if(cartItem.stock===cartItem.cartAmount){
      toast.error("we are trully sorry, there is no more stock left 😔", {
        position: "bottom-left",
      });
    } else {
      dispatch(setCart(cartItem));
    }

  };
  const handelClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className=" px-2  py-4 ">
      <h2 className=" font-normal text-3xl text-center ">Shooping Cart</h2>
      {cartItem.length === 0 ? (
        <div className=" text-xl mt-8 flex-col  flex items-center ">
          <p>your cart is empty</p>
          <div className=" ml-4 text-gray-500 flex items-center mt-4">
            <Link to="/categories/products">
              <span className=" ml-2"> Let`s shop</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className=" mt-8 mb-4 grid items-center grid-cols-4 gap-2">
            <h3 className=" text-sm font-normal uppercase pl-4">Product</h3>
            <h3 className=" text-sm font-normal uppercase">Price</h3>
            <h3 className=" text-sm font-normal uppercase">Amount</h3>
            <h3 className=" text-sm font-normal uppercase">Total</h3>
          </div>
          <div className="">
            {cartItem?.map((item) => (
              <div
                className=" grid grid-cols-4  gap-2 items-center border-t-2 p-4"
                key={item.id}
              >
                <div className="flex ">
                  <img
                    className=" w-24 max-w-full ml-0 rounded-md"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className=" ml-3">
                    <Link to={`../categories/products/${item.id}`}>
                      <h3 className=" text-sm font-normal uppercase">
                        {item.name}
                      </h3>
                    </Link>
                    <p>{item.category}</p>
                    <button
                      className=" mt-2 cursor-pointer text-stone-400"
                      onClick={() => handelRemove(item)}
                    >
                      remove
                    </button>
                  </div>
                </div>

                <div id="summary-price">${item.price}</div>
                <div className=" flex-start flex justify-center w-16  max-w-full border-s-2    border-x-2  rounded-md  ">
                  <button
                    className="p-3 cursor-pointer"
                    onClick={() => handeldecrease(item)}
                  >
                    -
                  </button>
                  <div className=" pt-3">{item.cartAmount}</div>
                  <button
                    className=" p-3  cursor-pointer"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className=" justify-self-start pr-4  font-bold">
                  ${(item.price * item.cartAmount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className=" flex-start flex justify-between pt-4 border-t-2 ">
            <button
              onClick={() => handelClearCart()}
              className=" max-w-full w-32  h-10 rounded-md ml-4 font-normal bg-yellow-900 text-white cursor-pointer"
            >
              Clear cart
            </button>
            <div className=" w-64 max-w-full mr-4">
              <div className=" flex justify-between  text-lg  ">
                <span>Subtotal</span>
                <span className=" font-bold mr-4">
                  {" "}
                  ${cart.total.toFixed(2)}
                </span>
              </div>

              <p className="  text-sm font-extralight my-2">Free shipping</p>
              {isAuthenticated ? (
                <PayButton item={cart.cartItem} />
              ) : (
                <button
                  className=" max-w-full w-32 h-10 rounded-md font-normal bg-yellow-900 text-white cursor-pointer"
                  onClick={() => loginWithPopup()}
                >
                  login in page
                </button>
              )}

              <div className=" mt-4">
                <Link to="/categories/products">
                  <span>Keep shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
