import React from "react";
import styles from "./button.module.scss";
import {TicketIcon} from "../icons/ticket";

// Define the prop types
interface ButtonProps {
  text: string;
  onClick?: (e: any) => void;
  icon?: boolean;
  type?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  type = "secondary",
  disabled = false,
  loading = false,
}) => {
  if (type === "primary") {
    return (
      <button type="submit" disabled={disabled} className={styles.button__con} onClick={onClick}>
        <span>{text}</span>
        {!loading && icon && <TicketIcon />}
        {loading && <span className={styles["loader"]}></span>}
      </button>
    );
  }

  if (type === "outline") {
    return (
      <button type="submit" disabled={disabled} className={styles.outline_button__con} onClick={onClick}>
        <span className="mr-2">{text}</span>
        {!loading && icon && <TicketIcon />}
        {loading && <span className={styles["loader"]}></span>}
      </button>
    );
  }

  return (
    <button disabled={disabled || loading} className={styles.outline_button__con} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export {Button};
