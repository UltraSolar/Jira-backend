import { ISprint, ISprintDTO } from "../models/sprint.model";
import { SprintRepository } from "../repositories/sprint.repository";

const sprintRepo = new SprintRepository();

export const getSprint = async () => {
    return await sprintRepo.getSprint();
}

export const createSprint = async (data: ISprintDTO): Promise<ISprint> => {
    return await sprintRepo.createSprint(data);
}

export const updateSprint = async (id: String, data: Partial<ISprintDTO>): Promise<ISprint | null> => {
    return await sprintRepo.updateSprint(id, data);
}

export const deleteSprint = async (id: String): Promise<boolean> => {
    return await sprintRepo.deleteSprint(id);
}