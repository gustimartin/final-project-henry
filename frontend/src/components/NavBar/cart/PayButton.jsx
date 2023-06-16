import axios from "axios";
import { useSelector } from "react-redux";
// import getStripe from "./getStripe";
function PayButton({ item }) {
  const idUser = useSelector((state) => state.idUser);
  const userId = idUser.user;
  // console.log(userId);
  const handleCheckOut = async () => {
    // const stripe = await getStripe();

    // const response = await fetch("/stripe/stripe/create-checkout-session", {
    //   method: "post",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: {
    //     item,
    //     userId,
    //   },
    // });
    // const data = await response;
    // stripe.redirectToCheckout({ sessionId: data.id });

    axios
      .post("/stripe/stripe/create-checkout-session", {
        item,
        userId,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })

      .catch((error) => console.log(error));
  };
  return (
    <div>
      <button
        className=" max-w-full w-32 h-10 rounded-md font-normal bg-yellow-900 text-white cursor-pointer"
        onClick={() => handleCheckOut()}
      >
        Checkout
      </button>
    </div>
  );
}

export default PayButton;
