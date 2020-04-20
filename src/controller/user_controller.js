const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

const userController = {};

userController.register = async (req, res, next) => {
  const { name, email, password, joined } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    joined,
  });

  try {
    const user = await newUser.save();
    return res.send({ user });
  } catch (e) {
    if (e.code === 11000 && e.name === "MongoError") {
      var error = new Error(`Email address ${newUser.email} is already taken`);
      next(error);
    }
    next(e);
  }
};

userController.login = async (req, res, next) => {
  //Username , pasword in request
  const { email, password } = req.body;
  try {
    //check username and password are ok
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error(`The email ${email} not valid `);
      err.status = 401;
      next(err);
    }
    user.isPasswordMatch(password, user.password, (err, matched) => {
      if (matched) {
        //if credi ok, then create JWT and return it
        //secret
        //expiation
        const secret = process.env.JWT_SECRET;
        const expire = process.env.JWT_EXPIRATION;

        const token = jwt.sign({ _id: user._id }, secret, {
          expiresIn: expire,
        });
        return res.send({ token });
      }
      res.status(401).send({
        error: "invalid username/password combination",
      });
    });
  } catch (e) {
    next(e);
  }
// if cradit ok , then create JWT and return it
};
module.exports = userController;
