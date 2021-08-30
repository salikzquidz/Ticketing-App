import { ValidationError } from "express-validator";

interface CustomError {
    statusCode : number;
    serializeError() : {
        message : string,
        field? : string
    }[] // array of objects
}

// Error -> built in class
export class RequestValidationError extends Error implements CustomError{
    statusCode = 400;
    constructor(public errors : ValidationError[]){
        super()

        // Only because we are extending built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeError(){
        return this.errors.map(err => {
            return{ message : err.msg,field : err.param}
        })
    }
}

// throw new RequestValidationError(errors)