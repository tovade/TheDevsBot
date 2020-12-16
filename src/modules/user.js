const User = require("../models/user");

module.exports = client => {
    client.getUser = async (user) => {
        let data = await User.findOne({ userID: user.id }).catch(err => console.log(err));;
        if (data) return data;
        else return client.config.userDefaultStats;
    }
    client.updateUser = async (user, stats) => {
        let data = await client.getUser(user);
        if (typeof data != "object") data = {};
        for (const key in stats) {
            if (stats.hasOwnProperty(key)) {
                if(data[key] != stats[key]) data[key] = stats[key];
                else return;
            }
        }        
        return await data.updateOne(stats).catch(err => console.log(err));
    }
    client.createUser = async (stats) => {
        const newUser = new User(stats);
        return newUser.save().catch(err => console.log(err));
    }
    client.deleteUser = async (user) => {
        await User.deleteOne({ userID: user.id }).catch(err => console.log(err));
    }
}