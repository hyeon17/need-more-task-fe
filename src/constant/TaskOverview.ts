import { Assignee } from '@/apis/kanban';

export enum StatusType {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum PriorityType {
  URGENT = 'URGENT',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum TeamType {
  DEVELOPMENT = 'DEVELOPMENT',
  HR = 'HR',
  MANAGEMENT = 'MANAGEMENT',
  TRADE = 'TRADE',
  SALES = 'SALES',
  SERVICES = 'SERVICES',
  PRODUCTION = 'PRODUCTION',
  EDUCATION = 'EDUCATION',
  MARKETING = 'MARKETING',
  OTHERS = 'OTHERS',
}

export type actionConstantsType = {
  START_AT?: {
    key: string;
    date?: Date;
    value?: string;
  };
  END_AT: {
    key: string;
    date?: Date;
    value?: string;
  };
  ASSIGNEE: {
    key: string;
    value?: Assignee[];
  };
  SET_STATUS: {
    key: string;
    value?: StatusType;
  };
  SET_PRIORITY: {
    key: string;
    value?: PriorityType;
  };
  DELETE_TASK: {
    key: string;
    value?: string;
  };
  EDIT_TASK?: {
    key: string;
    value?: string;
  };
};

export type actionType = keyof actionConstantsType;
