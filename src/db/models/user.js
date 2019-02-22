import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Username is already taken'
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide username'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address is already registered'
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide email address'
          },
          isEmail: {
            args: true,
            msg: 'Email address is invalid'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
  );
  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
  };
  return User;
};
