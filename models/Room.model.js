const { model, Schema } = require("mongoose");

const roomSchema = new Schema({
  room_name: {
    type: String,
    required: true,
  },
  room_size: {
    type: Number,
    required: true,
  },
  room_user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const RoomModel = model("room", roomSchema);
module.exports = RoomModel;
