import jwt from "jsonwebtoken"

const { sign } = jwt

export const createAccessToken = (userId,userRole) => {
  const accessToken = sign({ userId, userRole }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  })
  return accessToken
}

// export const createRefreshToken = (userId) => {
//   const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "7d",
//   })
//   return refreshToken
// }