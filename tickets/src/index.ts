import mongoose from "mongoose";
import { app } from "./app";
// const start = async() => {
//     await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
//         useNewUrlParser : true,
//         useUnifiedTopology : true,
//         useCreateIndex : true,
//     });
// }

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI must be defined");
  }

  try {
    await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }

  // the port number doesnt really make any differences when using kubernetes
  app.listen(3000, () => {
    console.log("listening on port 3000!");
  });
};

start();
