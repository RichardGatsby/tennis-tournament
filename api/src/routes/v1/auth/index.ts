import express, { Request, response } from "express";
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
      res.send(sign(false));
      return;
    }
    if (authHeader === config.tokenAdminPassword) {
      res.send(sign(true));
      return
    }
    res.send(401).send();
  })
);

export default router;
