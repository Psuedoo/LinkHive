import { User } from "@prisma/client";
import axios from "axios";

export const allLinks = async () => {
  const { data } = await axios.get("/api/links");
  return data;
};
