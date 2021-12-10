import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from "react-toastify";

import { Wallet } from "pages/Wallet";
import { getLibrary } from "sevices/connetors";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
      <ToastContainer />
    </Web3ReactProvider>
  );
};

export default App;
