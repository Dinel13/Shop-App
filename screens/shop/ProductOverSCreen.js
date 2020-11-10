import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButtonCustm from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart, ADD_TO_CART } from "../../store/action/actionCart";
import Color from "../../constants/Color";
import { fetchProduct } from "../../store/action/actionProduct";
import { color } from "react-native-reanimated";

const ProductOverScreen = (props) => {
  const [error, seterror] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isRefersing, setisrefresing] = useState(false);
  const produts = useSelector((state) => state.products.availableProduct);
  const dispatch = useDispatch();

  const loadProduct = useCallback(async () => {
    seterror(null);
    setisrefresing(true);
    try {
      await dispatch(fetchProduct());
    } catch (error) {
      seterror(error.message);
    }
    setisrefresing(false);
  }, [dispatch, seterror, setisLoading]);

  useEffect(() => {
    setisLoading(true);
    loadProduct().then(() => {
      setisLoading(false);
    });
  }, [loadProduct, dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadProduct);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProduct]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (isLoading) {
    return (
      <View style={style.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }
  if (!isLoading && produts.lenght === 0) {
    return (
      <View style={style.centered}>
        <Text>no product found, tambahkan dulu</Text>
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View style={style.centered}>
        <Text>ERROR TERJADI</Text>
        <Button title="try again" onPress={loadProduct} color={Color.primary} />
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProduct}
      refreshing={isRefersing}
      data={produts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Color.primary}
            title="View Detail"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Color.primary}
            title="To Cart"
            onPress={() => {
              dispatch(addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductOverScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Product",
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
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const style = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductOverScreen;
