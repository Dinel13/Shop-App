import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButtonCustm from "../../components/UI/HeaderButton";
import { updateProduct, createProduct } from "../../store/action/actionProduct";

const EditProductSCreen = (props) => {
  const prodId = props.navigation.getParam("productId");

  const editedProduct = useSelector((state) =>
    state.products.userProduct.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(prodId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price)); //+price menajdi numeric
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl]);

  //submitHandler jadi dependensi supay hanya sekli di buat karen tidak pernah berubah
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={style.form}>
        <View style={style.formControl}>
          <Text style={style.label}>Title</Text>
          <TextInput
            style={style.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
        </View>
        <View style={style.formControl}>
          <Text style={style.label}>ImageUrl</Text>
          <TextInput
            style={style.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={style.formControl}>
            <Text style={style.label}>Price</Text>
            <TextInput
              style={style.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={style.formControl}>
          <Text style={style.label}>Description</Text>
          <TextInput
            style={style.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
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
