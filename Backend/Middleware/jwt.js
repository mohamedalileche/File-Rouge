export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(accessToken, 'secret_key', (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.userId = decoded.userId;
    next();
  });
};