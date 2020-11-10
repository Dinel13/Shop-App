import { ADD_ORDER, SET_ORDER } from "../action/actionOrder";
import Order from "../../models/order";

const initailState = {
  orders: [],
};

export default (state = initailState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        orders : action.orders
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
