const { Schema, model } = require("mongoose");

module.exports = model(
  "userEconomy",
  new Schema({
    userID: String,
    bank: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
    inventory: Array,
    daily: Date,
    work: Date,
    job: { type: String, default: null },
    friends: { type: Array, default: null}
  })
);
