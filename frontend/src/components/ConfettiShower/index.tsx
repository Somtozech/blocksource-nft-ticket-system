import {useEffect} from "react";
import Confetti from "react-confetti";
import useWindowSize from "../../../hooks/useWindowSize";

function ConfettiShower() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const {width, height} = useWindowSize();
  return <Confetti width={width} height={height} />;
}

export {ConfettiShower};
