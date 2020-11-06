import React from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Color from "../../constants/Color";
import { rempoveFromCart } from "../../store/action/actionCart";
import CartItem from "../../components/shop/CartItem";

const CartScreen = (props) => {
  const cartTotalAMount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const toArrayCart = [];
    for (const key in state.cart.items) {
      toArrayCart.push({
        productId: key,
        productTitle: state.cart.items[key].proTitle,
        productPrice: state.cart.items[key].proPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return toArrayCart.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  const dispatch = useDispatch();

  return (
    <View style={style.screen}>
      <FlatList></FlatList>
      <View style={style.sumary}>
        <Text style={style.texSumary}>
          Total : <Text style={style.textAmount}>${cartTotalAMount}</Text>
        </Text>
        <Button
          color={Color.accent}
          title="ortder NOW"
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              onRemove={() => {
                dispatch(rempoveFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    margin: 20,
  },
  sumary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  texSumary: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  totalAmount: {
    color: Color.accent,
  },
});

export default CartScreen;
