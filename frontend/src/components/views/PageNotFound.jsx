import { useAuth0 } from "@auth0/auth0-react";



function PageNotFound() {

  let { loginWithPopup } = useAuth0();

  return (
    <div
      className=" flex flex-col items-center justify-center text-gray-500 h-screen
      text-9xl bg-yellow-200"
    >
      <h2 className="">Log In</h2>
      <p className=" text-7xl">please login to continue to enjoy this website</p>
      <button
                    onClick={loginWithPopup}
                    className="-ml-1 text-base rounded-lg bg-yellow-700 text-yellow-400 pl-24 pr-24 pt-1 pb-1 -mb-1"
                  >
                    Login
                  </button>
    </div>
  );
}

export default PageNotFound;
