import {ConnectButton} from "./ConnectButton";
import {DisconnectWalletButton} from "./DisconnectWallet";
import {useAccount} from "wagmi";

function WalletButton() {
  const account = useAccount();

  return account.status === "connected" ? <DisconnectWalletButton /> : <ConnectButton />;
}

export {WalletButton};
