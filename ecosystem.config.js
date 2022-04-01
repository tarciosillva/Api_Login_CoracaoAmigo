module.exports = {
    apps: [
        {
            name: "ApiLogin-arquitetool",
            script: "./index.js",
            append_env_to_name: true,
            env_production: {
                PORT: process.env.APP_PORT,
                URI: 'mongodb+srv://arquitetoolMongoProduction:MJTEGA4aIxCfAOmO@arquitetoolcluster.qhk6c.mongodb.net/arquitetool?retryWrites=true&w=majority',
                SECRET: process.env.APP_SECRET,
            }
        }],
    deploy : {
        ApiLogin : {
          user : "root",
          key  : "~/.ssh/deploy.key",
          host : "142.93.51.97",
          ssh_options: "StrictHostKeyChecking=no",
          ref  : "origin/" + process.env.GITHUB_REF_NAME,
          repo : "git@apiloginalias:tarciosillva/ApiLoginArquitetool.git",
          path : "/root/app",
          "post-deploy" : "yarn install && pm2 startOrRestart ecosystem.config.js --env production"
        },
    }
}