import express from "express";
import createPlayerRoutes from "./players";
import createMatchesRoutes from "./matches";
import createTournamentsRoutes from "./tournaments";
import createAuthRoutes from "./auth";
import createAdminRoutes from "./admin";

import { requireAuthentication } from "../../middleware/middleware";

const router = express.Router();

router.use("/auth", createAuthRoutes);

router.use("/players", requireAuthentication(false), createPlayerRoutes);
router.use("/matches", requireAuthentication(false), createMatchesRoutes);
router.use("/tournaments", requireAuthentication(false), createTournamentsRoutes);

router.use("/admin", requireAuthentication(true), createAdminRoutes);

export default router;
