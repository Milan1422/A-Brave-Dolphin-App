const User = require('./User');
const Youth = require('./Youth');
const Trade = require('./trades');
const Mentor = require('./mentor');

Mentor.hasMany(Youth, {
    foreignKey: 'mentor_id',
    onDelete: 'CASCADE',
})

Youth.belongsTo(Mentor, {
    foreignKey: 'mentor_id',
})

module.exports = { User, Youth, Mentor, Trade };
