'use strict';
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
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {});
  House.associate = (models) => {
    // associations can be defined here
  };
  return House;
};