import express from "express";
// smol package for async
import 'express-async-errors';
const app = express();

import {currentUserRouter} from './routes/current-user'
import {signUpRouter} from './routes/signup';
import {signInRouter} from './routes/signin';
import {signOutRouter} from './routes/signout'

// not found error
import { NotFoundError } from "./errors/not-found-error";
// middleware
import {errorHandler} from './middlewares/error-handler'

app.use(express.json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

// express-async-errors 
app.all('*', async(req, res)=> {
    throw new NotFoundError();
})
// after throw, errorHandler will be used

app.use(errorHandler);

// the port number doesnt really make any differences when using kubernetes
app.listen(3000, ()=>{console.log('listening on port 3000!')})