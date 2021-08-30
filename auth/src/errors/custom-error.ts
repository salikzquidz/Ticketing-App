export abstract class CustomError extends Error{
    // must have statusCode and serializeError()

    abstract statusCode : number

    // add argument in constructor just for logging purposes. Because `throw new Error (message)` => want to get the `message` string
    // message argument is optional => refer type definition file for Error
    constructor(message : string) {
         super(message);
        
         // Only because we are extending built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract serializeError()  :  { message : string, field? : string}[];
    
}

