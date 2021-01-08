

// Import the React hooks needed
import { useReducer } from 'react';

// Import the defined actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from "./actions";
  
  export const reducer = (state, action) => {
      switch (action.type) {
          // If action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
          case UPDATE_PRODUCTS:
              return {
                  ...state,                          // the 'spread' operator
                  products: [...action.products],
              };

          // If action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
          case UPDATE_CATEGORIES:
              return {
                  ...state,
                  categories: [...action.categories]
              };

          // If action type value is the value of `UPDATE_CURRENT_CATEGORY`, return a new state object with an updated categorY value.
          case UPDATE_CURRENT_CATEGORY:
              return {
                  ...state,
                  currentCategory: action.currentCategory
              };    
               
          // If action type value is the value of `ADD_TO_CART`, return a new state object with an updated shopping cart.
          case ADD_TO_CART:
              return {
                  ...state,
                  cartOpen: true,
                  cart: [...state.cart, action.product]   // this adds the new product to the end of the array
              };    
               
          // If action type value is the value of `ADD_MULTIPLE_TO_CART`, return a new state object with an updated shopping cart.
          case ADD_MULTIPLE_TO_CART:
              return {
                  ...state,
                  cart: [...state.cart, ...action.products]   // this adds the new product to the end of the array
              };    
 
         // Here the action is to remove items from the cart.
         case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
              return product._id !== action._id;              // keep all products whose id doesn't match the action._id
            });
          
            return {
              ...state,
              cartOpen: newState.length > 0,
              cart: newState
            }; 
            
         // The action to update an items quantity in the shopping cart.
         case UPDATE_CART_QUANTITY:
            return {
              ...state,
              cartOpen: true,
              cart: state.cart.map(product => {                          // return a new product array
                if (action._id === product._id) {                        // but if the 'id' matches, change the quantity
                    product.purchaseQuantity = action.purchaseQuantity;  // in this new array
                }
                return product;
              })
            };

         // Empty the shopping cart.
         case CLEAR_CART:
            return {
              ...state,
              cartOpen: false,
              cart: []
            };

         // Toggle the state of the cart.
         case TOGGLE_CART:
            return {
              ...state,
              cartOpen: !state.cartOpen
           };

          // If it's none of these actions, do not update state at all and keep things the same!
          default:
              return state;
      }
  };

  
  // Initialize the global state and provide functionality to update this state.
  export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }