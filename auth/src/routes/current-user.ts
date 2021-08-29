import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req,res) => {
    res.send('router baru')
})

export {router as currentUserRouter};