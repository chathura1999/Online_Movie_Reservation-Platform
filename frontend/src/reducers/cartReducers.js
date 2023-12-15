import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_BOOKING,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], bookingData: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const exitItem = state.cartItems.find((x) => x.movie === item.movie);

      if (exitItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.movie === exitItem.movie ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.movie !== action.payload),
      };
    case CART_SAVE_BOOKING:
      return {
        ...state,
        bookingData: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
        }
    default:
      return state;
  }
};
