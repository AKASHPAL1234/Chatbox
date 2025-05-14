import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Authprovider } from "./context/Authprovider";

createRoot(document.getElementById("root")).render(
 <Authprovider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Authprovider>
  
);
