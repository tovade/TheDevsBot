const { Schema, model } = require("mongoose");

module.exports = model(
  "store",
  new Schema({
    GuildID: String,
    items: Array,
    price: Array,
  })
);
