import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "@app/store.ts";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "@styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
