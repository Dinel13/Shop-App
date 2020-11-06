import React from "react";
import { StyleSheet, View, FlatList, Platform, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButtonCustm from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.order);
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <OrderItem
            items={itemData.item.items}
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
          />
        )}
      />
    </View>
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Order",
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

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default OrderScreen;
