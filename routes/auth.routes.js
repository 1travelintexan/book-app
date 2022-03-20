const router = require("express").Router();
const UserModel = require("../models/User.model");
const RoomModel = require("../models/Room.model");
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middlewares/auth.middleware");

router.post("/signup", async (req, res, next) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const newUser = {
    username,
    email,
    password: hash,
  };
  const userModelResponse = await UserModel.create(newUser);
  req.session.userInfo = userModelResponse;
  res.redirect("/profile");
});

router.post("/login", isLoggedIn, async (req, res, next) => {
  const { username, password } = req.body;
  const findOneResponse = await UserModel.findOne({ username });
  const isMatching = await bcrypt.compare(password, findOneResponse.password);
  if (isMatching) {
    req.session.userInfo = findOneResponse;
    res.redirect("/profile");
  } else {
    res.render("login", { message: "Sorry your password doesn't match" });
  }
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const loggedInUser = req.session.userInfo.username;
  let currentUser = await UserModel.findOne({
    username: loggedInUser,
  });
  await currentUser.populate("rooms");
  res.render("profile", { currentUser });
});

router.get("/create-room", isLoggedIn, (req, res) => {
  res.render("create-room");
});

router.post("/create-room", async (req, res, next) => {
  const { roomName, roomSize } = req.body;
  const currentUserId = req.session.userInfo._id;
  const currentUserName = req.session.userInfo.username;
  const newRoom = {
    room_name: roomName,
    room_size: roomSize,
    room_user: currentUserId,
  };
  let roomFromDB = await RoomModel.create(newRoom);
  await UserModel.updateOne(
    { username: currentUserName },
    { $push: { rooms: [roomFromDB] } }
  );
  res.redirect("/profile");
});

router.post("/delete/:id", async (req, res) => {
  const roomId = req.params.id;
  console.log("this is the id", roomId);
  await RoomModel.findByIdAndDelete(roomId);
  res.redirect("/profile");
});

router.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
});
module.exports = router;
