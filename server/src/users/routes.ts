import { Router } from "express";

import { getUser, getUsers } from "./controllers";

const router = Router();

router.get("/", getUsers);
router.get("/:cognitoId", getUser);

export default router;
