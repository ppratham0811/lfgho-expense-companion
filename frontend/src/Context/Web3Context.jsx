import {createContext} from "react";

export const Web3Context = createContext({
  contractAddress: "0xD55eC042024d757d08a8A1F91985b0b53934Fb73",
});

const Web3ContextProvider = () => {
  <Web3Context.Provider value={{contractAddress}}></Web3Context.Provider>;
};

export default Web3ContextProvider;
