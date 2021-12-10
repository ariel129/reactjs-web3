import React, { createContext, useEffect, useReducer } from "react";
import { reducers } from "context/reducers";
import { InitialState, InitialValue } from "context/states";

export const ContextChain = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<any>;
}>({ state: InitialValue, dispatch: () => null });

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, InitialValue, () => {
    const local = localStorage.getItem("chain_state");

    return local ? JSON.parse(local) : InitialValue;
  });

  useEffect(() => {
    localStorage.setItem("chain_state", JSON.stringify(state));
  }, [state]);

  return (
    <ContextChain.Provider value={{ state, dispatch }}>
      {children}
    </ContextChain.Provider>
  );
};
