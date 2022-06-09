const UserRepository = require("../Repository/userRepository");
const bcript = require("bcryptjs");
class UserService {
  async identifyUser(email, textPassword) {
   
    try {
      const user = await UserRepository.getUser(email);
     
      if (user) {
        const compareHash = await bcript.compare(textPassword, user.dataValues.senha);
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
