import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

import { controlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getCurrent = (req, res) => {
  const { email } = req.user;
  res.json({ email });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email In Use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPass });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password wrong");
  }
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError(401, "Email or password wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token: token,
    user: { email: user.email, subsciption: user.subscription },
  });
};

const signoutUser = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findByIdAndUpdate(_id, { token: "" });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204).json();
};

export default {
  getCurrent: controlWrapper(getCurrent),
  registerUser: controlWrapper(registerUser),
  signinUser: controlWrapper(signinUser),
  signoutUser: controlWrapper(signoutUser),
};
