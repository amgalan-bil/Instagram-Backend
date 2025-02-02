const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const postModel = require("../models/postSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const addUser = async (req, res) => {
  const body = req.body;
  const { username, password, email, postId } = body;

  try {
    const hash = await bcrypt.hashSync(password, 10);

    const createUser = await userModel.create({
      username: username,
      password: hash,
      email: email,
    });
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        userId: createUser._id,
      },
    });

    const token = jwt.sign(
      {
        userId: createUser._id,
        username: createUser.username,
      },
      process.env.JWT_PASS,
      { expiresIn: "24h" }
    );

    res.status(200).send(`Bearer ${token}`);
  } catch (err) {
    res.send({ message: `failed to create a user, ${err}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    const checkUserPass = bcrypt.compare(password, existingUser.password);

    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username,
      },
      process.env.JWT_PASS,
      { expiresIn: "24h" }
    );

    if (checkUserPass) {
      res.status(200).send(`Bearer ${token}`);
    } else {
      res.send("login fail");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel
      .findOne({ _id: userId.trim() })
      .populate("posts", "profileImage");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

module.exports = { addUser, getUser, login };
