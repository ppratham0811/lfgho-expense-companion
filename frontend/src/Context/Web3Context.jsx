import {createContext, useState} from "react";
import DAIabi from "../constant/DAI-abi.json";
import {ABI as abi} from "@/constant/abi";
import {useContractWrite, useContractRead} from "wagmi";

export const Web3Context = createContext();

const Web3ContextProvider = ({children}) => {
  const [contractAddress, setContractAddress] = useState(
    "0xF128920a8cBf98Ae62A94Fc3Bf94e4De82EE7081"
  );

  const {write: supplyLiquidity} = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "supplyLiquidity",
  });

  const {write: borrowGHO} = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "borrowGHO",
  });

  const {write: transferGHOToMetamask} = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "transferToMetamask",
  });

  const {write: approveDAI} = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "approveDAI",
  });

  const DAIaddress = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357";
  const aDAIaddress = "0x29598b72eb5CeBd806C5dCD549490FdA35B13cD8";
  const GHOaddress = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";

  const {data: daiBalance} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceOf",
    args: [DAIaddress],
  });

  const {refetch: aDaiBalance} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceOf",
    args: [aDAIaddress],
    watch: true,
  });

  const {refetch: GHOBalance} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceOf",
    args: [GHOaddress],
  });

  const {refetch: getAllMembers} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAllMembers",
  });

  const {refetch: getAllFacilitators} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAllFacilitators",
  });

  const {write: transferDAI} = useContractWrite({
    address: DAIaddress,
    abi: DAIabi,
    functionName: "transfer",
  });

  const {write: addNewMember} = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addMember",
  });

  const {write: addNewFacilitator} = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addFacilitator",
  });

  const {write: toggleFacilitator} = useContractWrite({
    address: contractAddress,
    abi,
    functionName: "toggleMemberState",
  });

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
        getAllFacilitators,
        GHOBalance,
        addNewMember,
        addNewFacilitator,
        toggleFacilitator,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
