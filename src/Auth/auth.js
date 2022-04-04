const UserService = require("../service/UserService");
const Jwt = require("./Jwt");
class Auth {
  async authorization(request, response) {
    var email = request.body.email;
    var textPassword = request.body.password;

    if (email) {
      if (textPassword) {
        try {
          const User = await UserService.identifyUser(email, textPassword);
          const result = await Jwt.newJwt(User);
          if (result === "internal error") {
            response.sendStatus(500);
          } else if (result === "User not found") {
            response.sendStatus(404)
          } else {
            response.send(result)
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        response.sendStatus(404)
      }
    } else {
      response.sendStatus(404)
    }
  }
}

module.exports = new Auth();