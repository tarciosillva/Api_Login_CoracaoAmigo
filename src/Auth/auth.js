require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserRepository = require("../Repository/userRepository");

class Jwt {
  async authorization(request, response) {
    var email = request.body.email;
    var password = request.body.password;

    if (email != undefined && email != "") {
      if (password != undefined && password != "") {
        try {
          const User = await UserRepository.getUser(email, password);

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
            response.send("Usuário não existe, informe ao desenvolvedor!");
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
