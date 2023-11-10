import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import { Data_Provider } from "./contexts/Data_context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <Data_Provider>
        <App />
      </Data_Provider>
    </PrimeReactProvider>
  </StrictMode>
);
