import React, {useState} from "react";
import { StyleSheet} from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ReduxThunk from 'redux-thunk'

import ProductReducer from "./store/reducers/product";
import CartReducer from "./store/reducers/cart";
import OrderReducer from "./store/reducers/order";
import AuthReducer from "./store/reducers/Auth";
import NavigatorContainer from "./navigations/navigationContaner";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrderReducer,
  auth : AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
      <NavigatorContainer />
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
