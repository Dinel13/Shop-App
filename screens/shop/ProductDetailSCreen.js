import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, ADD_TO_CART } from "../../store/action/actionCart";

import Color from "../../constants/Color";

const ProductDetailSCreen = (props) => {
  const productId = props.navigation.getParam("productId");
  console.log(productId);
  const selectedProduct = useSelector((state) =>
    state.products.availableProduct.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={style.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={style.button}>
        <Button
          color={Color.primary}
          title="add to cart"
          onPress={() => {
            dispatch(addToCart(selectedProduct))
          }}
        />
      </View>
      <Text style={style.price}>${selectedProduct.price}</Text>
      <Text style={style.desc}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};
ProductDetailSCreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const style = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  desc: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  button: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailSCreen;
