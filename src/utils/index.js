import * as bcrypt from "bcryptjs";

const hashingPassword = (password) => {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return {
    hashedPassword,
    salt,
  };
};

const comparePassword = (password, salt, hashedPassword) => {
  const hashingPasswordReq = bcrypt.hashSync(password, salt);
  return hashedPassword === hashingPasswordReq;
};

export { hashingPassword, comparePassword };
