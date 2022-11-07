const jwt = require("jsonwebtoken");
class Jwt {
  static Sign(obj) {
    const token = jwt.sign(obj, process.env.secret);
    return token;
  }
  static Verify(token) {
    return jwt.verify(token, process.env.secret);
  }
}
module.exports = Jwt;
