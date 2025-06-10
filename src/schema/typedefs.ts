// File: src/schemas/typeDefs.ts
import  gql  from 'graphql-tag';

export const typeDefs = gql`
  enum IssueType {
    story
    task
    bug
  }

  enum IssueStatus {
    backlog
    todo
    inProgress
    done
  }

  enum TaskPriority {
    high
    medium
    low
  }

  enum Role {
    uiUxDesigner
    developer
    tester
    projectManager
    teamLead
    businessAnalyst
  }

  type Comment {
    _id: String!
    authorId: String!
    content: String!
    createdAt: String!
  }



  type Issue {
    _id: String!
    type: IssueType!
    title: String!
    description: String
    createdBy: String!
    assignedTo: String
    createdOn: String!
    updatedOn: String
    status: IssueStatus!
    priority: TaskPriority!
    parentId: String!
    comments: [Comment]
  }

  type Sprint {
    _id: String!
    name: String!
    startDate: String!
    endDate: String!
    issues: [Issue!]
  }

  type Member {
    _id: String!
    name: String!
    role: Role!
  }
  
  input MemberInput {
    name: String!
    role: Role!
  }

  input SprintInput {
    name: String!
    startDate: String!
    endDate: String!
    issues: [IssueInput!]
  }

  input IssueInput {
    type: IssueType!
    title: String!
    description: String
    createdBy: String!
    assignedTo: String
    createdOn: String!
    updatedOn: String
    status: IssueStatus!
    priority: TaskPriority!
    parentId: String!
    comments: [CommentInput]
  }

  input CommentInput {
    authorId: String!
    content: String!
    createdAt: String!
  }


  type Project {
    _id: String!
    projectName: String!
    members: [Member]
    sprints: [Sprint]
    issues: [Issue]
    startDate: String!
    endDate: String!
    isActive: Boolean!
    createdAt: String!
  }

  input ProjectInput {
    projectName: String!
    startDate: String!
    endDate: String!
    isActive: Boolean!
    createdAt: String!
    members: [MemberInput]
    sprints: [SprintInput]
    issues: [IssueInput!]
  }

  type Query {
    getProjects: [Project!]
    getProject(id: String!): Project
  }

  type Mutation {
    createProject(
      project: ProjectInput
    ): Project

    createIssue(
      projectId: String!,
      sprintId: String,
      issue: IssueInput
    ): Project
  }
`;




