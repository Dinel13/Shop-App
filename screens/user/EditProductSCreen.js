import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButtonCustm from "../../components/UI/HeaderButton";
import { updateProduct, createProduct } from "../../store/action/actionProduct";
import { cos } from "react-native-reanimated";
import Input from "../../components/UI/Input";

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

const EditProductSCreen = (props) => {
  const prodId = props.navigation.getParam("productId");

  const editedProduct = useSelector((state) =>
    state.products.userProduct.find((prod) => prod.id === prodId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("input salah", "cek kembali", [
        {
          text: "OKey",
        },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValue.title,
          formState.inputValue.description,
          formState.inputValue.imageUrl
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValue.title,
          formState.inputValue.description,
          formState.inputValue.imageUrl,
          +formState.inputValue.price //+price menajdi numeric
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  //submitHandler jadi dependensi supay hanya sekli di buat karen tidak pernah berubah
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={style.form}>
          <Input
            label="title"
            id="title"
            errorText="masukkan teks yangb betul"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHnadler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initialValid={!!editedProduct}
            required
          />
          <Input
            label="imageUrl"
            id="imageUrl"
            errorText="masukkan image url yangb betul"
            keyboardType="default"
            onInputChange={inputChangeHnadler}
            initialValue={editedProduct ? editedProduct.imageUrl: ""}
            initialValid={!!editedProduct}
            returnKeyType="next"
            required
          />
          {!editedProduct && (
            <Input
              label="price"
              id="price"
              errorText="masukkan angka harga yangb betul"
              keyboardType="decimal-pad"
              onInputChange={inputChangeHnadler}
              returnKeyType="next"
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="description"
            errorText="masukkan teks desciption yang betul"
            onInputChange={inputChangeHnadler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            initialValue={editedProduct ? editedProduct.description : ""}
            initialValid={!!editedProduct}
            numberOfLine={3}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductSCreen.navigationOptions = (navData) => {
  const submitFnct = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustm}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFnct}
        />
      </HeaderButtons>
    ),
  };
};

const style = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductSCreen;
