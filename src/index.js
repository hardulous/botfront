import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BotProvider } from "./Util/BotContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BotProvider>
    <App />
  </BotProvider>
);
