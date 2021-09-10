import express, {Request, Response} from 'express';

import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

import { RequestValidationError } from '../errors/request-validation-error';

import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.get('/api/saja2', (req,res)=> {
    
})

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
    }

    const existingUser = await User.findOne({ email })
    const existingName = await User.findOne({ name })

    // check if name is already in used
    if(existingName){
        throw new BadRequestError('Username has been taken')
    }

    // check if email is already in used
    if(existingUser){
        throw new BadRequestError('Email has been taken')
    }

    const user = User.build({name, email, password})
    await user.save();  

    // Generate JWT
    const userJWT = jwt.sign({
        id : user.id,
        email : user.email
    }, 'sad')

    // Store it on session object
    req.session ={
        jwt  : userJWT
    }

    res.status(201).send(user)
})

export {router as signUpRouter};