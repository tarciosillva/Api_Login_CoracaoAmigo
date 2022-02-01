const google = require("googleapis");

const googleConfig = {
  clientId:
    "636725004486-76vsd2lkqo67m1la9pe2n6gnde2p9v9e.apps.googleusercontent.com",
  clientSecret: "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",
  redirect: ["http://localhost:3000/validadeSocialLogin"],
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
