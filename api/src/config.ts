
const requireEnv = (varName: string): string => {
    if(process.env[varName]) {
        return process.env[varName] as string
    }else {
        throw(`Process variable ${varName} missing`)
    }
}
export const getConfig = () => {
    return {
        port: requireEnv('PORT'),
        signingKey: requireEnv('SIGNING_KEY'),
        tokenPassword: requireEnv('TOKEN_PASSWORD'),
        tokenAdminPassword: requireEnv('TOKEN_ADMIN_PASSWORD'),
        tokenExpiresIn: requireEnv('TOKEN_EXPIRES_IN'),
        allowOrigin: requireEnv('ALLOW_ORIGIN')
    }
}