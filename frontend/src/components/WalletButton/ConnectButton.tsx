import {LockIcon} from "../icons/lock";
import styles from "./connect-button.module.css";
import {useConnect} from "wagmi";

function ConnectButton() {
  const {connectors, connect, status} = useConnect();

  async function handleConnect() {
    await connect({connector: connectors[0]});
  }

  return (
    <div className={styles["container"]}>
      <button onClick={handleConnect} disabled={status === "pending"} className={`${styles["connect-btn"]} `}>
        <span className="hidden md:block pr-3 text-xl">Connect Wallet</span>
        <span className="pr-2 md:hidden text-xl">Connect</span>
        <LockIcon />
      </button>
    </div>
  );
}

export {ConnectButton};
