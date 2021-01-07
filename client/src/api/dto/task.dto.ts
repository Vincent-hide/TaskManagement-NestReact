export interface TaskDTO {
  id: number | string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Created = 0,
  InProgress = 1,
  Done = 2,
}
