import React, { useReducer, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Color from "../../constants/Color";
import { Signup, Login } from "../../store/action/AuthAction";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updateValuew = {
      ...state.inputValue,
      [action.input]: action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updateFormIsValid = true;
    for (const key in updateValidities) {
      updateFormIsValid = updateFormIsValid && updateValidities[key];
    }
    return {
      formIsValid: updateFormIsValid,
      inputValidities: updateValidities,
      inputValue: updateValuew,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignup, setisSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = () => {
    let action;
    if (isSignup) {
      action = Signup(
        formState.inputValue.email,
        formState.inputValue.password
      );
    } else {
      action = Login(formState.inputValue.email, formState.inputValue.password);
    }
    dispatch(action);
  };

  const inputChangeHnadler = useCallback(
    (inputType, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputType,
      });
    },
    [dispatchFormState]
  );

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
              errorText="masukkan email yang betul"
              onInputChange={inputChangeHnadler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              secureTextEntry
              autoCapitalize="none"
              errorText="masukkan password yang betul"
              onInputChange={inputChangeHnadler}
              initialValue=""
              minLength={5}
            />
            <View style={style.buttonContain}>
              <Button
                title={isSignup ? "Sign up" : "Login"}
                color={Color.primary}
                onPress={authHandler}
              />
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up "} `}
                color={Color.accent}
                onPress={() => {
                  setisSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Autentication",
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
