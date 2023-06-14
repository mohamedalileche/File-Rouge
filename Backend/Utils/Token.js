import jwt from "jsonwebtoken"

const { sign } = jwt

export const createAccessToken = (userId) => {
  const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
  return accessToken
}

export const createRefreshToken = (userId) => {
  const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })
  return refreshToken
}