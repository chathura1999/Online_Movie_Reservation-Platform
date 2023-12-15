import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  movieListReducers,
  movieDetailsReducers,
  movieDeleteReducers,
  movieCreateReducers,
  movieUpdateReducers,
} from "./reducers/movieReducers";

import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducers,
  orderDetailsReducers,
  orderPayReducers,
  orderListMyReducers,
  orderListReducers,
} from "./reducers/orderReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  movieList: movieListReducers,
  movieDetails: movieDetailsReducers,
  movieDelete: movieDeleteReducers,
  movieCreate: movieCreateReducers,
  movieUpdate: movieUpdateReducers,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducers,
  orderListMy: orderListMyReducers,
  orderList: orderListReducers,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const bookingFromStorage = localStorage.getItem("bookingData")
  ? JSON.parse(localStorage.getItem("bookingData"))
  : {};

const initialState = {
  cart: { cartItems: cartItemsFromStorage, bookingData: bookingFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
