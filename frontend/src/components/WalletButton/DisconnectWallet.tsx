import {useState} from "react";
import styles from "./wallet-button.module.css";
import {useAccount, useConnect, useDisconnect} from "wagmi";
// import { useAppContext } from "../../contexts/appContext";
// import { DownArrow } from "../../assets/images";

const shortText = (text?: string) => {
  if (!text || typeof text !== "string") return "*****";
  return `${text.substring(0, 8)}...${text.substring(text.length - 6)}`;
};

function DisconnectWalletButton() {
  const account = useAccount();
  const {disconnect} = useDisconnect();

  const [arrowIsDown, setArrowIsDown] = useState(true);
  let containerClasses = `${styles["container"]} `;
  if (!arrowIsDown) containerClasses += `${styles["active"]}`;

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div onClick={() => setArrowIsDown(!arrowIsDown)} className={`${containerClasses}`}>
      <div className={`${styles["wallet-address-box"]} `}>
        <span className={`${styles["address"]} mr-3`}>{shortText(account.address)}</span>
        {/* <DownArrow className={`${styles["arrow-down-icon"]}`} /> */}
      </div>
      <button onClick={handleDisconnect} className={`${styles["disconnect-btn"]}`}>
        <span>Disconnect</span>
      </button>
    </div>
  );
}

export {DisconnectWalletButton};
