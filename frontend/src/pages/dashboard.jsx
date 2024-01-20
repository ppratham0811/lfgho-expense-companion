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

export default function Dashboard() {
  const {isConnected, address} = useAccount();
  const {chain} = useNetwork();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const {chains, switchNetwork} = useSwitchNetwork();
  console.log("chains switch", chain);

  // open all modals
  const [openStakingModal, setOpenStakingModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [sendGHOModal, setSendGHOModal] = useState(false);

  const {contractAddress, transferDAI} = useWeb3Context();

  const [addMemberModal, setAddMemberModal] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push("/connectwallet");
    }

    // if (isConnected && chain.id != 80001 && chain.id != 43113) {
    //   router.push("/switchnetwork");
    // }
  }, [isConnected, chain, router]);

  const Disconnect = async () => {
    await disconnect();
    router.push("/connectwallet");
    toast({
      title: "Disconnected",
      description: "Wallet disconnected successfully",
    });
  };

  const theme = useTheme();

  const [direction, setDirection] = useState("left");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="h-screen flex items-center flex-col">
      <div className="absolute top-5 right-10">
        <div className="flex space-x-5 items-center">
          <Button
            variant="secondary"
            onClick={() => setSendGHOModal((prev) => !prev)}
          >
            Send GHO
          </Button>
          <ConnectKitButton mode={theme.theme} />
          <ModeToggle />
        </div>
      </div>

      <Dialog open={sendGHOModal} onOpenChange={setSendGHOModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send GHO</DialogTitle>
            <div className="h-[500px] w-[600px]">
              <DialogDescription></DialogDescription>
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
            <p className="text-lg">Welcome to dashboard</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full h-[40%] space-around px-8 flex-wrap">
        {/* <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div>
        <div className="bg-purple-400 h-[150px] w-[20px] flex-1"></div> */}

        <div className="flex-1 min-w-[300px]">
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
              <div className="text-2xl font-bold">$100</div>
              <p className="text-xs text-muted-foreground"> </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 min-w-[300px]">
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
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground"> </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 min-w-[300px]">
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
              <div className="text-2xl font-bold">$100.222223455</div>
              {/* <p className="text-xs text-muted-foreground"> </p> */}

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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 min-w-[300px]">
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
              <div className="text-2xl font-bold">200 GHO</div>
              <p className="text-xs text-muted-foreground"> </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div
        className="grid h-screen grid-flow-row grid-cols-1 gap-4 p-8 xl:grid-cols-3 xl:grid-rows-5 w-full"
        // style={{gridTemplateColumns: `repeat(auto-fit, minmax(400px, 1fr))`}}
      >
        <Dialog open={addMemberModal} onOpenChange={setAddMemberModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription className="h-fit">
                <Formik
                  initialValues={{role: "", address: ""}}
                  onSubmit={(values, _) => console.log(values)}
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
                      <Button type="submit">Submit</Button>
                    </Form>
                  )}
                </Formik>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Card className="h-full w-full rounded-xl row-span-full">
          <CardHeader className="flex flex-row items-center justify-between mt-1">
            <CardTitle className="">All Members</CardTitle>
            <Button
              className="m-0 w-fit"
              size={"sm"}
              variant="outline"
              onClick={() => setAddMemberModal((prev) => !prev)}
            >
              Add New Member
            </Button>
          </CardHeader>
          <CardContent className="m-0 p-0 pb-4">
            <div className="card-scroll px-6 py-2 overflow-y-scroll space-y-8 h-full">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div className="flex items-center justify-between" key={index}>
                  <div className="flex">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Olivia Martin
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Facilitator
                      </p>
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-[30%]">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facilitator">Facilitator</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="h-full w-full row-start-1 row-end-3">
          <Dialog open={openStakingModal} onOpenChange={setOpenStakingModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Stake</DialogTitle>
                <DialogDescription className="h-fit">
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
                    <TableHead className="w-[150px]">Coin</TableHead>
                    {/* <TableHead>Balance</TableHead> */}
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
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
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="h-full w-full row-start-1 row-end-3">
          <Dialog open={openWithdrawModal} onOpenChange={setOpenWithdrawModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw</DialogTitle>
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
                onClick={() => setOpenWithdrawModal((prev) => !prev)}
              >
                Withdraw
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="">
                    <TableHead className="w-[150px]">Coin</TableHead>
                    {/* <TableHead>Balance</TableHead> */}
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
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
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="h-full w-full row-start-3 row-end-6 col-span-2">
          <Card className="w-full overflow-y-scroll relative px-3 card-scroll h-[300px]">
            <CardHeader className="sticky top-0 bg-white dark:bg-background z-10">
              <CardTitle>Your Transactions</CardTitle>
            </CardHeader>
            <CardContent className="card-content relative">
              <Table className="h-full w-full relative">
                <TableHeader className="bg-white dark:bg-background sticky top-0">
                  <TableRow>
                    <TableHead className="w-[100px]">Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                {/* <div className="overflow-auto max-h-[300px]"> */}
                <TableBody>
                  {" "}
                  {/* Set a max height for the table body */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{"0x..."}</TableCell>
                      <TableCell>Stake</TableCell>
                      <TableCell>Facilitator</TableCell>
                      <TableCell>
                        {direction === "left" ? (
                          <div className="flex gap-2">
                            <p>Stake</p>
                            <img
                              src="/gho.svg"
                              alt="gho"
                              className="h-5 aspect-square"
                            />
                            <p>to</p>
                            <img
                              src="/dai.svg"
                              alt="dai"
                              className="h-5 aspect-square"
                            />
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
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
