const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  underscored: true,
  timestamps: false,
});

CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartItem;