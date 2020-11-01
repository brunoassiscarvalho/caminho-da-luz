const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "Dados de autorização inválidos!" })

  if (!authHeader.startsWith('Bearer')) return res.status(401).send({ error: "Dados de autorização mal formados!" })

  const [scheme, token] = authHeader.split(' ');

  jwt.verify(token, process.env.DATA_MODE, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Autorização inválida!" })
    req.userId = decoded.id;
    return next();
  })
}