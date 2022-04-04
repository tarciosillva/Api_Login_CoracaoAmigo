require("dotenv").config();
const jwt = require("jsonwebtoken");

class Jwt {
  newJwt(User) {
    if (User) {
      return new Promise((resolve, reject) => {
        jwt.sign(
          {
            idReferenceRegister: User.idReferenceRegister,
            typeUser: User.typeUser,
          },
          process.env.SECRET,
          {
            expiresIn: "24h",
          },
          (err, token) => {
            if (err) {
              console.error(err)
              reject("internal error" + err);
            } else {
              resolve({ token: token });
            }
          }
        );
      });
    } else {
      return "User not found";
    }
  }
}

module.exports = new Jwt();
