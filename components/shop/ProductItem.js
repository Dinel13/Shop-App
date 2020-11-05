import React from "react";
import { StyleSheet, View, Image, Text, Button } from "react-native";
import Color from "../../constants/Color";

const ProductItem = props => {
  return (
    <View style={style.product}>
        <View   style={style.imageCointainer}>
        <Image style={style.image} source={{ uri: props.imageUrl }} />
        </View>
      <View style={style.detail} >
      <Text style={style.title}>{props.title}</Text>
      <Text style={style.price}>${props.price}</Text>
      </View>
      <View style={style.action}>
        <Button color={Color.primary} title="View Detail" onPress={props.onViewDetail} />
        <Button color={Color.primary} title="To Cart" onPress={props.onAddToCart} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  imageCointainer : {
    width: "100%",
    height: "60%",
    borderTopRightRadius : 10,
    borderTopLeftRadius : 10,
    overflow : "hidden"
  },
  detail : {
      alignItems : "center",
      height : '15%',
      padding: 10
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height : '25%',
    paddingHorizontal : 20
  },
});

export default ProductItem;
