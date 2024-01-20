import { useContext } from "react";
import { Web3Context } from "@/Context/Web3Context";

const useWeb3Context = () => {
  return useContext(Web3Context);
};

export default useWeb3Context;
