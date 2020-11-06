import PRODUCTS  from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../action/actionProduct';


const initialState = {
  availableProduct : PRODUCTS,
  userProduct : PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

const productReducers = (state = initialState, action) => {
  console.log(state.userProduct);
  switch(action.type){
    case DELETE_PRODUCT :
      return{
        ...state,
        userProduct : state.userProduct.filter(product => product.id !== action.pid),
        availableProduct :state.availableProduct.filter(product => product.id !== action.pid)
      }
  }
    return state;
};

export default productReducers;
