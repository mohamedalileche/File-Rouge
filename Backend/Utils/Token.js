import jwt from "jsonwebtoken"

const { sign } = jwt

export const createAccessToken = (userId,userRole,Badge) => {
  const accessToken = sign({ userId, userRole, Badge }, "secret_key", {
    expiresIn: "1d",
  })
  return accessToken
}
