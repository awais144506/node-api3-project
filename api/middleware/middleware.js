const User = require('../users/users-model');


function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timeStamp}] ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    }
    else {
      next({ status: 404, message: 'user not found' });
    }
  }
  catch (error) {
    next(error);
  }
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { name } = req.body;
    if (name !== undefined &&
      typeof name === 'string' &&
      name.length && name.trim().length) {
      req.name = name;
      next();
    }
    else {
      next({ status: 400, message: 'missing required name field' });
    }
  }
  catch (error) {
    next(error);
  }
}

async function validatePost(req, res, next) {
  // DO YOUR MAGIC
  
    const { text } = req.body;
    if (!text || !text.trim()) {
     res.status(400).json({
      message:"missing required text field"
     });
    }
    else {
      req.text = text.trim();
      next();
    }
  }




// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validatePost,
  validateUser
};