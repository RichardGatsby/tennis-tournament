
const requireEnv = (varName: string): string => {
    if(process.env[varName]) {
        return process.env[varName] as string
    }else {
        throw(`Process variable ${varName} missing`)
    }
}
export const getConfig = () => {
    return {
        apiUrl: requireEnv('REACT_APP_API_URL'),
    }
}