<<<<<<< HEAD
import { createContext } from "react";
// import abi from '../lib/abi.json';
export const Web3Context = createContext();
=======
import {createContext} from "react";

export const Web3Context = createContext({
  contractAddress: "0xD55eC042024d757d08a8A1F91985b0b53934Fb73",
});
>>>>>>> b7dbf7d679c6a985155f5389de23f8e514970252

// const contractAddress = "";
const [contractAddress, setContractAddress] = useState("0xd49A69020D7DDA345aC0df4713193CfDB0b731D9")

const Web3ContextProvider = () => {
<<<<<<< HEAD
  <Web3Context.Provider value={{ contractAddress, setContractAddress }}></Web3Context.Provider>;
=======
  <Web3Context.Provider value={{contractAddress}}></Web3Context.Provider>;
>>>>>>> b7dbf7d679c6a985155f5389de23f8e514970252
};

export default Web3ContextProvider;
