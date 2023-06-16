// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { clearCart } from "../../features/cartSlice";

const SideBar = (props) => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.role);
  const { email } = props;
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef(null);
  let { logout, loginWithPopup, isAuthenticated, user } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    dispatch(clearCart());
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* <------------BOTON MENU----------> */}
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className={`inline-flex items-center p-2 ml-1 text-sm rounded-lghover:bg-yellow-700-2 focus:ring-gray-200 text-yellow-100 hover:bg-yellow-700 `}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {/* <------------SIDE BAR----------> */}
      <aside
        ref={sideBarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          !isOpen ? "-translate-x-full" : "sm:translate-x-0"
        }`}
      >
        <div className="h-full px-3 py-4 bg-yellow-900">
          <div className="mt-2 mb-3 flex items-center">
            <div className="ml-1 mr-1 w-8 h-8">
              <div className=" w-full h-full rounded-full overflow-hidden">
                
                {
                  isAuthenticated? <img
                  className="object-cover w-full h-full overflow-hidden"
                  src={user.picture}
                  alt={user.nickname}
                />: <img src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                 alt="" className="object-cover w-full h-full overflow-hidden"/>
                }
              </div>
            </div>

            <div className=" py-3">
              <p className="text-sm  text-gray-100 ">
                {email ? (
                  email
                ) : (
                  <button
                    onClick={loginWithPopup}
                    className="-ml-1 text-base rounded-lg bg-yellow-700 text-yellow-400 pl-24 pr-24 pt-1 pb-1 -mb-1"
                  >
                    Login
                  </button>
                )}
              </p>
            </div>
          </div>

          <ul className="space-y-3 font-medium h-5/6">
            {userRole === "admin" && (
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2  rounded-lg text-white  hover:bg-yellow-700"
                >
                  <svg
                    className="w-6 h-6 transition duration-75 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
            )}
            {userRole === "admin" && (
              <li>
                <Link
                  to="/createproduct"
                  className="flex items-center p-2 rounded-lg text-white  hover:bg-yellow-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Create product
                  </span>
                </Link>
              </li>
            )}

            {/* <li>
              <Link
                to="/profile"
                className="flex items-center p-2  rounded-lg text-white  hover:bg-yellow-700"
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </Link>
            </li> */}
            {/* {userRole === "admin" && (
              <li>
                <Link
                  to="/Dashboard/ordes"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-700"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap">Ordes</span>
                </Link>
              </li>
            )} */}

            {userRole !== "admin" && (
              <li>
                <Link
                  to="about"
                  className="flex items-center p-2  rounded-lg text-white hover:bg-yellow-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">About</span>
                </Link>
              </li>
            )}
            {userRole !== "admin" && (
              <li>
                <Link
                  to="/contact"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-4 transition duration-75 text-gray-400 "
                    fill="currentColor"
                    viewBox="0 0 62 62"
                  >
                    <path d="M60,0H4C1.789,0,0,1.789,0,4v40c0,2.211,1.789,4,4,4h8v12 c0,1.617,0.973,3.078,2.469,3.695C14.965,63.902,15.484,64,16,64c1.039,0,2.062-0.406,2.828-1.172L33.656,48H60c2.211,0,4-1.789,4-4 V4C64,1.789,62.211,0,60,0z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Contact</span>
                </Link>
              </li>
            )}
          </ul>

          <ul>
            {isAuthenticated && (
              <li className="mt-8">
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 pr-36 rounded-lg text-white  hover:bg-yellow-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6  text-gray-400 transform -scale-x-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"></path>
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
