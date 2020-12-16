const { MessageEmbed } = require("discord.js");
const { redlight } = require('../../JSON/colours.json')
const warnModel = require('../../models/warn')
module.exports = {
    config: {
        name: "warn",
        aliases: ['report'],
        category: "moderation",
        description: "reports a user of the guild",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        accessableby: "Administrator",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(
              "You should have admin perms to use this command!"
            );
          }
      
          const user = message.mentions.members.first();
      
          if (!user) {
            return message.channel.send(
              "Please Mention the person to who you want to warn - warn @mention <reaosn>"
            );
          }
      
          if (message.mentions.users.first().bot) {
            return message.channel.send("You can not warn bots");
          }
      
          if (message.author.id === user.id) {
            return message.channel.send("You can not warn yourself");
          }
      
          if (user.id === message.guild.owner.id) {
            return message.channel.send(
              "You jerk, how you can warn server owner -_-"
            );
          }
      
          const reason = args.slice(1).join(" ");
      
          if (!reason) {
            return message.channel.send(
              "Please provide reason to warn - warn @mention <reason>"
            );
          }
      
          let warnings = await warnModel.findOne({
            GuildID: message.guild.id,
            UserID: user.id,
          });
      
          if (warnings === 3) {
            return message.channel.send(
              `${
                message.mentions.users.first().username
              } already reached his/her limit with 3 warnings`
            );
          }
      
          if (warnings === null) {
            let aaa = new warnModel({
              GuildID: message.guild.id,
              UserID: user.id,
              warnings: [`${reason}`],
              moderator: [`${message.author.id}`],
            }); //kk
            aaa.save();
            user.send(
              `You have been warned in **${message.guild.name}** for ${reason}`
            );
            await message.channel.send(
              `You warned **${
                message.mentions.users.first().username
              }** for ${reason}`
            );
          } else if (warnings !== null) {
            warnings.warnings.push(reason);
            warnings.moderator.push(message.author.id);
            warnings.save();
            user.send(
              `You have been warned in **${message.guild.name}** for ${reason}`
            );
            await message.channel.send(
              `You warned **${
                message.mentions.users.first().username
              }** for ${reason}`
            );
          }
          const conf = await bot.getConfig(message.guild )
          let channel = conf.modlog
          if (!channel) return;
        const sembed = new MessageEmbed()
            .setColor(redlight)
            .setTimestamp()
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "report")
            .addField("**User Reported**", `${message.mentions.users.first().tag}`)
            .addField("**User ID**", `${message.mentions.users.first().user.id}`)
            .addField("**Reported By**", `${message.member}`)
            .addField("**Reported in**", `${message.channel}`)
            .addField("**Reason**", `**${reason || "No Reason"}**`)
            .addField("**Date**", message.createdAt.toLocaleString());

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}
