

import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";


// Import the helper function to deal with the local (off-line) database.
import { idbPromise } from "../utils/helpers";



function Success() {


  // Get all of the 'just purchased' items from IndexedDB and add them to the database.
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    // Function to read from IndexedDB and call the addOrder mutation
    async function saveOrder() {

      const cart = await idbPromise('cart', 'get');       // get all of the items in the cart
      const products = cart.map(item => item._id);        // map the cart items into an array of IDs

      // Once we have the IDs, pass them to the mutation, then delete them from IndexedDB
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      // Redirect back to the hope page after 5 seconds
      setTimeout( () => {
        window.location.assign('/')}, 5000);
    }

    saveOrder();
  }, [addOrder]);


    return (
      <div>
        <Jumbotron>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
        </Jumbotron>
      </div>
    );
};


  export default Success;