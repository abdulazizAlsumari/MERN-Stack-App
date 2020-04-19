const user = require("../models/user_models");
const userController = {};

userController.register = async (req, res, next) => {
  const { name, email, password, joined } = req.body;
  const newUser = new user({
    name,
    email,
    password,
    joined,
  });

  try {
    const user = await newUser.save();
    return res.send({ user });
  } catch (e) {
    if(e.code === 11000 && e.name === 'MongoError'){
      var error = new Error(`Email address ${newUser.email} is already taken`);
      next(error);
    }
    next(e);
  }
};

module.exports = userController;
