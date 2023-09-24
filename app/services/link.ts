import axios from "axios";

export const createLink = async (link: any) => {
  const { data } = await axios.post("/api/links", link);
  return data;
};
