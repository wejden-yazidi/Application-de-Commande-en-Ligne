const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  underscored: true,
  timestamps: false,
});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: 'OrderProduct', foreignKey: 'orderId', otherKey: 'productId' });

module.exports = Order;