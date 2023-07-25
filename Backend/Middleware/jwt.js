
import jwt from 'jsonwebtoken'
export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const accessToken =  authHeader.split(' ')[1];
  console.log({accessToken});

  if (!accessToken) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(accessToken, "secret_key", (err, decoded) => {
    console.log(err);
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.userId = decoded.userId;
    next();
  });
};