const { Client, Collection } = require('discord.js');
const { token, mongo } = require('./config');
const client = new Client({
    disableMentions: "everyone",
    partials: ["MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
    ws: {
        properties: { $browser: "Discord Android" },
    },
})
const config = require('./config')
const mongoose = require('mongoose')
mongoose.connect(mongo, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
client.commands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();
client.prefix = config.prefix
client.config = config
client.afk = new Map()
client.phone = new Collection();
["command", "event"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});
require('./modules/config')(client)
require('./modules/client')(client)
require('./modules/user')(client)
client.snipes = new Map();
client.on('messageDelete', function(message, channel){
    client.snipes.set(message.channel.id,{
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
})
})
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./src/giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
client.login(token)