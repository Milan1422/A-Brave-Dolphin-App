const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Mentor extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Mentor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mentor_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mentor_linkedin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isURL: true,
      },
    },
    mentor_instagram: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isURL: true,
      },
    },

    mentor_twitter: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isURL: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newMentorData) => {
        newMentorData.password = await bcrypt.hash(newMentorData.password, 10);
        return newMentorData;
      },
      beforeUpdate: async (updatedMentorData) => {
        updatedMentorData.password = await bcrypt.hash(
          updatedMentor.password,
          10
        );
        return updatedMentorData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    Underscored: true,
    modelName: 'mentor',
  }
);

module.exports = Mentor;
