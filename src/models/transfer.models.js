const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Transfer = db.define('transfer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  
  status: {
    type: DataTypes.ENUM(['pending', 'completed','cancelled']),
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;