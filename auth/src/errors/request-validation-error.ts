import { ValidationError } from "express-validator";

// Error -> built in class
export class RequestValidationError extends Error{
    constructor(public errors : ValidationError[]){
        super()

        // Only because we are extending built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}

// throw new RequestValidationError(errors)