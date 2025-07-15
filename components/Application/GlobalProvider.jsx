'use client'
import React from "react";
import { Provider } from "react-redux";
import Loading from "./Loading";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";

const GlobalProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default GlobalProvider;
