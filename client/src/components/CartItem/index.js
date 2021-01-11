

import React from 'react';

import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

// Import the helper function to deal with the local (off-line) database.
import { idbPromise } from "../../utils/helpers";


const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  // Function to remove an item from the cart
  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });

    // Also remove the item from local storage (IndexedDB)
    idbPromise('cart', 'delete', { ...item });
  };

  // Function to handle changing quantities in the cart
  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });

      // Clear local storage also
      idbPromise('cart', 'delete', { ...item }); 

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });

      // Update the quantity in local storage also
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  };


  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;