import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Color from "../../constants/Color";
import { rempoveFromCart } from "../../store/action/actionCart";
import { addOrder } from "../../store/action/actionOrder";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

const CartScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);

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

  const sendOrderHandler = async () => {
    setisLoading(true);
    dispatch(addOrder(cartItems, cartTotalAMount));
    setisLoading(false);
  };
  return (
    <View style={style.screen}>
      <Card style={style.sumary}>
        <Text style={style.texSumary}>
          Total :{" "}
          <Text style={style.textAmount}>
            ${Math.round(cartTotalAMount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="size" color={Color.primary} />
        ) : (
          <Button
            color={Color.accent}
            title="ortder NOW"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable={true}
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

CartScreen.navigationOption = {
  headerTitle: "Your Cart",
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
