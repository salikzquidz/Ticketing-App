import express from 'express';

const router = express.Router();

router.post('/api/users/signOut', (req,res) => {
    req.session = null;
    res.send({})
    // res.send('router sign OUT')
})

export {router as signOutRouter};