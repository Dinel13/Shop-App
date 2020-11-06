import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButtonCustm from "../../components/UI/HeaderButton";

import { deleteProduct } from "../../store/action/actionProduct";
import ProductItem from "../../components/shop/ProductItem";
import Color from "../../constants/Color";

const UserProductSCreen = (props) => {
  const userProcuts = useSelector((state) => state.products.userProduct);
  const dispatch = useDispatch()

  return (
    <FlatList
      data={userProcuts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Color.primary}
            title="Delete"
            onPress={() => {dispatch(deleteProduct(itemData.item.id))}}
          />
          <Button color={Color.primary} title="Edit" onPress={() => {}} />
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
  };
};

export default UserProductSCreen;
