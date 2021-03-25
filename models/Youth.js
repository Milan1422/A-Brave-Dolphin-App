const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Youth extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  };

  Youth.init(
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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8],
            },
        },
        mentor_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'mentor',
              key: 'id',
            },
        }
      },
      {
        hooks: {
          beforeCreate: async (newYouthData) => {
            newYouthData.password = await bcrypt.hash(newYouthData.password, 10);
            return newYouthData;
          },
          beforeUpdate: async (updatedYouthData) => {
            updatedYouthData.password = await bcrypt.hash(
              updatedYouthData.password,
              10
            );
            return updatedYouthData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'youth',
      }
    );
    
    module.exports = Youth;
  

  