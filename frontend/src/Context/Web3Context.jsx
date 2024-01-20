import { createContext, useState } from "react";
import DAIabi from "../constant/DAI-abi.json";
import { ABI as abi } from "@/constant/abi";
import { useContractWrite, useContractRead } from "wagmi";

export const Web3Context = createContext();

const Web3ContextProvider = ({ children }) => {
  const [contractAddress, setContractAddress] = useState(
    "0xd49A69020D7DDA345aC0df4713193CfDB0b731D9"
  );

  const { write: supplyLiquidity } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "supplyLiquidity",
  });

  const { write: borrowGHO } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "borrowGHO",
  });

  const { write: transferGHOToMetamask } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "transferToMetamask",
  });

  const { write: approveDAI } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "approveDAI",
  });

  const DAIaddress = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357";
  const aDAIaddress = "0x29598b72eb5CeBd806C5dCD549490FdA35B13cD8";

  const { data: daiBalance } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceOf",
    args: [DAIaddress],
  });

  const { refetch: aDaiBalance } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceOf",
    args: [aDAIaddress],
  });

  const { refetch: getAllMembers } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAllMembers",
  });

  const { refetch: checkIfFacilitator } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "checkIfFacilitator",
  });

  const { write: transferDAI } = useContractWrite({
    address: DAIaddress,
    abi: DAIabi,
    functionName: "transfer",
  });

  // supplyLiquidity({ args: [amount] })
  // borrowGHO({ args: [amount] })
  // transferGHOToMetamask({ args: [amount] })

  // const contractAddress = "";

  return (
    <Web3Context.Provider
      value={{
        contractAddress,
        setContractAddress,
        transferDAI,
        approveDAI,
        daiBalance,
        supplyLiquidity,
        aDaiBalance,
        getAllMembers,
        checkIfFacilitator,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
