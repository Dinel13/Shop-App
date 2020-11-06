import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import React from 'react'
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductOverScreen from "../screens/shop/ProductOverSCreen";
import ProductDeatilScreen from "../screens/shop/ProductDetailSCreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScren";
import Color from "../constants/Color";

const navigationOptions = {
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
};

const ProductNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverScreen,
    ProductDetail: ProductDeatilScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: navigationOptions,
  }
);

const OrderNavigation = createStackNavigator(
  {
    Order: OrderScreen,
  },
  {
    //add icon to drawer item
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: navigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Product: ProductNavigator,
    Order: OrderNavigation,
  },
  {
    contentOptions: {
      activeTintColor: Color.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
