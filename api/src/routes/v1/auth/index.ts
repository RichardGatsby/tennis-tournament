import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getConfig } from "../../../config";
import { sign } from "../../../utils/jwt";

const router = express.Router();
router.get(
  "/token",
  expressAsyncHandler(async (req, res) => {
    const config = getConfig();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.sendStatus(401);
      return;
    }
    if (authHeader === config.tokenPassword) {
      res
        .cookie("access_token", sign(false), {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
      return;
    }
    if (authHeader === config.tokenAdminPassword) {
      res
        .cookie("access_token", sign(true), {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
      return;
    }
    res.send(401).send();
  })
);

export default router;
