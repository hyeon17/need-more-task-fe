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
