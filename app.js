if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const sslRedirect = require("heroku-ssl-redirect");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(sslRedirect());
const ProductController = require("./app/controllers/ProductController")
const UserController = require("./app/controllers/UserController");
const authentication = require('./app/middlewares/authentication')
const authorization = require("./app/middlewares/authorization");
require("./app/models");
app.post("/login", UserController.login);
app.post("/register", UserController.register);
app.get("/product", ProductController.index);
app.get("/product/:id", ProductController.show);
app.use(authentication)
app.use(authorization);
app.post("/product", ProductController.create);
app.put("/product/:id", ProductController.update);
app.delete("/product/:id", ProductController.delete);

module.exports = app;
