module.exports = async (req, res, next) => {
  try {
    const isAdmin = req?.loginUser?.username === "admin";
    if (isAdmin) {
      next();
    } else {
      throw {
        status: 401,
        message: `You not admin!`,
      };
    }
  } catch (err) {
    return res.status(err.status ? err.status : 500).json(err)
  }
};
