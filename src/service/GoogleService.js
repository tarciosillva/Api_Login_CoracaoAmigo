const { googleConnection, getUrl } = require("../config/googleConfig");
const { request } = require("gaxios");
const UserRepository = require("../Repository/userRepository");
const Jwt = require("../Auth/Jwt");

class GoogleService {
  async getConnectionUrl() {
    try {
      const auth = googleConnection();
      const url = await getUrl(auth);
      return url;
    } catch (error) {
      return error;
    }
  }

  async validateUser(code) {
    try {
      let { tokens } = await googleConnection().getToken(code);

      const userdata = await request({
        baseURL: "https://www.googleapis.com",
        url: "/oauth2/v2/userinfo",
        headers: { Authorization: "Bearer " + tokens.access_token },
      });
      const userGoogle = userdata.data;

      if (userGoogle.verified_email) {
        const User = await UserRepository.getUser(userGoogle.email);

        if (User) {
          if (User.googleUserId === "") {
            await UserRepository.updategoogleUserId(User._id, userGoogle.id);
          }
          const result = await Jwt.newJwt(User);
          return result;
        } else {
          return "User not found";
        }
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = new GoogleService();
