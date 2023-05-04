export enum StatusType {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
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

export const actionConstants: actionConstantsType = {
  DUE_DATE: {
    key: 'Due Date',
    value: '2021-08-20',
  },
  ASSIGNEE: {
    key: 'Assignee',
  },
  SET_STATUS: {
    key: 'Set Status',
    value: StatusType.TODO,
  },
  SET_PRIORITY: {
    key: 'Set Priority',
    value: PriorityType.LOW,
  },
  DELETE_TASK: {
    key: 'Delete Task',
  },
  EDIT_TASK: {
    key: 'Edit Task',
  },
};
