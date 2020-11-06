import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../constants/Color";

const CartItem = (props) => {
  return (
    <View style={style.cartItem}>
      <View style={style.itemData}>
        <Text style={style.quantity}>{props.quantity} </Text>
        <Text style={style.mainText}>{props.title}</Text>
      </View>
      <View style={style.itemData}>
        <Text style={style.mainText}>${props.amount}</Text>
        {props.deletable && (
          <TouchableOpacity onPress={props.onRemove} style={style.deleteButto}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cartItem: {
    backgroundColor: "white",
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 6,
    borderRadius: 7,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  deleteButto: {
    marginLeft: 20,
  },
});

export default CartItem;
