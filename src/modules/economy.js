const moment = require("moment");
const storeModel = require("../models/store");
const userModel = require("../models/userEco");
/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserMoney = async (guildId, userId) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }

  return user.money;
};
/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserBank = async (guildId, userId) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }

  return user.bank;
};

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserMoney = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  const currentMon = user.money;
  return user.updateOne({ userID: userId, money: currentMon + amount });
};

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserBank = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  const current = user.bank;
  return user.updateOne({ userID: userId, bank: current + amount });
};

/**
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const removeUserBank = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  const current = user.bank;
  return user.updateOne({ userID: userId, bank: current - amount });
};

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const removeUserMoney = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  const currentMon = user.money;
  return user.updateOne({ userID: userId, money: currentMon - amount });
};

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserDaily = async (guildId, userId) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  return user.daily;
};

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} date
 */
const setUserDaily = async (guildId, userId, date) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  const currentMon = user.money;
  return user.updateOne({ userID: userId, daily: date });
};
/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserWork = async (guildId, userId) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }

  return user.work;
};

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} date
 */
const setUserWork = async (guildId, userId, date) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  return user.updateOne({ userID: userId, work: date });
};

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserInventory = async (guildId, userId) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  return user.inventory;
};
const getUserJob = async (userId) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  return user;
};
const setUserJob = async (userId, job) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  return user.updateOne({ userID: userId, job: job });
};
/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} newItem
 */
const setUserInventory = async (guildId, userId, newItem) => {
  const user = await userModel.findOne({ userID: userId });
  if (!user) {
    const aa = new userModel({ userID: userId });
    aa.save();
  }
  const currentMon = user.money;
  return user.inventory.push(newItem).then(async () => {
    user.save();
  });
};

/**
 * @param {string} guildId
 */
const getStoreItems = async (guildId) => {
  const user = await storeModel.findOne({ GuildID: guildId });
  if (!user) {
    const aa = new storeModel({ GuildID: guildId });
    aa.save();
  }
  return user.items;
};

/**
 * @param {string} guildId
 * @param {string} newItem
 */
const setStoreItems = async (guildId, newItem) => {
  const user = await storeModel.findOne({ GuildID: guildId });
  if (!user) {
    const aa = new storeModel({ GuildID: guildId });
    aa.save();
  }
  const e = user.items.push(newItem);
  user.save();
  return e;
};

/**
 * @param {string} guildId
 * @param {string} item
 */
const removeStoreItem = async (guildId, item) => {
  const store = await storeModel.findOne({ GuildID: guildId });
  if (!store) {
    const aa = new storeModel({ GuildID: guildId });
    aa.save();
  }
  const current = store.items;
  await storeModel.findOneAndUpdate(
    { GuildID: guildId },
    {
      items: current.filter(
        (storeItem) => storeItem.name.toLowerCase() !== item.toLowerCase()
      ),
    }
  );
};
module.exports = {
  getUserMoney,
  getUserBank,
  addUserMoney,
  addUserBank,
  removeUserBank,
  removeUserMoney,
  getUserDaily,
  setUserDaily,
  getUserWork,
  setUserWork,
  getUserInventory,
  getStoreItems,
  setStoreItems,
  removeStoreItem,
  setUserInventory,
  getUserJob,
  setUserJob,
};