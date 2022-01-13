import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verify } from "../utils/jwt";


export const requireAuthentication =
  (requireAdmin: boolean) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send();
    try {
      const resp = verify(authHeader) as JwtPayload;
      if (requireAdmin && !resp.isAdmin) {
        return res.status(401).send();
      }
    } catch (e) {
      return res.status(401).send(e);
    }

    next();
  };
