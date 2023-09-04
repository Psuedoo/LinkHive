import axios from "axios";

export const allLinks = async () => {
  const { data } = await axios.get("/api/links");
  return data;
};

export const createLink = async (link: any) => {
  const { data } = await axios.post("/api/links", link);
  return data;
};
