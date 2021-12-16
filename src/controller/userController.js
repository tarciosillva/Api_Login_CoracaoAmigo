const UserRepository = require("../Repository/userRepository");
class UserController {
  async newUser(request, response) {
    const newUser = request.body;
    try {
      const result = await UserRepository.newUser(newUser);
      response.send(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController()
