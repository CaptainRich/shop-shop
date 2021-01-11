import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

// Import the action and context Hook functionality
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';

// Import the helper function to deal with the local (off-line) database.
import { idbPromise } from "../../utils/helpers";


function ProductList({  }) {
// function ProductList({ currentCategory }) {
//   const { loading, data } = useQuery(QUERY_PRODUCTS);

//   const products = data?.products || [];

//   function filterProducts() {
//     if (!currentCategory) {
//       return products;
//     }

//     return products.filter(product => product.category._id === currentCategory);
//   }

 // Setup the hooks for the 'global state'.
const [state, dispatch] = useStoreContext();                 //retrieve the current state from the global object
const { currentCategory } = state;                           //need to only destructure 'currentCategory' here
const { loading, data } = useQuery(QUERY_PRODUCTS);          //get the products

useEffect(() => {
  if (data) {                                                // if there is data to store
    dispatch({                                               // store it in the global state
      type: UPDATE_PRODUCTS,
      products: data.products
    });
    
    // Also take each product and save it to IndexedDB using the helper function 
    data.products.forEach((product) => {
      idbPromise('products', 'put', product);
    });
  }

  // Handle the possibility that 'loading' is undefined, i.e. no connection to the server
  else if (!loading) {
    // Assume we're offline, get all of the data from the `products` store
    idbPromise('products', 'get').then((products) => {
      // Use retrieved data to set global state for offline browsing
      dispatch({
        type: UPDATE_PRODUCTS,
        products: products
      });
    });
  }
}, [data, loading, dispatch]);

function filterProducts() {
  if (!currentCategory) {
    return state.products;
  }

  return state.products.filter(product => product.category._id === currentCategory);
}

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
