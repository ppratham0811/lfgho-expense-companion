import { createContext } from "react";
// import abi from '../lib/abi.json';
export const Web3Context = createContext();

// const contractAddress = "";
const [contractAddress, setContractAddress] = useState("0xd49A69020D7DDA345aC0df4713193CfDB0b731D9")

const Web3ContextProvider = () => {
  <Web3Context.Provider value={{ contractAddress, setContractAddress }}></Web3Context.Provider>;
};

export default Web3ContextProvider;
