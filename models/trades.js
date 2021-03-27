const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Trade extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Trade.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Profession: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
       Bio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [250],

        },
      Salary: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'trades',
    }
    
     
  );
  
  module.exports = Trade;
  
