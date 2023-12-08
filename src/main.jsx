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


//bugs -> 
// category filter without query parameeters
// does not filer of sizes
// what if product does not have size and color

//next feature will be ->
//account page setting
//better ui cards
//add to favourite page 