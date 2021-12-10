import { InjectedConnector } from "@web3-react/injected-connector";

import { Web3Provider } from "@ethersproject/providers";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56],
});

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};
