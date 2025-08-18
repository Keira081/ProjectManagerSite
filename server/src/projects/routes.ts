import { Router } from "express";
import { createProject, getProjects, deleteProject } from "./controllers";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);

export default router;
