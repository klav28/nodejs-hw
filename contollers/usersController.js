import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

import { controlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

// const getAll = async (req, res) => {
//   const result = await Contact.find({}, "-createdAt -updatedAt");
//   res.json(result);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findById(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(result);
// };

const registerUser = async (req, res) => {
  const { email, password } = req.body;
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

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(result);
// };

// const updateStatusContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, `id=${id} not found`);
//   }
//   res.json(result);
// };

// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   console.log("To Delete", id);
//   const result = await Contact.findByIdAndDelete(id);
//   if (!result) {
//     throw HttpError(404, `Not found`);
//   }
//   res.json({ message: "contact deleted" });
// };

export default {
  //   getAll: controlWrapper(getAll),
  //   getById: controlWrapper(getById),
  registerUser: controlWrapper(registerUser),
  signinUser: controlWrapper(signinUser),
  signoutUser: controlWrapper(signoutUser),
  //   deleteById: controlWrapper(deleteById),
};
