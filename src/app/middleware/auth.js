const User = require('./../models/User')
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  // checks if the token is present on the header of the requisiton
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' })
  }
  // checks if the token is valid on the header of the requisiton
  const [, token] = authHeader.split(' ')
  try {
    const decoded = await User.checksToken(token)
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
