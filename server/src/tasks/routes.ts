import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "./controllers";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
router.delete("/:taskId", deleteTask);

export default router;
