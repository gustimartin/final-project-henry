import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart, getTotal } from "../../../features/cartSlice";
import { Link } from "react-router-dom";
import { runFireworks } from "./confetti";
import Loader from "../../loader/loader";
import { useState } from "react";
// import axios from "axios";

function ChechOutSuccess() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // const success = () => {
  //   const res = axios.get("/stripe/stripe/success");
  //   let response = res.data;
  //   if (response === "paid") {
  //     console.log(response);
  //     dispatch(clearCart());
  //   }
  // };

  useEffect(() => {
    // success();
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    dispatch(clearCart());
    dispatch(getTotal());
    runFireworks();
  });
  return (
    <>
      {loading && <Loader/>}
      {!loading && <div className="  h-screen w-full flex  bg-slate-200  bg-cover bg-[url('/../bg3.jpg')]  bg-center ">
        <div
          className="max-w-md mx-auto justify-center h-96 w-9/12 backdrop-blur-md drop-shadow-lg bg-yellow-100 rounded-xl shadow-lg md:max-w-2xl  bg-opacity-10 hover/edit:translate-x-0.5 hover/edit:bg-yellow-400 hover/edit:bg-opacity-10 self-center  
        "
        >
          <h2 className="flex justify-center item-center text-6xl text-yellow-100 font-bold mt-4 mb-8 h-10">
            Congratulations!!
          </h2>
          <h3 className=" text-center text-7xl text-yellow-100">
            Checkout successfull !
          </h3>{" "}
          <div className="flex flex-row item-center justify-center space-x-8 mt-8 ">
            <Link to="/">
              <button className="max-w-full w-48 h-12 rounded-md font-normal bg-yellow-900 text-white cursor-pointer hover/edit:translate-x-0.5  hover/edit:text-yellow-400">
                {" "}
                Home
              </button>
            </Link>
            <Link to="/categories/products">
              <button className="max-w-full w-48 h-12 rounded-md font-normal bg-yellow-900 text-white cursor-pointer hover/edit:translate-x-0.5 hover/edit:text-yellow-400">
                {" "}
                Keep shopping!
              </button>
            </Link>
            <Link to="/opinion">
              <button className="max-w-full w-48 h-12 rounded-md font-normal bg-yellow-900 text-white cursor-pointer hover/edit:translate-x-0.5 hover/edit:text-yellow-400">
                {" "}
                Leave your comments here!
              </button>
            </Link>
          </div>
        </div>
      </div> }
      
    </>
  );
}

export default ChechOutSuccess;
