import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productListSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';


export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import productReducer from '../features/product/productListSlice';
// import authReducer from '../features/auth/authSlice';
// import cartReducer from '../features/cart/cartSlice';
// import orderReducer from '../features/order/orderSlice';
// import userReducer from '../features/user/userSlice';

// export const store = configureStore({
//   reducer: {
//     product: productReducer,
//     auth: authReducer,
//     cart: cartReducer,
//     order: orderReducer,
//     user: userReducer,
//   },
//   middleware: [...getDefaultMiddleware(), thunk],
// });

