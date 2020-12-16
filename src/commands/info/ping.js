const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "ping",
        description: "Displays User And Bot Latency",
        usage: " ",
        noalias: "No Aliases",
        category: "info",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {

        message.channel.send("**Pinging...**").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${ping}\n\n💓 ${Math.round(bot.ws.ping)}`)
            message.channel.send(embed)
            m.delete()
        })
    }
};