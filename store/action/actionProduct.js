import { localeData } from "moment";
import Product from "../../models/product";

export const DELETE_PRODUCT = " DELETE_PROCUT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProduct = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-academind-db769.firebaseio.com/products.json"
    );

    const resData = await response.json();
    const loadedProduct = [];
    for (const key in resData) {
      loadedProduct.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    dispatch({ type: SET_PRODUCT, products: loadedProduct });
  };
};

export const deleteProduct = (productid) => {
  return {
    type: DELETE_PRODUCT,
    pid: productid,
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    //code async
    const response = await fetch(
      "https://rn-academind-db769.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.id,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};
