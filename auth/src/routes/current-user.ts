import express from "express";
// import { currentUser } from "@salikztickets/common";

import { currentUser } from "@cygnetops/common";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  // req.currentUser sbb dah augment dlm middleware
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
