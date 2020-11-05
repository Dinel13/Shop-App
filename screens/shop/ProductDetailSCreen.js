import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native";

import { useSelector } from "react-redux";

const ProductDetailSCreen = (props) => {
  const productId = props.navigation.getParam("productId");
  console.log(productId);
  const selectedProduct = useSelector((state) =>
    state.products.availableProduct.find((prod) => prod.id === productId)
  );

  return (
    <View style={style.screen}>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};
ProductDetailSCreen.navigationOptions = navData => {
     return {
       headerTitle : navData.navigation.getParam('productTitle')
    }

}


const style = StyleSheet.create({
  screen: {},
});

export default ProductDetailSCreen;
