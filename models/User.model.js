const { model } = require("mongoose");
const mongoose = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
      },
    ],
    googleId: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("user", userSchema);

module.exports = UserModel;
