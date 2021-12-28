const UserModel = require("../model/userModel");

class UserRepository {
  async newUser(Objetc) {
    try {
      return new Promise((resolve, reject) => {
        UserModel.Users.create(Objetc, (err, result) => {
          if (err) {
            if (err.code === 11000) {
              reject("Este email já está registrado.");
            }
          } else {
            return resolve(result);
          }
        });
      });
    } catch (error) {
      return error;
    }
  }
  async getUser(email) {
    try {
      const result = await UserModel.Users.findOne({
        email: email,
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserRepository();
