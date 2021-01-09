import {TaskStatus} from "../entity/task.entity";

export class TaskDTO {
  id: number | string;
  title: string;
  description: string;
  status: TaskStatus
}
