const google = require("googleapis");

const googleConfig = {
  clientId:
    "",
  clientSecret: "",
  redirect: [""],
};

const googleConnection = () => {
  return new google.Auth.OAuth2Client(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
};

const getUrl = (auth) => {
  return auth.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
};

module.exports = { googleConnection, getUrl };
