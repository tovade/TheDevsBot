const { MessageEmbed } = require("discord.js");

const categories = [
  "info",
    "giveaway",
    "emote"
];

module.exports = {
  config: {
  name: "enable",
  description: "Enables a command",
  category: "config",
  memberPermissions: ["ADMINISTRATOR"],
  },
  run: async (client, message, args) => {
    const option = args[0];
    const guild = await client.getConfig(message.guild);
    const command = client.commands.get(option.toLowerCase());

    if (!option) {
      return message.channel.send("Please provide a command or category name");
    }

    if (!command) {
      // enable category
      const category = option.toLowerCase();
      if (!categories.includes(category)) {
        return message.channel.send("Category or command was not found ");
      }

      if (!guild.disabled.includes(category)) {
        return message.channel.send("That category is not disabled");
      }

      await client.updateConfig(message.guild, {
        disabled: guild.disabled.filter((c) => c !== category),
      });

      const embed = new MessageEmbed()
        .setTitle("Enabled category")
        .setDescription(`Successfully **enabled** ${category}`);

      return message.channel.send(embed);
    } else {
      // enable command
      if (!command?.name) {
        return message.channel.send("Command was not found");
      }

      if (!guild.commands.includes(command.name)) {
        return message.channel.send("That command is not disabled");
      }

      await client.updateConfig(message.guild, {
        commands: guild.commands.filter((c) => c !== command.name),
      });

      const embed = new MessageEmbed()
        .setTitle("Enabled command")
        .setDescription(`Successfully **enabled** ${command.name}`);

      return message.channel.send(embed);
    }
  },
};
