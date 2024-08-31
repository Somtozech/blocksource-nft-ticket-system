import React from "react";
import styles from "./close-button.module.css";
import {CloseIcon} from "../icons/close";

// Define the type for the props
interface CloseButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({onClick}) => {
  return (
    <button className={`${styles["close-btn"]} pt-8 pb-3`} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

export {CloseButton};
