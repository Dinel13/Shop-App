export const ADD_ORDER ="ADD_ORDER"

export const addOrder = (CartItem, totalAmout) => {
return  {
    type : ADD_ORDER,
    orderData  :{items : CartItem, amount : totalAmout}
}
}