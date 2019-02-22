export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user'
    });
    Order.belongsTo(models.House, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE',
      as: 'item(s)'
    })
  };
  return Order;
};