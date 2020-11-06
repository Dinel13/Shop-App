import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../constants/Color";

const OrderItem = (props) => {
  return (
    <View style={style.OrderItem}>
      <View style={style.sumary}>
        <Text style={style.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={style.date}>{props.date}</Text>
      </View>
      <Button color={Color.primary} title="show details" />
        </View>
  );
};

const style = StyleSheet.create({
  OrderItem: {
    backgroundColor: "white",
    margin: 20,
    padding : 10,
    elevation : 8,
    borderRadius : 7,
    shadowColor : 'black',
    shadowOpacity : 0.26,
    shadowOffset : {width : 0, height : 2},
    shadowRadius : 8,
    alignItems : 'center'

  },
 sumary : {
    flexDirection: "row",
    justifyContent : 'space-between',
    width : '100%',
    alignItems: "center",
    marginBottom : 10,
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
});

export default OrderItem;
