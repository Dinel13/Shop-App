import { ADD_TO_CART } from "../action/actionCart";
import CartItem from "../../models/cart-Item";

const initalState = {
  items: {},
  totalAmount: 0,
};
export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updateOrNewCartItem;

      if (state.items[addedProduct.id]) {
        //product sudah ada di cart
        const updateOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        const updateOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
  }
  return state;
};
