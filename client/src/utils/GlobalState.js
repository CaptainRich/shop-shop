

// Necessary imports
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';


// Instantiate the global state object
const StoreContext = createContext();      // this creates a new 'context' object, the container to hold global state.
const { Provider } = StoreContext;         // all 'context' objects have a 'provider' and a 'consumer' component
                                           // The 'consumer' is our means of grabbing the global data the 'provider' holds.

// Setup the global state with the 'useProductReducer' function (from reducers.js)                                           
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({      //'state' is the latest state, 'dispatch' is used to update state
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });

    // Use this to confirm everything works!
    // console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};      


// A custom 'React' hook
const useStoreContext = () => {
    return useContext(StoreContext);
  };


  export { StoreProvider, useStoreContext };
