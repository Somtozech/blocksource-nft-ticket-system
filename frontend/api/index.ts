import axios from "axios";
import {GenerateTicketResponse} from "../types";

export const uploadMetadataToIpfs = async (name: string, ticketNumber: string) => {
  console.log({name, ticketNumber});
  return (
    await axios.post<GenerateTicketResponse>(`/api/generate-ticket`, {
      name,
      ticketNumber: +ticketNumber,
    })
  ).data;
};
