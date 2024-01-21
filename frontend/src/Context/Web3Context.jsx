import { createContext, useState } from "react";
import DAIabi from "../constant/DAI-abi.json";
import GHOabi from "../constant/GHO-abi.json";
import { ABI as abi } from "@/constant/abi";
import { useContractWrite, useContractRead } from "wagmi";
import { useToast } from "@/components/ui/use-toast";

export const Web3Context = createContext();

const Web3ContextProvider = ({ children }) => {
  // toast
  const { toast } = useToast();

  const [contractAddress, setContractAddress] = useState(
    "0xF785dE5A1bB5C419f2a26e2ccB8d12BD07d9Ad6e"
  );

  const DAIaddress = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357";
  const aDAIaddress = "0x29598b72eb5CeBd806C5dCD549490FdA35B13cD8";
  const GHOaddress = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";

  // contract read

  const { refetch: getDaiBalance } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceOf",
    args: [DAIaddress],
  });

  const {
    refetch: aDaiBalance,
    error: error1,
    isLoading: loading1,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceOf",
    args: [aDAIaddress],
    watch: true,
  });

  const {
    refetch: GHOBalance,
    error: error2,
    isLoading: loading2,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBalanceGHO",
  });

  const {
    refetch: getAllMembers,
    error: error3,
    isLoading: loading3,
    data: allMembers,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAllMembers",
  });

  const {
    refetch: getAllFacilitators,
    error: error4,
    isLoading: loading4,
    data: allFacilitators,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAllFacilitators",
  });

  const {
    data: getPool,
    error: error13,
    isLoading: loading13,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getPool",
  });

  const {
    refetch: getsuppliedAmt,
    error: error14,
    isLoading: loading14,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getsuppliedAmt",
  });

  const {
    refetch: getBorrowAmt,
    error: error15,
    isLoading: loading15,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getBorrowAmt",
  });

  const {
    refetch: getAllTransactions,
    error: error16,
    isLoading: loading16,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAllTransactions",
  });

  // contract write

  const {
    write: transferDAI,
    error: error5,
    isLoading: loading5,
    isSuccess: transferDAIisSuccess,
  } = useContractWrite({
    address: DAIaddress,
    abi: DAIabi,
    functionName: "transfer",
  });

  const { write: transferGHO } = useContractWrite({
    address: GHOaddress,
    abi: GHOabi,
    functionName: "transfer",
  });

  const {
    write: addNewMember,
    error: error6,
    isLoading: loading6,
    isSuccess: addNewMemberisSuccess,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addMember",
  });

  const {
    write: addNewFacilitator,
    error: error7,
    isLoading: loading7,
    isSuccess: addNewFacilitatorisSuccess,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addFacilitator",
  });

  const {
    write: toggleFacilitator,
    error: error8,
    isLoading: loading8,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: "toggleMemberState",
  });

  const {
    write: supplyLiquidity,
    error: error9,
    isLoading: loading9,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "supplyLiquidity",
  });

  const {
    write: borrowGHO,
    error: error10,
    isLoading: loading10,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "borrowGHO",
  });

  const {
    write: transferGHOToMetamask,
    error: error11,
    isLoading: loading11,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "transferToMetamask",
  });

  const {
    write: approveDAI,
    error: error12,
    isLoading: loading12,
    isSuccess: approveDAIisSuccess,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "approveDAI",
  });

  const {
    write: transferToUser,
    error: error17,
    isLoading: loading17,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "transferToUser",
  });

  const {
    write: withdrawDAI,
    error: error18,
    isLoading: loading18,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "withdrawDAI",
  });

  const {
    write: sendGhoCrossChain,
    error: error19,
    data: crossChainHash,
    isLoading: loading19,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: "transferTokensPayLINK",
  });

  // if (
  //   error1 ||
  //   error2 ||
  //   error3 ||
  //   error4 ||
  //   error5 ||
  //   error6 ||
  //   error7 ||
  //   error8 ||
  //   error9 ||
  //   error10 ||
  //   error11 ||
  //   error12 ||
  //   error13 ||
  //   error14 ||
  //   error15 ||
  //   error16 ||
  //   error17

  // ) {
  //   toast({
  //     title: "Error",
  //     description:
  //       error1 ||
  //       error2 ||
  //       error3 ||
  //       error4 ||
  //       error5 ||
  //       error6 ||
  //       error7 ||
  //       error8 ||
  //       error9 ||
  //       error10 ||
  //       error11 ||
  //       error12 ||
  //       error13 ||
  //       error14 ||
  //       error15 ||
  //       error16 ||
  //       error17
  //   });
  // }

  // console.log(
  //   "allMembers",
  //   allMembers,
  //   "allFacilitators",
  //   allFacilitators,
  //   "from context"
  // );

  console.log(loading3, loading4, "loading context");
  return (
    <Web3Context.Provider
      value={{
        contractAddress,
        setContractAddress,
        transferDAI,
        approveDAI,
        getDaiBalance,
        supplyLiquidity,
        aDaiBalance,
        getAllMembers,
        getAllFacilitators,
        GHOBalance,
        addNewMember,
        addNewFacilitator,
        toggleFacilitator,
        getPool,
        borrowGHO,
        transferGHOToMetamask,
        getsuppliedAmt,
        getBorrowAmt,
        getAllTransactions,
        transferToUser,
        transferDAIisSuccess,
        withdrawDAI,
        addNewMemberisSuccess,
        addNewFacilitatorisSuccess,
        sendGhoCrossChain,
        loading6,
        loading7,
        loading12,
        approveDAIisSuccess,
        crossChainHash,
        transferGHO,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
