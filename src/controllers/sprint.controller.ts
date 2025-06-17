import { ISprintDTO } from "../models/sprint.model";
import { getSprint, createSprint, updateSprint, deleteSprint } from "../services/sprint.service";
import { Request, Response } from "express";

const handleGetSprint = async (req: Request, res: Response) => {
    try {
        const sprint = await getSprint();
        res.status(200).json({ sprint });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
        return;
    }
}

const handleCreateSprint = async (req: Request, res: Response) => {
    try {
        const sprint: ISprintDTO = req.body;
        const newSprint = await createSprint(sprint);
        res.status(201).json({ sprint: newSprint });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create sprint" })
    }
}

const handleUpdateSprint = async (req: Request, res: Response) => {
    try {
        const sprintId = req.params.id;
        const sprintBody: Partial<ISprintDTO> = req.body
        if (sprintBody.name !== undefined && sprintBody.name.trim() === "") {
            res.status(400).json({ message: "name cannot be empty" });
            return;
        }
        const updatedSprint = await updateSprint(sprintId, sprintBody);
        if (!updatedSprint) {
            res.status(404).json({ message: "Sprint not found" });
            return;
        }
        res.status(200).json({ sprint: updatedSprint });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update sprint" })
    }
}

const handleDeleteSprint = async (req: Request, res: Response) => {
    try {
        const sprintId = req.params.id;
        const deletedSprint = await deleteSprint(sprintId);
        if (!deletedSprint) {
            res.status(404).json({ message: "Sprint not found" });
            return;
        }
        res.status(200).json({ message: "Sprint deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export { handleGetSprint, handleCreateSprint, handleUpdateSprint, handleDeleteSprint }