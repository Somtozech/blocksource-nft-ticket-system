import {forwardRef} from "react";
import styles from "./time-box.module.scss";

interface TimeBoxProps {
  type?: "day" | "hour" | "minute" | "second";
}

const TimeBox = forwardRef<HTMLHeadingElement, TimeBoxProps>(({type}, ref) => {
  return (
    <div className={`md:py-4 ${styles.time__con}`}>
      <h1 ref={ref}>00</h1>
      <h5>{type === "day" ? "Days" : type === "hour" ? "Hours" : type === "minute" ? "Minutes" : "Seconds"}</h5>
      <span className={`${styles.border_bottom}`}></span>
    </div>
  );
});

export {TimeBox};
