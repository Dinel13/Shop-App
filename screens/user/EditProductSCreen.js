import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButtonCustm from "../../components/UI/HeaderButton";
import { updateProduct, createProduct } from "../../store/action/actionProduct";
import { cos } from "react-native-reanimated";

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

  const textChangeHnadler = (inputType, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_UPDATE,
      value: text,
      isValid: isValid,
      input: inputType,
    });
  };

  return (
    <ScrollView>
      <View style={style.form}>
        <View style={style.formControl}>
          <Text style={style.label}>Title</Text>
          <TextInput
            style={style.input}
            value={formState.inputValue.title}
            onChangeText={textChangeHnadler.bind(this, "title")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
        </View>
        {!formState.inputValidities.title && <Text>title kosong</Text>}
        <View style={style.formControl}>
          <Text style={style.label}>ImageUrl</Text>
          <TextInput
            style={style.input}
            value={formState.inputValue.imageUrl}
            onChangeText={textChangeHnadler.bind(this, "imageUrl")}
          />
        </View>
        {editedProduct ? null : (
          <View style={style.formControl}>
            <Text style={style.label}>Price</Text>
            <TextInput
              style={style.input}
              value={formState.inputValue.price}
              onChangeText={textChangeHnadler.bind(this, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={style.formControl}>
          <Text style={style.label}>Description</Text>
          <TextInput
            style={style.input}
            value={formState.inputValue.description}
            onChangeText={textChangeHnadler.bind(this, "description")}
          />
        </View>
      </View>
    </ScrollView>
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
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductSCreen;
