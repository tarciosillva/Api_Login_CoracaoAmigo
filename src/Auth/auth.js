require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserRepository = require("../Repository/userRepository");

class Jwt {
  /* async autenticate(request, response, next) {
    const authToken = request.headers["authorization"];

    if (authToken != undefined) {
      const bearer = authToken.split(" ");
      var token = bearer[1];

      jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) {
          response.status(401);
          response.send("Token inválido");
        } else {
          request.token = token;
          request.loggedUser = {
            id: data._id,
          };
          next();
        }
      });
    } else {
      response.status(400);
      response.send("Credencias de autenticação não foram providas");
    }
  }*/

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
