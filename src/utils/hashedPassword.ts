import bcrypt from "bcrypt";

const comparePassword = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const hashedPassword = {
  comparePassword,
};
