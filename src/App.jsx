import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from './Components/ProductDetsils/ProductDetails';
import AuthContextProvider from "./Context/AuthContext";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import NotFound from "./Components/NotFound/NotFound";
import WishListContext from "./Components/WishListContext/WishListContext";
import ForgetPass from "./Components/ForgetPass/ForgetPass";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
     
        <NotFound />
     
    ),
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          
            <Home />
          
        ),
      },
      {
        path: "home",
        element: (
          
            <Home />
          
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetPass", element: <ForgetPass /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          
            <Products />
         
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          
            <ProductDetails />
         
        ),
      },
      {
        path: "brands",
        element: (
         
            <Brands />
          
        ),
      },
      {
        path: "categories",
        element: (
         
            <Categories />
          
        ),
      },
    ],
  },
]);

export default function App() {
  const reactQueryConfig = new QueryClient();
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishListContext>
            <QueryClientProvider client={reactQueryConfig}>
              <RouterProvider router={router} />
              <Toaster />
            </QueryClientProvider>
          </WishListContext>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}
