// 4 arguments - err, req, res, next
import { Express, Request, Response, NextFunction } from "express"

import { CustomError } from "../errors/custom-error"

export const errorHandler = (err : Error , req : Request, res : Response, next : NextFunction) => {
    // console.log('Something went wrong', err)
    
    if(err instanceof CustomError){
        return res.status(err.statusCode).send( {errors : err.serializeError() } )
    }
    // if(err instanceof DatabaseConnectionError){
    //     return res.status(err.statusCode).send({ errors : err.serializeError() } )
    // }

    // err.message, property 'message' didapati daripada throw new Error. Keyword Error.
    res.status(400).send({
        errors : [ { message : 'Something went wrong' } ]}
    )
}