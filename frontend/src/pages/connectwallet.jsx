import {ModeToggle} from "@/components/Toggletheme";
import {Button} from "@/components/ui/button";
import {ConnectKitButton} from "connectkit";
import {useTheme} from "next-themes";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useAccount, useConnect, useNetwork, useSwitchNetwork} from "wagmi";

export default function ConnectWalletComponent() {
  const {isConnected} = useAccount();
  const {connect, connectors, error, isLoading, pendingConnector} =
    useConnect();
  const {chain} = useNetwork();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    console.log(chain);

    // if (isConnected && chain.id != "80001" && chain.id != "43113") {
    //   router.push("/switchnetwork");
    // }
    if (chain && (chain.id == 421614 || chain.id == 11155111) && isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, chain, router]);
  if (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Couldn't Connect",
    });
  }
  return (
    <div className="relative h-screen grid place-content-center">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <ConnectKitButton theme={theme.theme} />
    </div>
  );
}
