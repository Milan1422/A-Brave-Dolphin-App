const sequelize = require('../config/connection');
const { User, Youth, Mentor, Trade } = require('../models');

const mentorSeedData = require('./mentorData.json');
const youthSeedData = require('./youthData.json');
const tradesSeedData = require('./tradesData.json');

const seedDataBase = async () => {
    await sequelize.sync({ force: true });
    
    const mentors = await Mentor.bulkCreate(mentorSeedData, {
        individualHooks: true,
        returning: true,
    });
    
    for (const youth of youthSeedData) {
        await Youth.create({
            ...youth,
            mentor_id: mentors[Math.floor(Math.random() * mentors.length)].id,
        })
    }

    const trades = await Trade.bulkCreate(tradesSeedData);

    process.exit(0);
}

seedDataBase();

