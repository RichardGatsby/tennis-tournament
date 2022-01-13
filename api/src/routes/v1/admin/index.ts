import express from "express";
import createPlayerRoutes from "./players";
import createMatchesRoutes from "./matches";



const router = express.Router();

router.use("/players", createPlayerRoutes);
router.use("/matches", createMatchesRoutes);

export default router;
