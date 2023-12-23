import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const rootelement = document.getElementById("root");
if (rootelement) {
  const root = ReactDOM.createRoot(rootelement);
  function ref() {
    root.render(<App />);
  }
  setInterval(ref, 1000);
}
