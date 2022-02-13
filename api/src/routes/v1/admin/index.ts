import express from "express";
import createPlayerRoutes from "./players";
import createMatchesRoutes from "./matches";
import createTournamentsRoutes from "./tournaments";

const router = express.Router();

router.use("/players", createPlayerRoutes);
router.use("/matches", createMatchesRoutes);
router.use("/tournaments", createTournamentsRoutes);


export default router;
