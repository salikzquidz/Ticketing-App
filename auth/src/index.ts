import express from "express";
const app = express();

import {currentUserRouter} from './routes/current-user'
import {signUpRouter} from './routes/signup';
import {signInRouter} from './routes/signin';
import {signOutRouter} from './routes/signout'
import {errorHandler} from './middlewares/error-handler'

app.use(express.json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(errorHandler);

// the port number doesnt really make any differences when using kubernetes
app.listen(3000, ()=>{console.log('listening on port 3000!')})