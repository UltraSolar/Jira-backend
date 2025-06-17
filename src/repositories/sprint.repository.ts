import { ISprint, SprintModel, ISprintDTO } from "../models/sprint.model";

export class SprintRepository {
    async getSprint(): Promise<ISprint[]> {
        const sprints = await SprintModel.find({}).exec();
        return sprints;
    }

    async createSprint(data: ISprintDTO): Promise<ISprint> {
        const sprint = new SprintModel(data);
        return await sprint.save();
    }

    async updateSprint(id: String, data: Partial<ISprintDTO>): Promise<ISprint | null> {
        const updatedSprint = await SprintModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
        return updatedSprint;
    }

    async deleteSprint(id: String): Promise<boolean> {
        const deletedSprint = await SprintModel.findByIdAndDelete(id).exec();
        return deletedSprint != null;
    }
}
