const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, 
  },
}, {
  underscored: true,
  timestamps: false,
});

Product.belongsTo(Category);

module.exports = Product;
