
import mongoose, { DocumentSetOptions } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IComment, IIssue, IMember, ISprint } from './createProjectArgs';


interface ICommentDoc extends IComment ,Document {
    _id: string;
}
const CommentSchema = new mongoose.Schema<ICommentDoc>({
  _id: String,
  autherId: String,
  content: String,
  createdAt: String,
});

interface IMemberDoc extends IMember, Document {
    _id: string;
}
const MemberSchema = new mongoose.Schema<IMemberDoc>({
    _id: { type: String, default: uuidv4 },
    name: String,
    role: {
      type: String,
      enum: [
        'uiUxDesigner',
        'developer',
        'tester',
        'projectManager',
        'teamLead',
        'businessAnalyst',
      ],
    },
  });  

interface IIssueDoc extends IIssue, Document {
    _id:string;
}
const IssueSchema = new mongoose.Schema<IIssueDoc>({
  _id: { type: String, default: uuidv4 },
  type: {
    type: String,
    enum: ['story', 'task', 'bug'],
  },
  title: String,
  description: String,
  createdBy: String,
  assignedTo: String,
  createdOn: String,
  updatedOn: String,
  status: {
    type: String,
    enum: ['backlog', 'todo', 'inProgress', 'done'],
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
  },
  parentId: String,
  comments: [CommentSchema],
});

// done

interface ISprintDoc extends Document{
    _id:string;
    name: string;
    startDate: string;
    endDate: string;
    issueIds?: string[];
}
const SprintSchema = new mongoose.Schema<ISprintDoc>({
  _id: { type: String, default: uuidv4 },
  name: String,
  startDate: String,
  endDate: String,
  issueIds: [String],
});

// done 

interface ICreateProjectDoc extends Document{
    _id: string;
    projectName: string;
    startDate?: string;
    endDate?: string;
    isActive: boolean;
    createdAt: string;
    members? : IMember[];
    issueIds?: string[];
    sprintIds?: string[];
}
const ProjectSchema = new mongoose.Schema<ICreateProjectDoc>({
  _id: { type: String, default: uuidv4 },
  projectName: { type:String , required: true},
  members: [MemberSchema],
  sprintIds: [String],
  issueIds: [String],
  startDate: String,
  endDate: String,
  isActive: {type:Boolean , required : true},
  createdAt: String,
});

export const Project = mongoose.model('Project', ProjectSchema);
export const Issue = mongoose.model('Issue', IssueSchema);
export const Sprint = mongoose.model('Sprint', SprintSchema);
