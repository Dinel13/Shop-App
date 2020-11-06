import React, {useState} from "react";
import { StyleSheet} from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import ProductReducer from "./store/reducers/product";
import CartReducer from "./store/reducers/cart";
import OrderReducer from "./store/reducers/order";
import ShopNavigator from './navigations/ShopNavigator'

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrderReducer
});

const store = createStore(rootReducer);

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setfontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFont} onFinish={() => setfontLoaded(true)} />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
