import {ModeToggle} from "@/components/Toggletheme";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {useAccount, useNetwork, useSwitchNetwork} from "wagmi";
import {disconnect} from "@wagmi/core";
import {toast} from "@/components/ui/use-toast";
import {ConnectKitButton} from "connectkit";
import {useTheme} from "next-themes";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useWeb3Context from "../hooks/useWeb3Context";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Menu} from "lucide-react";
import {ReloadIcon} from "@radix-ui/react-icons";

export default function Dashboard() {
  const {isConnected, address} = useAccount();
  const {chain} = useNetwork();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const {chains, switchNetwork} = useSwitchNetwork();

  // open all modals
  const [openStakingModal, setOpenStakingModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [sendGHOModal, setSendGHOModal] = useState(false);

  const [aDaiBalance, setaDaiBalance] = useState(0);
  const [GHOBalance, setGHOBalance] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [allMembers, setAllMembers] = useState([]);
  const [allFacilitatorsCount, setAllFacilitatorsCount] = useState([]);

  const {
    contractAddress,
    transferDAI,
    approveDAI,
    getDaiBalance,
    supplyLiquidity,
    aDaiBalance: getADAIBalance,
    GHOBalance: getGHOBalance,
    getAllMembers,
    getAllFacilitators,
    addNewMember,
    addNewFacilitator,
    toggleFacilitator,
    borrowGHO,
    getPool: poolAddress,
    transferGHOToMetamask,
    getsuppliedAmt,
    getBorrowAmt,
    getAllTransactions,
    transferToUser,
    withdrawDAI,
    transferDAIisSuccess,
    addNewMemberisSuccess,
    addNewFacilitatorisSuccess,
    loading6,
    loading7,
  } = useWeb3Context();

  // modal states
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [openFundContractModal, setOpenFundContractModal] = useState(false);
  const [openWithdrawDai, setOpenWithdrawDai] = useState(false);

  // imp functions
  const [suppliedAmt, setSuppliedAmt] = useState(0);
  const [borrowAmt, setBorrowAmt] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);

  // change function

  const [change, setChange] = useState(false);

  useEffect(() => {
    (async function () {
      let balance = await getADAIBalance();
      setaDaiBalance(balance.data);
      console.log("adai balance: ", balance);

      let daiBalance = await getDaiBalance();
      setDaiBalance(daiBalance.data);
      console.log("dai balance: ", daiBalance.data);

      let suppliedAmt = await getsuppliedAmt();
      setSuppliedAmt(suppliedAmt.data);
      console.log("suppliedAmt: ", suppliedAmt);

      let borrowAmt = await getBorrowAmt();
      setBorrowAmt(borrowAmt.data);
      console.log("borrowAmt: ", borrowAmt);

      let transactions = await getAllTransactions();
      setAllTransactions(transactions.data);
      console.log("transactions: ", transactions);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      let balance = await getGHOBalance();
      setGHOBalance(balance.data);
      console.log("GHO balance: ", balance);
    })();
  }, []);

  const fetchMembers = async () => {
    const allMembers = await getAllMembers();
    const arr = await getAllFacilitators();
    // console.log("allmem", allMembers, arr);
    let temp = {};
    for (let index = 0; index < allMembers.data.length; index++) {
      const address = allMembers.data[index];
      temp[address] = arr.data[index];
    }
    setAllMembers(temp);
    console.log(temp);
  };

  const getFacilitatorCount = async () => {
    let count = 0;
    Object.values(allMembers).map((val) => {
      if (val) {
        count++;
      }
    });
    setAllFacilitatorsCount(count);
  };

  useEffect(() => {
    getFacilitatorCount();
    fetchMembers();
  }, []);

  function addMemberDashboard({role, address}) {
    if (role === "facilitator") {
      addNewFacilitator({args: [address]});
    } else {
      addNewMember({args: [address]});
    }
  }

  useEffect(() => {
    if (!isConnected) {
      router.push("/connectwallet");
    }
  }, [isConnected, chain, router]);

  const Disconnect = async () => {
    await disconnect();
    router.push("/connectwallet");
    toast({
      title: "Disconnected",
      description: "Wallet disconnected successfully",
    });
  };

  useEffect(() => {
    (async function () {
      if (transferDAIisSuccess) {
        let daiBalance = await getDaiBalance();
        setDaiBalance(daiBalance.data);
      }
    })();
  }, [transferDAIisSuccess]);

  const theme = useTheme();

  const [direction, setDirection] = useState("left");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="h-screen flex items-center flex-col">
      <div className="absolute -top-[100px] left-0 -z-10 h-72 w-72 rounded-full bg-pink-400 blur-[500px]" />
      <div className="absolute -top-[100px] left-1/2 -z-10 h-72 w-72 -translate-x-1/2 transform rounded-full bg-blue-400 blur-[500px]" />
      <div className="absolute -top-[100px] right-0 -z-10 h-72 w-72 rounded-full bg-purple-400 blur-[500px]" />
      <Dialog
        open={openFundContractModal}
        onOpenChange={setOpenFundContractModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fund your Contract with DAI</DialogTitle>
            <DialogDescription className="h-fit">
              <Formik
                initialValues={{amount: ""}}
                onSubmit={(values) => {
                  console.log(values.amount * 1e18);
                  transferDAI({
                    args: [contractAddress, values.amount * 1e18],
                  });
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="w-full p-4 flex flex-col space-y-3">
                      <Label htmlFor="email" className="ml-1">
                        Amount
                      </Label>
                      <div className="w-full border-[1px] border-slate-200 rounded-lg flex flex-col">
                        <div className="flex h-[60%]">
                          <Field
                            as={Input}
                            name="amount"
                            type="number"
                            id="amount"
                            placeholder="0.00"
                            className="flex-1 appearance-none focus-visible:ring-0 shadow-none border-none outline-none text-lg"
                          />

                          <div className="flex gap-2 items-center pr-4">
                            <img
                              src="/dai.svg"
                              alt="dai"
                              className="h-5 aspect-square"
                            />
                            <p>DAI</p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" style={{marginTop: "20px"}}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openWithdrawDai} onOpenChange={setOpenWithdrawDai}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw your staked DAI</DialogTitle>
            <DialogDescription className="h-fit">
              <Formik
                initialValues={{amount: ""}}
                onSubmit={(values) => {
                  console.log(values.amount * 1e18);
                  withdrawDAI({
                    args: [values.amount * 1e18],
                  });
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="w-full p-4 flex flex-col space-y-3">
                      <Label htmlFor="email" className="ml-1">
                        Amount
                      </Label>
                      <div className="w-full border-[1px] border-slate-200 rounded-lg flex flex-col">
                        <div className="flex h-[60%]">
                          <Field
                            as={Input}
                            name="amount"
                            type="number"
                            id="amount"
                            placeholder="0.00"
                            className="flex-1 appearance-none focus-visible:ring-0 shadow-none border-none outline-none text-lg"
                          />

                          <div className="flex gap-2 items-center pr-4">
                            <img
                              src="/dai.svg"
                              alt="dai"
                              className="h-5 aspect-square"
                            />
                            <p>DAI</p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" style={{marginTop: "20px"}}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="absolute top-4 left-5 md:hidden">
        <ConnectKitButton mode={theme.theme} />
      </div>
      <div className="absolute top-5 right-10">
        <div className="flex space-x-5 items-center">
          <Button
            variant="secondary"
            onClick={() => setOpenFundContractModal((prev) => !prev)}
            className="hidden xl:block"
          >
            Fund Contract
          </Button>
          <Button
            variant="secondary"
            onClick={() => setSendGHOModal((prev) => !prev)}
            className="hidden xl:block"
          >
            Send GHO
          </Button>
          <div className="hidden md:block">
            <ConnectKitButton mode={theme.theme} />
          </div>
          <div className="xl:hidden">
            <DropdownMenu className="xl:hidden">
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="xl:hidden">
                <DropdownMenuItem
                  onClick={() => setOpenFundContractModal((prev) => !prev)}
                >
                  Fund Contract
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSendGHOModal((prev) => !prev)}
                >
                  Send GHO
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Dialog open={sendGHOModal} onOpenChange={setSendGHOModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send GHO</DialogTitle>
            <div className="h-fit w-full">
              <DialogDescription>
                <div>
                  <Formik
                    initialValues={{amount: "", chain: ""}}
                    onSubmit={(values) => {
                      console.log(values.amount * 1e18);
                      supplyLiquidity({
                        args: [values.amount * 1e18],
                      });
                    }}
                  >
                    {(formik) => (
                      <Form>
                        <div className="w-full p-4 flex flex-col space-y-3">
                          <Label htmlFor="email" className="ml-1">
                            Amount
                          </Label>
                          <div className="w-full border-[1px] border-slate-200 h-16 rounded-lg flex flex-col">
                            <div className="flex h-[60%]">
                              <Field
                                as={Input}
                                name="amount"
                                type="number"
                                id="amount"
                                placeholder="0.00"
                                className="flex-1 appearance-none focus-visible:ring-0 shadow-none border-none outline-none text-lg"
                              />
                              <Select
                                onValueChange={(val) => {
                                  formik.setFieldValue("chain", val);
                                }}
                              >
                                <SelectTrigger className="w-fit shadow-none">
                                  <SelectValue placeholder="Select Chain" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="light" className="w-fit">
                                    <div className="flex gap-2 items-center pr-4">
                                      <img
                                        src="/eth.png"
                                        alt="eth"
                                        className="h-5 aspect-square"
                                      />
                                      <p>Sepolia Ethereum</p>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="dark">
                                    <div className="flex gap-2 items-center pr-4">
                                      <img
                                        src="/arbitrum.png"
                                        alt="arbitrum"
                                        className="h-5 aspect-square"
                                      />
                                      <p>Sepolia Arbitrum</p>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="ml-3 text-xs flex justify-between mr-3">
                              <div>$34</div>
                              <div className="flex text-xs gap-1">
                                <div>GHO Balance: 2</div>
                                <p className="font-bold cursor-pointer hover:bg-gray-200">
                                  MAX
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button type="submit" style={{marginTop: "20px"}}>
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </DialogDescription>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex w-full items-end justify-between py-10 sm:h-fit sm:justify-start sm:p-10">
        <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/girl.png"
            alt="girl"
            className="grid h-20 w-20 place-items-center rounded-full bg-white"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">Hello</h1>
            <p className="text-lg">Family Expense Tracker</p>
          </div>
        </div>
      </div>
      <div
        className="gap-3 w-full xl:h-[40%] px-8 grid"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
        }}
      >
        {/* <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div> */}

        <div className="min-w-[300px]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Staked
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Number(daiBalance) / 1e18} DAI
              </div>
              <p className="text-xs text-muted-foreground"> </p>
            </CardContent>
          </Card>
        </div>
        <div className="min-w-[300px]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                No of Facilatators
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allFacilitatorsCount}</div>
              <p className="text-xs text-muted-foreground"> </p>
            </CardContent>
          </Card>
        </div>
        <div className="min-w-[300px]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                aDAI Balance
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {Number(aDaiBalance) / 1e18}
              </div>
              {/* <p className="text-xs text-muted-foreground"> </p> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={async () => {
                        console.log("func inside refresh");
                        let balance = await getADAIBalance();
                        setaDaiBalance(balance.data);
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 p-1 h-5 aspect-square animate-button"
                      >
                        <path
                          d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      aDAI earns interest in real time. Click to check latest
                      value
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
        <div className="min-w-[300px]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GHO Balance</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Number(GHOBalance) / 1e18}
              </div>
              <p className="text-xs text-muted-foreground"> </p>
            </CardContent>
          </Card>
        </div>
        <div className="min-w-[300px]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Funds in Contract
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="text-2xl font-bold">
                {Number(daiBalance) / 1e18} DAI
              </div>
              <Button
                size="sm"
                onClick={() => {
                  console.log(daiBalance);
                  approveDAI({args: [daiBalance, poolAddress]});
                }}
              >
                Approve DAI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-4 p-8 xl:grid-cols-3 xl:grid-rows-5 w-full"
        // style={{gridTemplateColumns: `repeat(auto-fit, minmax(400px, 1fr))`}}
      >
        <Dialog open={addMemberModal} onOpenChange={setAddMemberModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription className="h-fit">
                <Formik
                  initialValues={{role: "", address: ""}}
                  onSubmit={(values, _) => {
                    addMemberDashboard(values);
                    console.log(values);
                  }}
                >
                  {(formik) => (
                    <Form className="py-5 flex flex-col space-y-6">
                      <div className="flex">
                        <Label htmlFor="address" className="w-[100px] my-auto">
                          Address:{" "}
                        </Label>
                        <Field
                          as={Input}
                          name="address"
                          type="text"
                          id="address"
                          placeholder="0x45fef..."
                          className="flex-1"
                        />
                        <ErrorMessage name="address" />
                      </div>
                      <div className="flex">
                        <Label htmlFor="role" className="w-[100px] my-auto">
                          Role:{" "}
                        </Label>
                        <Select
                          onValueChange={(val) => {
                            formik.setFieldValue("role", val);
                          }}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Enter Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facilitator">
                              Facilitator
                            </SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMessage name="role" />
                      </div>
                      {loading6 || loading7 ? (
                        <Button disabled>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                      ) : (
                        <Button type="submit">Submit</Button>
                      )}
                    </Form>
                  )}
                </Formik>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Card className="h-full w-full rounded-xl xl:row-span-full">
          <CardHeader className="flex flex-row items-center justify-between mt-1">
            <CardTitle className="">All Members</CardTitle>
            {/* {console.log(allMembers, "addr")} */}
            {allMembers && !allMembers[address] ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      className="m-0 w-fit cursor-not-allowed"
                      size={"sm"}
                      variant="outline"
                      onClick={() => setAddMemberModal((prev) => !prev)}
                      disabled
                    >
                      Add New Member
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Not a Facilitator</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                className="m-0 w-fit"
                size={"sm"}
                variant="outline"
                onClick={() => setAddMemberModal((prev) => !prev)}
              >
                Add New Member
              </Button>
            )}
          </CardHeader>
          <CardContent className="m-0 p-0 pb-4">
            <div className="card-scroll px-6 py-2 overflow-y-scroll space-y-8 h-full">
              {Object.keys(allMembers).map((memberAddress, index) => (
                <div className="flex items-center justify-between" key={index}>
                  <div className="flex">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {memberAddress.slice(2, 4)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 w-[100px]">
                      <p className="text-sm font-medium leading-none">
                        {memberAddress.slice(0, 8) +
                          "..." +
                          memberAddress.slice(-8)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {allMembers[memberAddress] ? "Facilitator" : "Member"}
                      </p>
                    </div>
                  </div>
                  <Select
                    onValueChange={() =>
                      toggleFacilitator({args: [memberAddress]})
                    }
                    disabled={address === memberAddress}
                    defaultValue={
                      allMembers[memberAddress] ? "facilitator" : "member"
                    }
                  >
                    <SelectTrigger className="w-[30%]">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="facilitator"
                        disabled={allMembers[memberAddress]}
                      >
                        Facilitator
                      </SelectItem>
                      <SelectItem
                        value="member"
                        disabled={!allMembers[memberAddress]}
                      >
                        Member
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="h-full w-full row-start-1 xl:row-end-3">
          <Dialog open={openStakingModal} onOpenChange={setOpenStakingModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Stake</DialogTitle>
                <DialogDescription className="h-fit">
                  <div>
                    <Formik
                      initialValues={{amount: ""}}
                      onSubmit={(values) => {
                        console.log(values.amount * 1e18);
                        supplyLiquidity({
                          args: [values.amount * 1e18],
                        });
                      }}
                    >
                      {(formik) => (
                        <Form>
                          <div className="w-full p-4 flex flex-col space-y-3">
                            <Label htmlFor="email" className="ml-1">
                              Amount
                            </Label>
                            <div className="w-full border-[1px] border-slate-200 h-16 rounded-lg flex flex-col">
                              <div className="flex h-[60%]">
                                <Field
                                  as={Input}
                                  name="amount"
                                  type="number"
                                  id="amount"
                                  placeholder="0.00"
                                  className="flex-1 appearance-none focus-visible:ring-0 shadow-none border-none outline-none text-lg"
                                />

                                <div className="flex gap-2 items-center pr-4">
                                  <img
                                    src="/dai.svg"
                                    alt="dai"
                                    className="h-5 aspect-square"
                                  />
                                  <p>DAI</p>
                                </div>
                              </div>
                              <div className="ml-3 text-xs flex justify-between mr-3">
                                <div>$34</div>
                                <div className="flex text-xs gap-1">
                                  <div>GHO Balance: 2</div>
                                  <p className="font-bold cursor-pointer hover:bg-gray-200">
                                    MAX
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Button type="submit">Submit</Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Card className="h-full w-full">
            <CardHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-1">
              <CardTitle>Your Supplies</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setOpenStakingModal((prev) => !prev)}
              >
                Stake
              </Button>
            </CardHeader>
            <CardContent className="px-3 pt- card-content">
              <Table>
                <TableHeader>
                  <TableRow className="">
                    <TableHead className="w-[100px]">Coin</TableHead>
                    {/* <TableHead>Balance</TableHead> */}
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-2">
                      <img
                        src="/dai.svg"
                        alt="dai"
                        className="h-6 aspect-square"
                      />
                      <p>DAI</p>
                    </TableCell>
                    <TableCell>Collateral</TableCell>
                    <TableCell className="text-right">
                      {Number(suppliedAmt) / 1e18} DAI
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => setOpenWithdrawDai((prev) => !prev)}
                        size="sm"
                        variant="outline"
                      >
                        Withdraw
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="h-full w-full xl:row-start-1 xl:row-end-3">
          <Dialog open={openWithdrawModal} onOpenChange={setOpenWithdrawModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Borrow</DialogTitle>
                <DialogDescription>
                  <Formik
                    initialValues={{amount: ""}}
                    onSubmit={(values) => console.log(values)}
                  >
                    {(formik) => (
                      <Form>
                        <div className="w-full p-4 flex flex-col space-y-3">
                          <Label htmlFor="email" className="ml-1">
                            Amount
                          </Label>
                          <div className="w-full border-[1px] border-slate-200 h-16 rounded-lg flex flex-col">
                            <div className="flex h-[60%]">
                              <Field
                                as={Input}
                                name="amount"
                                type="number"
                                id="amount"
                                placeholder="0.00"
                                className="flex-1 appearance-none focus-visible:ring-0 shadow-none border-none outline-none text-lg"
                              />

                              <div className="flex gap-2 items-center pr-4">
                                <img
                                  src="/gho.svg"
                                  alt="gho"
                                  className="h-5 aspect-square"
                                />
                                <p>GHO</p>
                              </div>
                            </div>
                            <div className="ml-3 text-xs flex justify-between mr-3">
                              <div>$34</div>
                              <div className="flex text-xs gap-1">
                                <div>GHO Balance: 2</div>
                                <p className="font-bold cursor-pointer hover:bg-gray-200">
                                  MAX
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button type="submit">Submit</Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Card className="h-full w-full">
            <CardHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-1">
              <CardTitle>GHO Borrowed</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setOpenWithdrawModal((prev) => !prev)}
              >
                Borrow GHO
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="">
                    <TableHead className="w-[100px]">Coin</TableHead>
                    {/* <TableHead>Balance</TableHead> */}
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-2">
                      <img
                        src="/gho.svg"
                        alt="gho"
                        className="h-6 aspect-square"
                      />
                      <p>GHO</p>
                    </TableCell>
                    <TableCell>Stable Coin</TableCell>
                    <TableCell className="text-right">
                      {Number(borrowAmt) / 1e18} GHO
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Repay
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="h-full w-full xl:row-start-3 xl:row-end-6 xl:col-span-2">
          <Card className="w-full overflow-y-scroll relative px-3 card-scroll h-[300px]">
            <CardHeader className="sticky top-0 bg-white dark:bg-background z-10">
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent className="card-content relative">
              <Table className="h-full w-full relative">
                <TableHeader className="bg-white dark:bg-background sticky top-0">
                  <TableRow>
                    <TableHead className="w-[100px]">Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Interacted with</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                {/* <div className="overflow-auto max-h-[300px]"> */}
                <TableBody>
                  {" "}
                  {/* Set a max height for the table body */}
                  {allTransactions.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.from.slice(0, 8) + "..." + item.from.slice(-8)}
                      </TableCell>
                      <TableCell>{item.transactionType}</TableCell>
                      <TableCell>
                        {allMembers[item.from] ? "Facilitator" : "Member"}
                      </TableCell>
                      <TableCell>
                        {item.interactedWith.slice(0, 8) +
                          "..." +
                          item.interactedWith.slice(-8)}
                      </TableCell>
                      <TableCell className="text-right">
                        {Number(item.amount) / 1e18}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* </div> */}
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
