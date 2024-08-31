import logo from "../../../assets/logo.png";
import styles from "./logo.module.scss";

function Logo() {
  return (
    <div className={`${styles["container"]}`}>
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" />
        <span className={`${styles.logo__text} font-semibold text-white text-xl`}>BLOCKSOURCE'24</span>
      </div>
    </div>
  );
}

export {Logo};
