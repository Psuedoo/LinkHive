import axios from "axios";
import bcrypt from "bcryptjs";

const numSaltRounds = 10;

export const createUser = async (user: any) => {
  const { data } = await axios.post("/api/user", user);
  return data;
};

export const encryptPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, numSaltRounds);
  return hash;
};

export const verifyPassword = async (
  password: string | null,
  hash: string | null
) => {
  if (!password || !hash) return false;

  try {
    const res = await bcrypt.compare(password, hash);
    return res;
  } catch (err) {
    console.log(`Error: ${err}`);
    return false;
  }
};
