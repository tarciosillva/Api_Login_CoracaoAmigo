const UserModel = require("../model/userModel");

class UserRepository {
  async newUser(Objetc) {
    try {
      return new Promise((resolve, reject) => {
        UserModel.Users.create(Objetc, (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        });
      });
    } catch (error) {
      return error;
    }
  }
  async getUser(email, password) {
    try {
      const result = await UserModel.Users.findOne({
        $and: [{ email: email }, { password: password }],
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserRepository();
