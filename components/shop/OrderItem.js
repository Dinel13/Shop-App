import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";

import CartItem from "../../components/shop/CartItem";
import Color from "../../constants/Color";

const OrderItem = (props) => {
  const [showDetail, setshowDetail] = useState(false);
  return (
    <View style={style.OrderItem}>
      <View style={style.sumary}>
        <Text style={style.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={style.date}>{props.date}</Text>
      </View>
      <Button
        color={Color.primary}
        title={showDetail ? 'Hide Detail' : "show Detail"}
        onPress={() => {
          setshowDetail(prevState => !prevState);
        }}
      />
      {showDetail && (
        <View style={style.detail}>
          {props.items.map((cacrItem) => (
            <CartItem
            key={cacrItem.productId}
              quantity={cacrItem.quantity}
              title={cacrItem.productTitle}
              amount={cacrItem.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  OrderItem: {
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    elevation: 8,
    borderRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: "center",
  },
  sumary: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  amount: {
    fontSize: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
    fontFamily: "open-sans",
  },
  detail : {
    marginTop : 8,
    width : '100%'
  }
});

export default OrderItem;
