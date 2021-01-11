

import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';

// Import the helper function to deal with the local (off-line) database.
import { idbPromise } from "../../utils/helpers";

// Import the modules needed for checkout/payment processing
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';

// Need this hook to invoke the checkout query when the user clicks 'submit'
import { useLazyQuery } from '@apollo/react-hooks';


// This is a 'test' key only, for Stripe.  This 'promise' performs the checkout redirect.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');



const Cart = () => {

    const [state, dispatch] = useStoreContext();   // establish a 'state' variable from the global store.
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // Check if there is data in the global state, if not retrieve it from local storage (IndexedDB).
    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
      
        if (!state.cart.length) {
          getCart();
        }
      }, [state.cart.length, dispatch]);   // The 'state.cart.length' dependency indicates if 'useEffect' runs again. 

    // This hook is for Stripe.
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);
      

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });           // update the 'state'
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }


    // This function loops over the items in the cart and puts their IDs into 'productIds' array.
    function submitCheckout() {
        const productIds = [];
      
        state.cart.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
          }
        });

        getCheckout({
            variables: { products: productIds }
          });
      }





    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role="img"
                    aria-label="trash">🛒</span>
            </div>
        );
    }

    // console.log(state)

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
                                <button onClick={submitCheckout}>
                                    Checkout
                                </button>
                                :
                                <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                    <h3>
                        <span role="img" aria-label="shocked">
                            😱
                        </span>
                        You haven't added anything to your cart yet!
                    </h3>
                )}
        </div>
    );
};

export default Cart;