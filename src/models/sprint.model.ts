import mongoose, { Schema, Document } from "mongoose";

export interface ISprint extends Document {
    name: string;
    startDate: Date;
    endDate: Date;
    issueIds: string[];
}

export interface ISprintDTO {
    name: string;
    startDate?: Date;
    endDate?: Date;
    issueIds?: string[];
}

const SprintSchema: Schema = new Schema<ISprint>({
    name: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    issueIds: [{ type: String }],
}, {
    timestamps: true,
});

export const SprintModel = mongoose.model<ISprint>("Sprint", SprintSchema);
