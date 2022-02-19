import { Decoders as D, runDecoder } from "typed-decoders";


export const StringToNumber = D.Pipe(D.Str, (value) => {
    const validated = runDecoder(D.Num, parseInt(value))
    if(!validated.success){
        throw validated.error
    }
    return validated
})
