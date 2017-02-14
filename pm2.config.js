module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name: "huoshui_api",
      script: "app.js",
      instances: 0,
      exec_mode: "cluster",
      args: "--prod",
      watch: "true",
      max_memory_restart: "500M",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
      merge_logs: true,
      env: {
        NODE_ENV: "development"
      },
      env_dev : {
        NODE_ENV: "development"
      },
      env_prod : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "deploy",
      host : "api.huoshui.tk",
      ref  : "origin/master",
      repo : "https://github.com/badfuture/huoshui-backend-api.git",
      path : "/home/deploy/huoshui_api",
      "post-deploy" : "npm install && pm2 startOrRestart pm2.config.js --env prod",
      env  : {
        NODE_ENV: "production"
      }
    },
    dev : {
      user : "ubuntu",
      host : "api.huoshui.tk",
      ref  : "origin/master",
      repo : "https://github.com/badfuture/huoshui-backend-api.git",
      path : "/home/ubuntu/huoshui_api",
      "post-deploy" : "npm install && pm2 startOrRestart pm2.config.js --env dev",
      env  : {
        NODE_ENV: "development"
      }
    }
  }
}
