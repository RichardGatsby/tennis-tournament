import jwt from 'jsonwebtoken'
import { getConfig } from '../config'
const config = getConfig()

export const sign = (isAdmin: boolean) => {
   return jwt.sign({ isAdmin }, config.signingKey, { expiresIn: config.tokenExpiresIn })
}

export const verify = (token: string) => {
    return jwt.verify(token, config.signingKey);
}