const UserService = require("../service/UserService");

class EntityClass {
    async method(request, response) {
        const {user} = request.body
        try {
            const res = await UserService.newUser(user)
            response.send(res)
        } catch (error) {
            response.send(error)
        }
    }
}

module.exports = new EntityClass();