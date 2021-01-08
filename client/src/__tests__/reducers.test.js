
// Import the tests
import { reducer } from '../utils/reducers';

// Import the actions defined in \client\src\utils\actions.js
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
  } from '../utils/actions';
  
  // Create a sample of what the global state will look like
  const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
    // Define the initial cart values for testing.
    cart: [
      {
        _id: '1',
        name: 'Soup',
        purchaseQuantity: 1
      },
      {
        _id: '2',
        name: 'Bread',
        purchaseQuantity: 2
      }
    ],
    cartOpen: false
  };

  // Test to see if we can add a product.
  test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
      type: UPDATE_PRODUCTS,                 // the type of action to perform, defined earlier
      products: [{}, {}]                     // represents the new data we want to use with the action
    });
  
    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
  });

  //Test to see if we can add a category.
  test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CATEGORIES,                // the type of action to perform, defined earlier
      categories: [{}, {}]                    // represents the new data we want to use with the action
    });
  
    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
  });
2
  // Test to see if we can change categories
  test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CURRENT_CATEGORY,          // the type of action to perform, defined earlier
      currentCategory: '2'                    // represents the new data we want to use with the action
    });
  
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
  });


  // Test to see if we can add an item to the shopping cart
  test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
      type: ADD_TO_CART,
      product: { purchaseQuantity: 1 }
    });
  
    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
  });

  
  // Test to see if we can add multiple items to the shopping cart
  test('ADD_MULTIPLE_TO_CART', () => {
    let newState = reducer(initialState, {
      type: ADD_MULTIPLE_TO_CART,
      products: [{}, {}]
    });
  
    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
  });


  // Test to see if we can remove items from the shopping cart
  test('REMOVE_FROM_CART', () => {
    let newState1 = reducer(initialState, {
      type: REMOVE_FROM_CART,
      _id: '1'
    });
  
    // The cart should still be open
    expect(newState1.cartOpen).toBe(true);
  
    // The second item should now be the first
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');
  
    let newState2 = reducer(newState1, {
      type: REMOVE_FROM_CART,
      _id: '2'
    });
  
    // The cart should be empty and closed
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);
  
    expect(initialState.cart.length).toBe(2);
  });


  // Test to see if the purchase quantity can be updated in the cart.
  test('UPDATE_CART_QUANTITY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CART_QUANTITY,
      _id: '1',
      purchaseQuantity: 3
    });
  
    expect(newState.cartOpen).toBe(true);
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    expect(newState.cart[1].purchaseQuantity).toBe(2);
  
    expect(initialState.cartOpen).toBe(false);
  });


  // Test to clear (empty) the shopping cart
  test('CLEAR_CART', () => {
    let newState = reducer(initialState, {
      type: CLEAR_CART
    });
  
    expect(newState.cartOpen).toBe(false);
    expect(newState.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
  });


  // Test the visibility toggle of the shopping cart.
  test('TOGGLE_CART', () => {
    let newState = reducer(initialState, {
      type: TOGGLE_CART
    });
  
    expect(newState.cartOpen).toBe(true);
    expect(initialState.cartOpen).toBe(false);
  
    let newState2 = reducer(newState, {
      type: TOGGLE_CART
    });
  
    expect(newState2.cartOpen).toBe(false);
  });