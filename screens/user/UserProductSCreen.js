import React from "react";
import { FlatList, Button, Alert, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButtonCustm from "../../components/UI/HeaderButton";

import { deleteProduct } from "../../store/action/actionProduct";
import ProductItem from "../../components/shop/ProductItem";
import Color from "../../constants/Color";

const UserProductSCreen = (props) => {
  const userProcuts = useSelector((state) => state.products.userProduct);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("are you sure?", "this will delete", [
      {
        text: "No",
        style: "deafult",
      },
      {
        text: "yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  if (userProcuts.length === 0) {
    return <View style={{flex : 1, justifyContent : 'center', alignItems:'center'}}>
      <Text>Tidak ada produk, silahkan tambahkan</Text>
    </View>
  }

  return (
    <FlatList
      data={userProcuts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            props.navigation.navigate("EditProduct", {
              productId: itemData.item.id,
            });
          }}
        >
          <Button
            color={Color.primary}
            title="Edit"
            onPress={() => {
              props.navigation.navigate("EditProduct", {
                productId: itemData.item.id,
              });
            }}
          />
          <Button
            color={Color.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductSCreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Product",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustm}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustm}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductSCreen;
