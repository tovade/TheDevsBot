const fetch = require("node-fetch");

module.exports = {
    config: {
        name: "docs",
        aliases: ['discordjs'],
        category: "info",
        description: "Fast access to discord docs",
        usage: "<query>",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let query = args.join(" ");
        if (!query) query = await awaitMessages(message);
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
          query
        )}`;
        const data = await fetch(url).then((res) => res.json());
    
        if (!data) {
          return message.channel.send("No results....");
        }
        const embed = {
          ...data,
          author: {},
          color: "#7289DA",
          footer: {
            text: message.author.username,
            icon_url: message.author.displayAvatarURL({ dynamic: true }),
          },
        };
    
        return message.channel.send({ embed });
    
        async function awaitMessages(message) {
          let responce;
    
          const filter = (user) => {
            return user.author.id === message.author.id;
          };
    
          message.channel.send(
            "**What do you want to search for?** \nType `cancel` to cancel the command."
          );
    
          await message.channel
            .awaitMessages(filter, { max: 1, time: 120000, errors: ["time"] })
            .then((msg) => {
              const firstMsg = msg.first();
              if (firstMsg.content.toLowerCase() === "cancel")
                return firstMsg.react("👍");
              responce = firstMsg.content;
            })
            .catch(() => {
              message.channel.send(
                "Welp.. you took too long, cancelling the command."
              );
            });
    
          return responce;
        }
    }
}