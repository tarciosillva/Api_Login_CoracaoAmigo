const GoogleService = require("../service/GoogleService");

class GoogleController {
  async getConnectionUrl(request, response) {
    try {
      const urlConnection = await GoogleService.getConnectionUrl();
      response.send(urlConnection);
    } catch (error) {
      response.send(error);
    }
  }

  async validateUser(request, response){
      const code = request.body.code
      try {
          const userData = await GoogleService.validateUser(code)
          response.send(userData)
      } catch (error) {
          response.send(error)
      }
  }
}

module.exports = new GoogleController();
