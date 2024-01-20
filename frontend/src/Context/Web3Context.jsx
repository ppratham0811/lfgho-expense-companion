import { createContext, useState } from "react";
import DAIabi from '../constant/DAI-abi.json';
import { ABI as abi } from "@/constant/abi";
import { useContractWrite } from 'wagmi'

export const Web3Context = createContext();

const Web3ContextProvider = ({ children }) => {
  const [contractAddress, setContractAddress] = useState("0xd49A69020D7DDA345aC0df4713193CfDB0b731D9")

  const { write: supplyLiquidity } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'supplyLiquidity',
  })

  const { write: borrowGHO } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'borrowGHO',
  })

  const { write: transferGHOToMetamask } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'transferToMetamask',
  })


  const DAIaddress = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357";

  const { write: transferDAI } = useContractWrite({
    address: DAIaddress,
    abi: DAIabi,
    functionName: "transfer",
    args: [contractAddress, '1000000000000']
  })



  // supplyLiquidity({ args: [amount] })
  // borrowGHO({ args: [amount] })
  // transferGHOToMetamask({ args: [amount] })





  // const contractAddress = "";


  return <Web3Context.Provider value={{ contractAddress, setContractAddress, transferDAI }}>{children}</Web3Context.Provider>;
};

export default Web3ContextProvider;
