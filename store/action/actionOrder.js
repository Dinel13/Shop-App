export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (CartItem, totalAmout) => {
  return async (dispatch) => {
    const date = new Date().toISOString();
    //code async
    const response = await fetch(
      "https://rn-academind-db769.firebaseio.com/orders/u1.json",
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
