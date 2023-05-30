const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const main = require('../../database');
const joi = require('joi');

exports.login = async function login(req, res) {
  try {
    const schema = joi.object({
      username: joi.string().min(1).max(25).required(),
      password: joi.string().min(4).required(),
    });

    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(401).send(error.details[0].message);
    }

    const { username, password } = value;
    const { usersCollection } = await main();

    const user = await usersCollection.findOne({
      username: username.toLowerCase(),
    });
    if (!user) {
      return res.status(401).send('No user with this username found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Wrong username or password');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.cookie('authKey', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(200).send('Successfully logged in');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
