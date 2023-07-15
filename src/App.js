import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import {selectLoggedInUser} from './features/auth/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import Logout from './features/auth/Logout';
import ForgotPassword from './features/auth/ForgotPassword';
import AdminHome from './pages/AdminHome';
import ProtectedAdmin from './features/auth/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/ProductForm';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  
  },
  {
    path: "/admin",
    element:(
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    )
  
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  }
  ,{
    path:"/cart",
    element:<CartPage></CartPage>
  },
  {
    path:"checkout",
    element:<CheckoutPage></CheckoutPage>
  },
  {
    path:"product-details/:id",
    element:<ProductDetailsPage></ProductDetailsPage>
  },
  {
    path:"/admin/product-details/:id",
    element:(
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    )
  },
  {
    path:"/admin/product-form",
    element:(
      <ProtectedAdmin>
        <ProductForm></ProductForm>
      </ProtectedAdmin>
    )
  },
  {
    path:"order-success/:id",
    element:<OrderSuccessPage></OrderSuccessPage>
  },
  {
    path:"/orders",
    element:<UserOrderPage></UserOrderPage>
  },
  {
    path:"/profile",
    element:<UserProfilePage></UserProfilePage>
  },
  {
    path:"/logout",
    element:<Logout></Logout>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword></ForgotPassword>
  },
  {
    path:"*",
    element:<PageNotFound></PageNotFound>
  }
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
      <RouterProvider router={router} />

     </div>
  );
}

export default App;
