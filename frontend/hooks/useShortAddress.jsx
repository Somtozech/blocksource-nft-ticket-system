import { useEffect, useState } from "react";

const largeCutText = (text) =>
  `${text.substring(0, 8)}...${text.substring(text.length - 6)}`;

const smallCutText = (text) =>
  `${text.substring(0, 3)}...${text.substring(text.length - 2)}`;

function useShortAddress(address) {
  const [shortForm, setShortForm] = useState("******");
  if (!address) return "DISCONNECTED";
  useEffect(() => {
    if (window.innerWidth >= 768) setShortForm(largeCutText(address));
    if (window.innerWidth < 768) setShortForm(smallCutText(address));
  }, [address]);

  return shortForm;
}

export { useShortAddress };
