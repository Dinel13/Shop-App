import React from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Color from "../../constants/Color";

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={style.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={style.gardien}>
        <Card>
          <ScrollView style={style.authScreen}>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="masukkan email yang betul"
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              secureTextEntry
              autoCapitalize="none"
              errorMessage="masukkan password yang betul"
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={style.buttonContain}>
              <Button title="LOGIN" color={Color.primary} onPress={() => {}} />
              <Button
                title="Switch to SIGN-UP"
                color={Color.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Autentication',
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gardien: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authScreen: {
    width: "90%",
    padding: 20,
    maxHeight: 400,
    maxWidth: 400,
  },
  buttonContain: {
    marginTop: 10,
  },
});

export default AuthScreen;
