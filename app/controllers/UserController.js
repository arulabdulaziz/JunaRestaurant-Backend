const db = require("../models");
const Bcrypt = require("../helper/bcrypt");
const Jwt = require("../helper/jwt");
const User = db.user;
class UserController {
  static async login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "username, password required!" });
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }
    if (Bcrypt.compare(password, user.password)) {
      const infoUser = {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
      };
      const token = Jwt.Sign(infoUser);
      return res.status(201).json({ data: { token, user: infoUser } });
    }
    return res.status(400).json({ message: "Username or Password Invalid!" });
  }
  static async register(req, res, next) {
    try {
      const { username, full_name, password } = req.body;
      if (!username || !full_name || !password)
        return res
          .status(400)
          .json({ message: "username, full_name, password required!" });
      const userExisted = await User.findOne({ username: username });
      if (userExisted) {
        return res.status(400).json({ message: "User Already Exist!" });
      }
      const user = new User({
        username,
        full_name,
        password: Bcrypt.hash(password),
      });
      const result = await user.save(user);
      return res.status(201).json({ data: result });
    } catch (error) {}
  }
}
module.exports = UserController;
