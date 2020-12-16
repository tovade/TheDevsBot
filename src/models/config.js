const { Schema, model } = require("mongoose");

module.exports = model(
    "config",
    new Schema({
        GuildID: String,
        levelMessage: {
            type: Boolean,
            default: false,
        },
        muterole: { type: String, default: null},
        prefix: { type: String, default: "d!"},
        disabled: { type: Array, default: null},
        commands: { type: Array, default: null},
        modlog: { type: String, default: null}
    })
);
