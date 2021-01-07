import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Task, TaskStatus} from "../entity/task.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTaskDto} from "../dto/create-task.dto";
import {TaskDTO} from "../dto/task.dto";

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {
  }
  public async createOne(createTaskDto: CreateTaskDto) {
    const task: Task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.Created;

    await this.taskRepository.save(task);

    const taskDTO = new TaskDTO();
    taskDTO.id = task.id;
    taskDTO.title = task.title;
    taskDTO.description = task.description;
    taskDTO.status = task.status;

    return taskDTO;
  }
}
