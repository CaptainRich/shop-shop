import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';


// Import the action and context Hook functionality
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

function Detail() {
  // const { id } = useParams();

  // const [currentProduct, setCurrentProduct] = useState({})

  // const { loading, data } = useQuery(QUERY_PRODUCTS);

  // const products = data?.products || [];

  // useEffect(() => {
  //   if (products.length) {
  //     setCurrentProduct(products.find(product => product._id === id));
  //   }
  // }, [products, id]);

const [state, dispatch] = useStoreContext();                 //retrieve the current state from the global object
const { id } = useParams();

const [currentProduct, setCurrentProduct] = useState({})     //local state here because "current product" is temporary   
const { loading, data } = useQuery(QUERY_PRODUCTS);

const { products } = state;                                  //need to only destructure 'products' here

useEffect(() => {
  if (products.length) {
    setCurrentProduct(products.find(product => product._id === id));   // only if there are products in the global state
  } else if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products
    });
  }
}, [products, data, dispatch, id]);     // the dependency array

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button>
              Add to Cart
            </button>
            <button>
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    </>
  );
};

export default Detail;
