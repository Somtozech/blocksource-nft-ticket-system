import React from "react";
import styles from "./congrats.module.scss";
import {Button} from "../../Button";
// Define the type for the props
interface CongratsProps {
  onClose: () => void;
}

const Congrats: React.FC<CongratsProps> = ({onClose}) => {
  return (
    <div className={styles.congrats__con}>
      <h1>
        <span>Congratulations! </span>
      </h1>
      <h5>Your NFT is ready! Check openseas for NFT and download the NFT. See you at the event 🚀</h5>
      <span className={styles.congrats__button__con}>
        <Button onClick={onClose} text="Done" type="primary" />
      </span>
    </div>
  );
};

export default Congrats;
