import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);


//loader -> firebase get cart data loader
//firebase 
//add to cart quantity counter
// stripe checkout
// styling ui
// navbar active class
//code review

//bugs -> 
// category filter without query parameeters
// does not filer of sizes
// what if product does not have size and color

//next feature will be
//account page setting
//better ui cards
//add to favourite page 

//FIREBASE LOGICS:
// 1. sign up with email , password,
// 2. auth with facebook
// 3. database k ander cart ka data giry ga, jis mei 