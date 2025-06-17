import { Router } from "express";
import { handleGetSprint, handleCreateSprint, handleUpdateSprint, handleDeleteSprint } from "../controllers/sprint.controller"

const router = Router();

router.get("/", handleGetSprint);
router.post("/", handleCreateSprint);
router.put("/:id", handleUpdateSprint);
router.delete("/:id", handleDeleteSprint);

export default router;