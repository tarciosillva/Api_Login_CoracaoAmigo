const UserRepository = require("../Repository/userRepository");
const bcript = require("bcrypt");

class UserService {
  async newUser(User) {
    const salt = bcript.genSaltSync(12);
    try {
      const password = User.password;
      const hash = await bcript.hash(password, salt);
      User.password = hash;
      const res = await UserRepository.newUser(User);
      return res;
    } catch (error) {
      return error;
    }
  }

  async identifyUser(email, textPassword) {
    const salt = bcript.genSaltSync(12);
    try {
      const user = await UserRepository.getUser(email);
      if (user) {
        const compareHash = bcript.compareSync(textPassword, user.password);
        if (compareHash) {
          return user;
        } else {
          return undefined;
        }
      } else return undefined;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserService();
