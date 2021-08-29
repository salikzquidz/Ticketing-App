import express, {Request, Response} from 'express';

import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({min : 4, max : 20})
        .withMessage('Minimum length is 4 and maximum is 20')
],
(req : Request,res : Response) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
        // return res.status(400).send(errors.array())
    }

    throw new DatabaseConnectionError();
    res.send('sign  UP successfully')

})

export {router as signUpRouter};