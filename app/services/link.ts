import axios from "axios";

export const allLinks = async () => {
  const { data } = await axios.get("/api/links");
  return data;
};

export const createLink = async (link: any) => {
  const { data } = await axios.post("/api/links", link);
  return data;
};

export const getLink = async (id: string) => {
  const { data } = await axios.get(`/api/link/${id}`);
  return data;
};

export const updateLink = async (link: any) => {
  const { data } = await axios.put("/api/link/", link);
  return data;
};

export const deleteLink = async (link: any) => {
  const { data } = await axios.delete(`/api/link/`, { data: { id: link.id } });
  return data;
};
