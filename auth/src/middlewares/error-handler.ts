// 4 arguments - err, req, res, next
import { Express, Request, Response, NextFunction } from "express"

import { RequestValidationError } from "../errors/request-validation-error"
import { DatabaseConnectionError } from "../errors/database-connection-error"

export const errorHandler = (err : Error , req : Request, res : Response, next : NextFunction) => {
    console.log('Something went wrong', err)
    
    if(err instanceof RequestValidationError){
        console.log('This is Request Validation Error')
    }
    if(err instanceof DatabaseConnectionError){
        console.log('This is Database Connection Error')
    }
    // err.message, property 'message' didapati daripada throw new Error. Keyword Error.
    res.status(400).send({message : err.message})
}