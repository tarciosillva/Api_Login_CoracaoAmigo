const UserService = require("../service/UserService")
class UserController {
  async newUser(request, response) {
    const newUser = request.body;
    try {
      const result = await UserService.newUser(newUser);
      response.send(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController()
