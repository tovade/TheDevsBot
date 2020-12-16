const Config = require("../models/config.js");

module.exports = client => {

    client.getConfig = async (guild) => {
        let data = await Config.findOne({ GuildID: guild.id }).catch(err => console.log(err));;
        if (data) return data;
        else return client.config.configDefaultSettings;
    }
    client.updateConfig = async (guild, settings) => {
        let data = await client.getConfig(guild);
        if (typeof data != "object") data = {};
        for (const key in settings) {
            if (settings.hasOwnProperty(key)) {
                if(data[key] != settings[key]) data[key] = settings[key];
                else return;
            }
        }        
        return await data.updateOne(settings).catch(err => console.log(err));
    }
    client.createConfig = async (settings) => {
        const newConfig = new Config(settings);
        return newConfig.save().catch(err => console.log(err));
    }
    client.deleteConfig = async (guild) => {
        await Config.deleteOne({ GuildID: guild.id }).catch(err => console.log(err));
    }
}
