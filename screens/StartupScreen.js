import React, { useEffect } from "react";

import {
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import Color from "../constants/Color";
import { useDispatch } from "react-redux";
import { AuthWithData } from "../store/action/AuthAction";

const StartScreen = (props) => {
  console.log("asdasda");
  const dispatch = useDispatch();
  //tidak bisa useffect dikasi async jadi harus buat fungsi pembungkus di dalam
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformData = JSON.parse(userData);
      const { token, userId, expDate } = transformData;

      const expirationDate = new Date(expDate);

      if (expirationDate <= new Date() || !token || !userId) {
        console.log(expirationDate);
        props.navigation.navigate("Auth");
        return;
      }
      props.navigation.navigate("Shop");
      dispatch(AuthWithData(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={style.contaner}>
      <ActivityIndicator size="large" color={Color.primary} />
    </View>
  );
};

const style = StyleSheet.create({
  contaner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StartScreen;
