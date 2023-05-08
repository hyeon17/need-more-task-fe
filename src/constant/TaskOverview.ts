export enum StatusType {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum PriorityType {
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export type actionConstantsType = {
  DUE_DATE: {
    key: string;
    date?: Date;
    value?: string;
  };
  ASSIGNEE: {
    key: string;
    value?: string;
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
  EDIT_TASK: {
    key: string;
    value?: string;
  };
};
