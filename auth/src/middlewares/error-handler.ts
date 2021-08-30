// 4 arguments - err, req, res, next
import { Express, Request, Response, NextFunction } from "express"

import { RequestValidationError } from "../errors/request-validation-error"
import { DatabaseConnectionError } from "../errors/database-connection-error"

export const errorHandler = (err : Error , req : Request, res : Response, next : NextFunction) => {
    console.log('Something went wrong', err)
    
    if(err instanceof RequestValidationError){
        const formattedError = err.errors.map(error => {
            // console.log(error)
            // console.log('This is Request Validation Error')
            return { message : error.msg, field : error.param, location : error.location }
        })
        // array of objects will be returned as response
        // {
        //     "errors": [
        //         {
        //             "message": "Email is not valid",
        //             "field": "email",
        //             "location": "body"
        //         }
        //     ]
        // }
        return res.status(400).send({errors : formattedError})
    }
    if(err instanceof DatabaseConnectionError){
        // console.log('This is Database Connection Error')
        return res.status(500).send({ errors : [ { message : err.reason } ] })
    }
    // err.message, property 'message' didapati daripada throw new Error. Keyword Error.
    res.status(400).send({
        errors : [ { message : 'Something went wrong' } ]}
    )
}