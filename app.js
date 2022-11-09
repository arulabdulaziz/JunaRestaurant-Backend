if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const ProductController = require("./app/controllers/ProductController");
const UserController = require("./app/controllers/UserController");
const ChartController = require("./app/controllers/ChartController");
const authentication = require("./app/middlewares/authentication");
const authorization = require("./app/middlewares/authorization");
require("./app/models");
app.post("/login", UserController.login);
app.post("/register", UserController.register);
app.get("/product", ProductController.index);
app.get("/product/:id", ProductController.show);
app.use(authentication);
app.get("/chart", ChartController.show);
app.post("/chart", ChartController.create);
app.use(authorization);
app.post("/product", ProductController.create);
app.put("/product/:id", ProductController.update);
app.delete("/product/:id", ProductController.delete);

module.exports = app;
