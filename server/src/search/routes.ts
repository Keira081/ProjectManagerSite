import { Router } from "express";
import { search } from "./searchController";

const router = Router();

router.get("/", search);

export default router;
