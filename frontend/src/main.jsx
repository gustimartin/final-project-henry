import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/productsApi";
import NavBar from "../src/components/NavBar/NavBar";
import Footer from "./components/views/Footer.jsx";
import categories from "./features/categorySlice";
import products from "./features/productsSlice";
import cart, { getTotal } from "./features/cartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth0Provider } from "@auth0/auth0-react";
import user from "./features/userSlice.js";
import idUser from "./features/userIdSlice.js";
import publication from "./features/PublicationsSlice.js";
import ordes from "./features/ordesSlice.js";
import axios from "axios";


export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    products,
    categories,
    cart,
    user,
    idUser,
    publication,
    ordes,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
store.dispatch(getTotal());

axios.defaults.baseURL = 'http://localhost:3001'
// axios.defaults.baseURL = 'https://backendpf-production-b9df.up.railway.app'




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-kpcb1xpi7aaypegd.us.auth0.com"
      clientId="PTbYBGwYv0xFnKTDvp2VkKS0P6ZB6JVB"
      redirectUri={window.location.origin}
      scope="openid profile email"
    >
      <HashRouter>
        <ToastContainer />
        <Provider store={store}>
          <NavBar />
          <App />
          <Footer />
        </Provider>
      </HashRouter>
    </Auth0Provider>
  </React.StrictMode>
);