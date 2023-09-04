import { User } from "@prisma/client";
import axios from "axios";

export const allLinks = async ({ userId }: { userId?: string }) => {
  const { data } = await axios.get("/api/links", { params: { userId } });
  return data;
};
