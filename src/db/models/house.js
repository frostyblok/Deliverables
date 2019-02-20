export default (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Item name already exist"
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {});
  House.associate = (models) => {
    House.hasMany(models.Order, { foreignKey: 'itme_id' });
    // associations can be defined here
  };
  return House;
};