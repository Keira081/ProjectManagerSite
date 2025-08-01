import { Router } from "express";
import { createProject, getProjects } from "./controllers";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);

export default router;
