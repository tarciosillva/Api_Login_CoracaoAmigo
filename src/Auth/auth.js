require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserService = require("../service/UserService")
class Jwt {
  async authorization(request, response) {
    var email = request.body.email;
    var textPassword = request.body.password;

    if (email != undefined && email != "") {
      if (textPassword != undefined && textPassword != "") {
        try {

          const User = await UserService.identifyUser(email, textPassword)

          if (User) {
            jwt.sign(
              {
                idReferenceRegister: User.idReferenceRegister,
                typeUser:User.typeUser
              },
              process.env.SECRET,
              {
                expiresIn: "24h",
              },
              (err, token) => {
                if (err) {
                  response.status(400);
                  response.send("Falha interna");
                } else {
                  response.status(200);
                  response.send({
                    token: token,
                  });
                }
              }
            );
          } else {
            response.status(404);
            response.send("Usuário não encontrado, verifique suas credencias de Login!");
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

module.exports = new Jwt();
