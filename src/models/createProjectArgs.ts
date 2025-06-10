
interface IComment {
    autherId: string;
    content: string;
    createdAt: string;
}

interface IMember {
    name: string;
    role: string;
}

interface IIssue {
    type: string;
    title: string;
    description: string;
    createdBy: string;
    assignedTo?: string;
    createdOn: string;
    updatedOn?: string;
    status: string;
    priority?: string;
    parentId: string;
    comments?: IComment[];
}

interface ISprint {
    name: string;
    startDate: string;
    endDate: string;
    issues?: IIssue[];
}

interface IProject {
    projectName: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
    members? : IMember[];
    sprints? : ISprint[];
    issues? : IIssue[];
}

export  { IComment, IMember, IIssue, ISprint, IProject}