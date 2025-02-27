const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    mysqlID: {
      type: String,
      required: true,
    },
    history: [
      {
        mood: {
          type: String,
          required: true,
        },
        stressLevel: {
          type: Number, // Assuming stress level is numeric (e.g., from 1 to 10)
          required: true,
        },
        last_analysed: {
          type: Date,
          required: true,
          default: Date.now, // Automatically set to the current date-time
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
