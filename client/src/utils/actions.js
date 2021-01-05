

// Define the actions needed - to maintain and update our state.
export const UPDATE_PRODUCTS         = "UPDATE_PRODUCTS";         // to store data retrieved for products and allow off-line persistance by storing in the global state
export const UPDATE_CATEGORIES       = "UPDATE_CATEGORIES";       // store categories in the global state
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY"; // connect UPDATE_CATEGORIES to UPDATE_PRODUCTS


// Define the actions to deal with the shopping cart.
export const ADD_TO_CART          = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART     = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART           = 'CLEAR_CART';
export const TOGGLE_CART          = 'TOGGLE_CART';

