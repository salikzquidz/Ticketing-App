import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req,res) => {
    res.send('router sign IN')
})

export {router as signInRouter};