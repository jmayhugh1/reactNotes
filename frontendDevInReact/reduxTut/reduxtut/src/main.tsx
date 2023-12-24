import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux"; // comes to react-redux and not toolkit, works with the redux context api
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
// wrap the app in the provider and pass the store

  <Provider store={store}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
