import express from "express";
const app = express();

app.use(express.json());

// the port number doesnt really make any differences when using kubernetes
app.listen(3000, ()=>{console.log('listening on port 3000')})