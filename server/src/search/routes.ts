import { Router } from "express";
import { search } from "./controller";

const router = Router();

router.get("/", search);

export default router;
