import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";

import fs from "fs/promises";
import path from "path";

const avatarPath = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

import { controlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getCurrent = (req, res) => {
  const { email } = req.user;
  res.json({ email });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email In Use");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email, {
    s: "200",
    d: "monsterid",
  });

  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    avatarURL: avatar,
  });

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

const updateSubscriptionUser = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `id=${id} not found`);
  }
  res.json(result);
};

const patchAvatarUser = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  Jimp.read(tempPath, (err, avatar) => {
    if (err) throw err;
    avatar
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER) // resize
      .quality(60) // set JPEG quality
      .write(newPath); // save
  });
  await fs.rm(tempPath);
  const avatarURL = path.join("avatars", filename);
  console.log(avatarURL);
  const result = await User.findByIdAndUpdate(
    _id,
    { ...req.body, avatarURL },
    { new: true }
  );
  res.json(result);
};

export default {
  getCurrent: controlWrapper(getCurrent),
  registerUser: controlWrapper(registerUser),
  signinUser: controlWrapper(signinUser),
  signoutUser: controlWrapper(signoutUser),
  updateSubscriptionUser: controlWrapper(updateSubscriptionUser),
  patchAvatarUser: controlWrapper(patchAvatarUser),
};
