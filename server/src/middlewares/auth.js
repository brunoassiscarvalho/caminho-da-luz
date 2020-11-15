const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "Dados de autorização inválidos!" })

  if (!authHeader.startsWith('Bearer')) return res.status(401).send({ error: "Dados de autorização mal formados!" })

  const [scheme, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.DATA_MODE);
    const user = await User.findById(decoded._id)
    if (!user) return res.status(403).send({ error: "Autorização inválida!" }) 
    req.user = user  
    return next();
  }
  catch (ex) { 
    return res.status(401).send({ error: "Autorização inválida!" }) 
  } 
}


exports.validateUserActive = async (req, res, next) => {
  if (req.user.status != 10) return res.status(403).send({ error: "Autorização inválida!" })
  return next();
}

