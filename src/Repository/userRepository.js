const UserModel = require("../models/Usuario");

class UserRepository {
  async getUser(email, password) {
    try {
      const result = await UserModel.findOne({
        where:{
          email:email,
          perfil:'Diretor'
        },
        attributes:['id','nome','email','senha','cpf','telefone','perfil']
      })
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserRepository();