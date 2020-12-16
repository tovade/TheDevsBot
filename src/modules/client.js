module.exports = (client) => {
    client.findMember = (message, args, allowAuthor) => {
      return message.guild.member(
        message.mentions.users.first() ||
          message.guild.members.cache.get(args[0]) ||
          message.guild.members.cache.find((m) => m.user.id === args[0]) ||
          message.guild.members.cache.find(
            (m) => m.user.tag.toLowerCase() === args.join(" ").toLocaleLowerCase()
          ) ||
          message.guild.members.cache.find(
            (m) =>
              m.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
          ) ||
          (allowAuthor === true ? message.member : null)
      );
    };
    client.findChannel = (message, args, allowChannel) => {
      return (
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.guild.channels.cache.find((m) => m.id === args[0]) ||
        message.guild.channels.cache.find(
          (m) => m.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        (allowChannel === true ? message.channel : null)
      );
    };
    client.findRole = (message, args, allowChannel) => {
      return (
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]) ||
        message.guild.roles.cache.find((m) => m.id === args[0]) ||
        message.guild.roles.cache.find(
          (m) => m.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        (allowChannel === true ? message.member.roles.highest : null)
      );
    };
  };
  