import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
// Middleware untuk check input
import { validateRequest } from '../middlewares/request-validator';

const router = express.Router();

router.post('/api/users/signup', [
    body('username')
        .isString()
        .withMessage('Username is not valid'),
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({min : 4, max : 20})
        .withMessage('Minimum length is 4 and maximum is 20')
],
validateRequest,
async(req : Request,res : Response) => {
    const {username, email, password} = req.body;
    
    const existingUser = await User.findOne({ email })
    const existingName = await User.findOne({ username })

    // check if name is already in used
    if(existingName){
        throw new BadRequestError('Username has been taken')
    }

    // check if email is already in used
    if(existingUser){
        throw new BadRequestError('Email has been taken')
    }

    const user = User.build({username, email, password})
    await user.save();  

    const userJWT = jwt.sign({
        id : user.id,
        email : user.email
        // tambah exclamation mark sbb dah buat check utk JWT_KEY dlm index.ts
    }, process.env.JWT_KEY!
);

    // Store it on session object
    req.session ={
        jwt  : userJWT
    }

    res.status(201).send(user)
})

export {router as signUpRouter};