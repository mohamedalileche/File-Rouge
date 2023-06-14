import mongoose from "mongoose"

const Schema = mongoose.Schema

const refreshTokenSchema = new Schema({
  userId: {
    type: String,
  },

  refreshToken: {
    type: String,
    unique: true,
  },
})

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema)