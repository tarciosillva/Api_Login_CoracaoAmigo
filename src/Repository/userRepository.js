const UserModel = require("../model/UserModel");

class UserRepository {
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

  async updategoogleUserId(_id, googleUserId) {
    console.log(_id, googleUserId)
    try {
      await UserModel.Users.updateOne(
        {
          _id: _id,
        },
        {
          googleUserId: googleUserId,
        }
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserRepository();
