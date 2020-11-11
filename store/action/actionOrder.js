import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatch ,getState) => {
    const userId = getState().auth.userId
    try {
      const response = await fetch(
        `https://rn-academind-db769.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("someting wrong");
      }

      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].CartItem,
            resData[key].totalAmout,
            new Date(resData[key].date) //mengubah string jadi object date
          )
        );
      }
      dispatch({ type: SET_ORDER, orders: loadedOrders });
    } catch (err) {
      //send to custom analitic serever
      throw err;
    }
  };
};

export const addOrder = (CartItem, totalAmout) => {
  return async (dispatch, getState) => {
  const token = getState().auth.token
  const userId = getState().auth.userId
  const date = new Date().toISOString();
    //code async
    const response = await fetch(
      `https://rn-academind-db769.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CartItem, totalAmout, date: date }),
      }
    );

    if (!response.ok) {
      throw new Error("something wrong");
    }
    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: CartItem,
        amount: totalAmout,
        date: date,
      },
    });
  };
};
