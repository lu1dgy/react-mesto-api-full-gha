const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Неккоректный адрес изображения',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неккоректный email адрес',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.checkUser = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return user;
      });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
