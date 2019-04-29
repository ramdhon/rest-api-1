'use strict';
const bcrypt = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        },
        isUnique: function (username) {
          return User.findOne({
            where: {
              username
            }
          })
          .then(data => {
            if (data) {
              throw new Error('username has been registered');
            }
          })
          .catch(err => {
            throw err;
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        let hash = bcrypt.hash(user.password);
        user.password = hash;
      },
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};