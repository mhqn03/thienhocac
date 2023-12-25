import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

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

const generateJwt = (data, expiresIn) => {
  const token = jwt.sign(data, SECRET_KEY, {
    expiresIn: expiresIn || "1d",
  });
  return token;
};

const decodeToken = (token) => {
  const verifyToken = jwt.verify(token, SECRET_KEY);
  return verifyToken;
};

export { hashingPassword, comparePassword, generateJwt, decodeToken };
