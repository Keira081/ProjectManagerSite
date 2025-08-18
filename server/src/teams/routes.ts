import { Router } from "express";
import { getTeams } from "./controllers";

const router = Router();

router.get("/", getTeams);

export default router;
