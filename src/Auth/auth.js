const UserService = require("../service/UserService");
const Jwt = require("./Jwt");
class Auth {
  async authorization(request, response) {
    var email = request.body.email;
    var textPassword = request.body.password;

    if (email != undefined && email != "") {
      if (textPassword != undefined && textPassword != "") {
        try {
          const User = await UserService.identifyUser(email, textPassword);
          const result = await Jwt.newJwt(User);

          if (result === "internal error") {
            response.status(400);
            response.send("Erro interno");
          } else if (result === "User not found") {
            response.status(400);
            response.send("Usuário não encontrado!");
          } else {
            response.send(result);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        response.status(404);
        response.send("Senha inválida");
      }
    } else {
      response.status(404);
      response.send("Email inválido");
    }
  }
}

module.exports = new Auth();
