import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import ProductOverScreen from "../screens/shop/ProductOverSCreen";
import ProductDeatilScreen from "../screens/shop/ProductDetailSCreen";
import CartScreen from '../screens/shop/CartScreen'
import Color from "../constants/Color";

const ProductNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverScreen,
    ProductDetail: ProductDeatilScreen,
    Cart : CartScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Color.primary : "",
      },
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
    },
  }
);

export default createAppContainer(ProductNavigator);
