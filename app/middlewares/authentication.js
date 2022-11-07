const Jwt = require("../helper/jwt");
module.exports = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: `you must login first` });
  } else {
    try {
      const decoded = await Jwt.Verify(token);
      if (!decoded) {
        throw {
          status: 401,
          message: `Your Session Is Time Up`,
        };
      } else {
        req.loginUser = decoded;
        next();
      }
    } catch (error) {
      return res.status(err.status ? err.status : 500).json(err);
    }
  }
};
