import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError{
    statusCode = 400;
    constructor(public errors : ValidationError[]){
        super('Error in Request Validator')

        // Only because we are extending built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeError(){
        return this.errors.map(err => {
            return{ message : err.msg, field : err.param}
        })
    }
}