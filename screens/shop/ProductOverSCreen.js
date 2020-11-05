import React from "react";
import { FlatList} from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductOverScreen = (props) => {
  const produts = useSelector((state) => state.products.availableProduct);
  return (
    <FlatList
      data={produts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductOverScreen.navigationOptions = {
  headerTitle: "All Product",
};

export default ProductOverScreen;
