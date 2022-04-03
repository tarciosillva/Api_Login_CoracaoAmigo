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

          if (User) {
            const result = await Jwt.newJwt(User);
            if (result === "internal error") {
              response.send("Erro interno");
            } else if (result === "User not found") {
              response.send("Usuário não encontrado!");
            } else {
              response.send(result);
            }
          } else {
            return undefined
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