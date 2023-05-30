const bcrypt = require('bcrypt');
const main = require('../../database');
const joi = require('joi')

exports.register = async function register(req, res) {
  try {
    const schema = joi.object({
      username: joi.string().min(1).max(25).required(),
      password: joi.string().min(4).required()
    })

    const { value, error } = schema.validate(req.body)
    if(error) {
      return res.status(400).send(error.details[0].message)
    }
    
    let { username, password } = value;
    const { usersCollection } = await main();

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already taken');
    }
    username = username.toLowerCase()

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, friends: [] };
    await usersCollection.insertOne(newUser);

    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(500).send('Internal server error:' + err);
  }
};


