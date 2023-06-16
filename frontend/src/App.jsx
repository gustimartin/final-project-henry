import "./App.css";
import Home from "../src/components/views/Home";
import FormProdutcs from "./components/formProducts/FormProducts";
import { Route, Routes } from "react-router-dom";
import Cards from "./components/products/Cards";
import CardDetail from "./components/products/CardDetail";
import Categories from "./components/categories/Categories";
import ProductByCategory from "./components/products/ProductByCategory";
import Cart from "./components/NavBar/cart/Cart";
import ContactUs from "./components/views/ContactUs";
import ChechOutSuccess from "./components/NavBar/cart/ChechOutSuccess";
import Dashboard from "./components/views/Dashboard";
import ProductsDashboard from "../src/components/Dashboard/Products";
import UsersDashboard from "../src/components/Dashboard/Users";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PageNotFound from "./components/views/PageNotFound";
import OrderDashboard from "../src/components/Dashboard/Order";
import About from "./components/views/About";
import SpacePublications from "./components/views/SpacePublications";
import BlockPage from "./components/views/BlockPage";
import Swal from "sweetalert2";
import Loader from "./components/loader/loader";



function App() {
  const userRole = useSelector((state) => state.user.role);
  const [enabled, setEnabled] = useState(null);

  let { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const checkEnable = async () => {
      try {
        const response = await axios.get(`/auth/enable?email=${user.email}`);
        const data = response.data;
        setEnabled(data);
        if (data === false) {
          Swal.fire({
            icon: 'error',
            title: 'Blocked',
            text: 'Your are blocked, contact with us for unblock you!',
            
          })
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user.email) {
      checkEnable();
    }
  }, [user]);

  return (
    <>
      <div>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/CheckoutSuccess" element={isAuthenticated? <ChechOutSuccess/> : <Loader/>}/>

          { enabled === null && (
          <>
          
          <Route path="/About" element={<About />} />
          <Route path="/categories/products" element={<Cards />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/products/:id" element={<CardDetail />} />
          <Route path="/categories/:id" element={<ProductByCategory />} />
          
         
          </>
          )}

          {enabled === false && (
            <>
              <Route path="/categories/products" element={<BlockPage />} />
              <Route path="/categories/products/:id" element={<BlockPage />} />
              <Route path="/categories/:id" element={<BlockPage />} />
              <Route path="/categories" element={<BlockPage />} />
              <Route path="/cart" element={<BlockPage />} />
              <Route path="/Contact" element={<BlockPage />} />
              <Route path="/CheckoutSuccess" element={<BlockPage />} />
              <Route path="/opinion" element={<BlockPage />} />
              {/* <Route path="/Dashboard/ordes" element={<BlockPage />} /> */}
              <Route path="/about" element={<BlockPage />} />

              {/* <Route path="/profile" element={<BlockPage />} /> */}

            </>
          )}

          {enabled === true && (
            <>
              <Route path="/categories/products" element={<Cards />} />
              <Route path="/categories/products/:id" element={<CardDetail />} />
              <Route path="/categories/:id" element={<ProductByCategory />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/Contact" element={<ContactUs />} />
              <Route path="/CheckoutSuccess" element={<ChechOutSuccess />} />
              <Route path="/opinion" element={<SpacePublications />} />

              

              {/* <Route path="/profile" element={<Profile />} /> */}

            </>
          )}


          <Route path="*" element={<PageNotFound />} />
          {userRole === "admin" && (
            <>
              <Route exact path="/createproduct" element={<FormProdutcs />} />
              <Route exact path="/Dashboard" element={<Dashboard />} />
              <Route
                exact
                path="/Dashboard/products"
                element={<ProductsDashboard />}
              />
              <Route
                exact
                path="/Dashboard/users"
                element={<UsersDashboard />}
              />
              {/* <Route
                exact
                path="/Dashboard/ordes"
                element={<OrderDashboard />}
              /> */}
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
