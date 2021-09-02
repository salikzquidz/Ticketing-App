import express, {Request, Response} from 'express';

import { body, validationResult } from 'express-validator';
import { User } from '../models/user';

import { RequestValidationError } from '../errors/request-validation-error';

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
async(req : Request,res : Response) => {
    const {name, email, password} = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
        // return res.status(400).send(errors.array())
    }

    const existingUser = await User.findOne({email })
    if(existingUser){
        console.log('Email in use');
        return res.send({})
    }
    User.build
    const user = User.build({name, email, password})
    await user.save();  

    res.status(201).send(user)
})

export {router as signUpRouter};