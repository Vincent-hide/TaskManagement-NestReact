export interface UpdateTaskDTO {
  title: string;
  description: string | undefined;
  status: TaskStatus;
}

export enum TaskStatus {
  Created = 0,
  InProgress = 1,
  Done = 2
}
