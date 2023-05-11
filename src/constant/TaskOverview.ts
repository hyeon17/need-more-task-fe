import { Assignee } from '@/apis/kanban';
import { IAssignee } from '@/components/CommonAvatar/CommonAvatar';

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
    value?: Date;
  };
  END_AT: {
    key: string;
    value?: Date;
  };
  ASSIGNEE: {
    key: string;
    value?: IAssignee[];
  };
  SET_STATUS: {
    key: string;
    value?: StatusType;
  };
  SET_PRIORITY: {
    key: string;
    value?: PriorityType;
  };
  DELETE_TASK?: {
    key: string;
    value?: string;
  };
  EDIT_TASK?: {
    key: string;
    value?: string;
  };
};

export type actionType = keyof actionConstantsType;
