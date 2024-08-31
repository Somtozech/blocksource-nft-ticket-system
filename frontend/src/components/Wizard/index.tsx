import React from "react";
import styles from "./wizard.module.scss";

// Define the type for props
interface WizardProps {
  allSteps: string[];
  currentStep: string;
}

const Wizard: React.FC<WizardProps> = ({allSteps, currentStep}) => {
  return (
    <div className={`${styles["container"]} flex items-center`}>
      {allSteps.map((step, index) => {
        const isLastValue = index === allSteps.length - 1;
        let itemClass = styles["wizard-item"];
        if (step === currentStep) itemClass += ` ${styles["active"]}`;
        return (
          <React.Fragment key={step}>
            <div className={`${itemClass}`}>
              <span className={`${styles["wizard-step"]}`}>{step}</span>
            </div>
            {!isLastValue && <div className={`${styles["wizard-item-bar"]}`}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export {Wizard};
