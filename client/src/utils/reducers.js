

// Import the React hooks needed
import { useReducer } from 'react';

// Import the define actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
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

          // If it's none of these actions, do not update state at all and keep things the same!
          default:
              return state;
      }
  };

  
  // Initialize the global state and provide functionality to update this state.
  export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }