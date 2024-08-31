import React, {useEffect, useRef, useState, MouseEvent} from "react";
import styles from "./minting-modal.module.css";
import UserInfo from "./UserInfo";
import {ConfettiShower} from "../ConfettiShower";
import {Wizard} from "../Wizard";
import {CloseButton} from "../CloseButton";
import Congrats from "./Congrats";

// Define types for props
interface MintingModalProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const MintingModal: React.FC<MintingModalProps> = ({isActive, setIsActive}) => {
  const [screen, setScreen] = useState("1");
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerClass, setContainerClass] = useState<string>(styles["container"]);

  const closeModal = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      if (containerRef.current) {
        containerRef.current.style.display = "flex";
      }
      setTimeout(() => {
        setContainerClass((prev) => `${prev} ${styles["active"]}`);
      }, 50);
    } else {
      document.body.style.overflow = "auto";
      setContainerClass(styles["container"]);
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      }, 400);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive, setIsActive]);

  const handleModalClick = () => {
    closeModal();
  };

  const handleModalBodyClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div ref={containerRef} className={containerClass} onClick={handleModalClick}>
      {screen === "2" && isActive && <ConfettiShower />}
      <div className={`${styles["modal-body"]}`} onClick={handleModalBodyClick}>
        <div className={`flex justify-between items-center px-8 md:px-10 ${styles["modal-top"]}`}>
          <CloseButton onClick={closeModal} />
          <div className={`${styles["wizard"]} pt-5`}>
            <Wizard allSteps={["1", "2"]} currentStep={screen} />
          </div>
        </div>
        <div className={`${styles["screen-container"]} pb-8 pt-6 md:pt-2`}>
          <div className={`${styles["screen-slide"]} ${styles[`s${screen}`]}`}>
            {screen === "1" && (
              <div className="px-8 md:px-10">
                <UserInfo onClose={closeModal} onContinue={() => setScreen("2")} />
              </div>
            )}

            {screen === "2" && (
              <div className="px-8 md:px-10">
                <Congrats onClose={closeModal} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export {MintingModal};
