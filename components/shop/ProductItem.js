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
import Color from "../../constants/Color";

const ProductItem = (props) => {
  let ToucableView = TouchableOpacity;

  if (Platform.OS === "android") {
    ToucableView = TouchableNativeFeedback;
  }

  return (
    <View style={style.product}>
      <View style={style.toucable}>
        <ToucableView onPress={props.onSelect} useForeground>
          <View>
            <View style={style.imageCointainer}>
              <Image style={style.image} source={{ uri: props.imageUrl }} />
            </View>
            <View style={style.detail}>
              <Text style={style.title}>{props.title}</Text>
              <Text style={style.price}>${props.price}</Text>
            </View>
            <View style={style.action}>{props.children}</View>
          </View>
        </ToucableView>
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
  toucable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imageCointainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  detail: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
