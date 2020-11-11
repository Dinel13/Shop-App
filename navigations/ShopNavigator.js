import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProductOverScreen from "../screens/shop/ProductOverSCreen";
import ProductDeatilScreen from "../screens/shop/ProductDetailSCreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScren";
import Color from "../constants/Color";
import UserProductSCreen from "../screens/user/UserProductSCreen";
import EditProductSCreen from "../screens/user/EditProductSCreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartScreen from "../screens/StartupScreen";
import { Logout } from "../store/action/AuthAction";

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

const AdminNavigation = createStackNavigator(
  {
    UserProduct: UserProductSCreen,
    EditProduct: EditProductSCreen,
  },
  {
    //add icon to drawer item
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
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
    Admin: AdminNavigation,
  },
  {
    contentOptions: {
      activeTintColor: Color.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logut"
              color={Color.primary}
              onPress={() => {
                dispatch(Logout());
                // tidak perlu lagi karena sudah di handle di fungsi logout
                //props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: navigationOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
