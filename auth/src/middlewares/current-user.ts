import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    id : string;
    email : string;
}

// augmenting type definition file
declare global {
    namespace Express {
        interface Request {
            currentUser? : UserPayload;
        }
    }
}

export const currentUser= (req: Request,res : Response,next : NextFunction) => {
    
    // if(!req.session?.jwt)
    if(!req.session || !req.session.jwt){
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        // req object does not have currentUser property, so we have to augment type definition file
        // 1st - buat interface UserPayload
        // 2nd - tmbah as UserPayload dkt payload
        // 3rd - declare Global = edit type defintion file Express punya Request
        req.currentUser = payload;
        res.send({currentUser : payload});
    } catch (error) {}
    next();
}