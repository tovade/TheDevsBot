const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
module.exports = (client) => {
  // Read every commands subfolder
  readdirSync("./src/commands/").forEach((dir) => {
    // Filter so we only have .js command files
    const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );

    // Loop over the commands, and add all of them to a collection
    // If there's no name found, prevent it from returning an error,
    // By using a cross in the table we made.
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);

      if (pull.config.name) {
        const cooldowns = client.cooldowns;

        if (!cooldowns.has(pull.config.name)) {
          cooldowns.set(pull.config.name, new Collection());
        }
        //Setting cliet.commands to the files' names
        client.commands.set(pull.config.name, pull);

        // If there's an aliases key, read the aliases.
        if (pull.config.aliases && Array.isArray(pull.config.aliases))
          pull.config.aliases.forEach((alias) => client.aliases.set(alias, pull.config.name));
      }
    }
    // Log the table
  });
};
