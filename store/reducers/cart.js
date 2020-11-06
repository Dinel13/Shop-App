import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/actionCart";
import CartItem from "../../models/cart-Item";
import { ADD_ORDER } from "../action/actionOrder";
import { DELETE_PRODUCT } from "../action/actionProduct";

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
        updateOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updateOrNewCartItem = new CartItem(
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

    case REMOVE_FROM_CART: {
      const selectedCartItem = state.items[action.pId];
      const currentQty = state.items[action.pId].quantity;

      let updateCartItem;
      if (currentQty > 1) {
        const updatedItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.proPrice,
          selectedCartItem.proTitle,
          selectedCartItem.sum - selectedCartItem.proPrice
        );
        updateCartItem = { ...state.items, [action.pId]: updatedItem };
      } else {
        updateCartItem = { ...state.items };
        delete updateCartItem[action.pId];
      }

      return {
        ...state,
        items: updateCartItem,
        totalAmount: state.totalAmount - selectedCartItem.proPrice,
      };
    }
    case ADD_ORDER: {
      return initalState;
    }
    case DELETE_PRODUCT: {
      if (!state.items[action.pId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const updatetotalItems = state.items[action.pId].sum;
      delete updatedItems[action.pId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - updatetotalItems,
      };
    }
  }
  return state;
};
