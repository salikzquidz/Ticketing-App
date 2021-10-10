import express from "express";
// smol package for async
import "express-async-errors";

const app = express();

import cookieSession from "cookie-session";

// not found error
import { NotFoundError } from "@salikztickets/common";
// middleware
import { errorHandler } from "@salikztickets/common";

app.use(express.json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// express-async-errors
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
// after throw, errorHandler will be used

app.use(errorHandler);

export { app };
