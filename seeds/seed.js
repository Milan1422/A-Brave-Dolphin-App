const sequelize = require('../config/connection');
const { User, Youth, Mentor, Trade } = require('../models');

const youthSeedData = require('./youthData.json');
const mentorSeedData = require('./mentorData.json');
const tradesSeedData = require('./tradesData.json');

const seedDataBase = async () => {
    await sequelize.sync({ force: true });

    const youths = await Youth.bulkCreate(youthSeedData, {
        individualHooks: true,
        returning: true,
    });

    const mentors = await Mentor.bulkCreate(mentorSeedData, {
        individualHooks: true,
        returning: true,
    });

    const trades = await Trade.bulkCreate(tradesSeedData);

}

seedDataBase();

