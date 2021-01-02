
// Import the tests
import { reducer } from '../utils/reducers';

// Import the actions defined in \client\src\utils\actions.js
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
  } from '../utils/actions';
  
  // Create a sample of what the global state will look like
  const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
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

  // Test to see if we can change categories
  test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CURRENT_CATEGORY,          // the type of action to perform, defined earlier
      currentCategory: '2'                    // represents the new data we want to use with the action
    });
  
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
  });