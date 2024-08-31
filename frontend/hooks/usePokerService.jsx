import { useEffect } from "react";
import {
  setPlayerAmount,
  getGameDetails,
  placeBet,
  saveHands,
  decodeHand,
  rewardWinner,
} from "../services/pokerService";
import { toast } from "react-toastify";
import Emitter from "../services/emitter";

function usePokerContract() {
  const getGameInfo = async () => {
    try {
      const gameDetails = await getGameDetails();
      console.log(gameDetails);
      return gameDetails;
    } catch (error) {
      toast.error("Failed to Load Game Data");
      console.log("Something went wrong", error);
    }
  };

  const setGameCredits = async (amount) => {
    Emitter.emit("OPEN_LOADER");
    try {
      await setPlayerAmount(amount);
      Emitter.emit("CLOSE_LOADER");
      return true;
    } catch (error) {
      toast.error("Failed to Select Credits");
      console.log("Something went wrong", error);
      Emitter.emit("CLOSE_LOADER");
    }
  };

  const placeBid = async (bid) => {
    console.log({ type: typeof bid, bid });
    Emitter.emit("OPEN_LOADER");
    try {
      await placeBet(bid);
      Emitter.emit("CLOSE_LOADER");
      return true;
    } catch (error) {
      toast.error(`Failed to Bet ${bid} Credits`);
      console.log("Something went wrong", error);
      Emitter.emit("CLOSE_LOADER");
    }
  };

  const generateHands = async () => {
    Emitter.emit("OPEN_LOADER");
    try {
      let { playerHand, dealerHand } = await saveHands();
      playerHand = decodeHand(playerHand);
      dealerHand = decodeHand(dealerHand);
      // console.log({ playerHand, dealerHand });
      toast.success("Player's hand generated");
      Emitter.emit("CLOSE_LOADER");
      return { playerHand, dealerHand };
    } catch (error) {
      toast.error(`Failed to Generate Player's Hand`);
      console.log("Something went wrong", error);
      Emitter.emit("CLOSE_LOADER");
    }
  };

  const giveReward = async (winner) => {
    Emitter.emit("OPEN_LOADER");
    try {
      await rewardWinner(winner);

      toast.success(`${winner}'s balance has been credited`);
      Emitter.emit("CLOSE_LOADER");
      return { playerHand, dealerHand };
    } catch (error) {
      toast.error(`Failed to credit Winner`);
      console.log("Something went wrong", error);
      Emitter.emit("CLOSE_LOADER");
    }
  };

  return { getGameInfo, setGameCredits, placeBid, generateHands, giveReward };
}

export default usePokerContract;
