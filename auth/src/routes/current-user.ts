import express from 'express';
import jwt from 'jsonwebtoken'
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req,res) => {
    // req.currentUser sbb dah augment dlm middleware
    res.send({currentUser : req.currentUser || null});
    // if(!req.session?.jwt)
    // if(!req.session || !req.session.jwt){
    //     return res.send({currentUser:null})
    // }
    // try{
    //     const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    //     res.send({currentUser : payload});
    // }catch{
    //     res.send({currentUser : null});
    // }

    // res.send()
})

export {router as currentUserRouter};