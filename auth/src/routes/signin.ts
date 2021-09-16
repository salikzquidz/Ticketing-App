import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/request-validator';
const router = express.Router();

router.post('/api/users/signin', 
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Where is your password?')
],
validateRequest,
(req : Request ,res : Response) => {
 
    res.send('router sign IN')
})

export {router as signInRouter};