const User = require('../models/UserModels');

const createUser = async (req, res) => {
  try {
    
    const user = req.body;
    const result = await User.addUser(user);
    console.log("user: ",user);
    console.info('req is reach at try block in controller.');
    res.status(201).json({ message: 'User created' });
    
  } catch (err) {
    console.info('req is reach at catch block in controller.');
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

module.exports = { createUser };
