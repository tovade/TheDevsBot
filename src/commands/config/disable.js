const { MessageEmbed } = require("discord.js");

const categories = [
    "info",
    "emote",
    "giveaway",
];

module.exports = {
    config: {
    name: "disable",
    description: "Disables a command",
    category: "config",
    memberPermissions: ["ADMINISTRATOR"],
    },
    run: async(client, message, args) => {
        const option = args[0];
        const saveCommands = ["help", "enable", "disable"];
        const saveCategories = ["owner", "config"];

        if (!option) {
            return message.channel.send("Please provide a command or category name");
        }

        const command = client.commands.get(option.toLowerCase());
        const guild = await client.getConfig(message.guild);

        if (!command) {
            // Disable category
            const category = option.toLowerCase();
            if (!categories.includes(category)) {
                return message.channel.send("Category or command was not found");
            }

            if (saveCategories.includes(category)) {
                return message.channel.send("That category cannot be disabled!");
            }

            if (guild.disabled.includes(category)) {
                return message.channel.send("That category is already disabled");
            }

            await client.updateConfig(message.guild, {
                disabled: [...guild.disabled, category],
            });

            const embed = new MessageEmbed()
                .setTitle("Disabled category")
                .setDescription(`Successfully **disabled** ${category}`);

            return message.channel.send(embed);
        } else {
            // disable command
            if (saveCommands.includes(command.name)) {
                return message.channel.send("That command cannot be disabled");
            }

            if (guild.commands.includes(command.name)) {
                return message.channel.send("That command is already disabled");
            }

            await client.updateConfig(message.guild, {
                commands: [...guild.commands, command.name],
            });

            const embed = new MessageEmbed()
                .setTitle("Disabled command")
                .setDescription(`Successfully **disabled** ${command.name}`);

            return message.channel.send(embed);
        }
    },
};