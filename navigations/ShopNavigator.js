import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import ProductOverScreen from "../screens/shop/ProductOverSCreen";
import ProductDeatilScreen from "../screens/shop/ProductDetailSCreen";
import Color from "../constants/Color";

const ProductNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverScreen,
    ProductDetail: ProductDeatilScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Color.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
    },
  }
);

export default createAppContainer(ProductNavigator);
