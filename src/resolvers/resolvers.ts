// File: src/resolvers/resolvers.ts
import { IIssue, IProject } from '../models/createProjectArgs';
import { Project, Issue, Sprint } from '../models/project.schema';
import { v4 as uuidv4 } from 'uuid';



export const resolvers = {
  Query: {
    getProjects: async () => {
      const projects = await Project.find().lean();
      if (!projects.length) return [];

      const allSprintIds = projects.flatMap(p => p.sprintIds || []);
      const allIssueIds = projects.flatMap(p => p.issueIds || []);

      // Fetch all sprints and issues once
      const sprints = await Sprint.find({ _id: { $in: allSprintIds } }).lean();
      const issues = await Issue.find({ _id: { $in: allIssueIds } }).lean();

      const sprintMap = new Map<string, any>();
      for (const sprint of sprints) {
        sprintMap.set(sprint._id, { ...sprint });
      }

      const issueMap = new Map<string, any>();
      for (const issue of issues) {
        issueMap.set(issue._id, issue);
      }

      const enrichedProjects = await Promise.all(
        projects.map(async (project) => {
          const projectSprints = (project.sprintIds || []).map(sprintId => {
            const sprint = sprintMap.get(sprintId);
            if (!sprint) return null;

            const sprintIssues = (sprint.issueIds || []).map((id: string) => issueMap.get(id)).filter(Boolean);
            return { ...sprint, issues: sprintIssues };
          }).filter(Boolean);

          const projectIssues = (project.issueIds || []).map(id => issueMap.get(id)).filter(Boolean);

          return {
            ...project,
            issues: projectIssues,
            sprints: projectSprints,
          };
        })
      );

      return enrichedProjects;
    },

    getProject: async (
      _: any,
      args: { id: string }
    ) => {
      const project = await Project.findById(args.id).lean();

      if (!project) return null;

      const sprints = await Sprint.find({ _id: { $in: project.sprintIds } }).lean();

      const sprintIssueMap: Record<string, any[]> = {};

      for (const sprint of sprints) {
        const sprintIssue = await Issue.find({ _id: { $in: sprint.issueIds } });

        sprintIssueMap[sprint._id] = sprintIssue;
      }

      const projectIssues = await Issue.find({ _id: { $in: project.issueIds } });

      return {
        ...project,
        issues: projectIssues,
        sprints: sprints.map((sprint) => ({
          ...sprint,
          issues: sprintIssueMap[sprint._id]
        }))

      }
    },

  },
  Mutation: {

    createProject: async (
      _: any,
      args: IProject
    ) => {
      const {
        projectName,
        startDate,
        endDate,
        isActive,
        createdAt,
        members = [],
        sprints = [],
        issues = [],
      } = args;
      const projectId = uuidv4();

      // 1. Handle Team Members
      const memberDocs = members.map((member) => ({
        _id: uuidv4(),
        ...member,
      }));

      // 2. Handle Issues directly linked to project (not inside any sprint)
      const projectIssueIds: string[] = [];
      for (const issue of issues) {
        const issueId = uuidv4();
        await new Issue({
          _id: issueId,
          ...issue,
          createdOn: new Date(issue.createdOn),
          updatedOn: issue.updatedOn ? new Date(issue.updatedOn) : undefined,
          comments: (issue.comments || []).map((c: any) => ({
            _id: uuidv4(),
            ...c,
            createdAt: new Date(c.createdAt),
          })),
        }).save();
        projectIssueIds.push(issueId);
      }

      // 3. Handle Sprints and their nested issues
      const sprintIds: string[] = [];
      for (const sprint of sprints) {
        const sprintId = uuidv4();
        const sprintIssueIds: string[] = [];

        for (const issue of sprint.issues || []) {
          const issueId = uuidv4();
          await new Issue({
            _id: issueId,
            ...issue,
            createdOn: new Date(issue.createdOn),
            updatedOn: issue.updatedOn ? new Date(issue.updatedOn) : undefined,
            comments: (issue.comments || []).map((c: any) => ({
              _id: uuidv4(),
              ...c,
              createdAt: new Date(c.createdAt),
            })),
          }).save();
          sprintIssueIds.push(issueId);
        }

        await Sprint.create({
          _id: sprintId,
          name: sprint.name,
          startDate: new Date(sprint.startDate),
          endDate: new Date(sprint.endDate),
          issueIds: sprintIssueIds,
        });

        sprintIds.push(sprintId);
      }

      // 4. Save the final Project document
      const newProject = await Project.create({
        _id: projectId,
        projectName,
        members: memberDocs,
        sprintIds,
        issueIds: projectIssueIds,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive,
        createdAt: new Date(createdAt),
      });

      return newProject;
    },

    createIssue: async (_: any, args: {
      projectId: string;
      sprintId?: string;
      issue: IIssue;

    }) => {

      const { projectId, sprintId, issue } = args;
      const issueId = uuidv4();
      const newIssue = await new Issue({
        _id: issueId,
        ...issue,
      }).save();

      if (sprintId) {
        await Sprint.findOneAndUpdate({ _id: sprintId },
          { $push: { issueIds: issueId },}
        );
      } else {
        const updatedProject = await Project.findByIdAndUpdate({ _id: projectId },
          { $push: { issueIds: issueId } },
        )
      }
      return await resolvers.Query.getProject(_, { id: projectId });
    },

  },

  Project: {
    sprints: async (parent: any) => {
      return await Sprint.find({ _id: { $in: parent.sprintIds } });
    },
    issues: async (parent: any) => {
      return await Issue.find({ _id: { $in: parent.issueIds } });
    },
  },

  Sprint: {
    issues: async (parent: any) => {
      return await Issue.find({ _id: { $in: parent.issueIds} });
    }
  }
};