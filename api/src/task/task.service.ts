import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskDTO } from '../dto/task.dto';
import { UpdateTaskDTO } from '../dto/update-task';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {
  }

  public async createOne(createTaskDto: CreateTaskDto) {
    const task: Task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.Created;

    await this.taskRepository.save(task);

    return this.entityToDTO(task);
  }

  private entityToDTO(task: Task): TaskDTO {
    const taskDTO = new TaskDTO();
    taskDTO.id = task.id;
    taskDTO.title = task.title;
    taskDTO.description = task.description;
    taskDTO.status = task.status;

    return taskDTO;
  }

  public async getAll() {
    const tasks: Task[] = await this.taskRepository.find();
    const tasksDTO: TaskDTO[] = tasks.map((x: Task) => this.entityToDTO(x));
    return tasksDTO;
  }

  public async findById(taskId: number | string) {
    const task: Task = await this.taskRepository.findOne(taskId);
    if (!task)
      throw new NotFoundException(`Task with the id ${taskId} was not found`);

    return this.entityToDTO(task);
  }

  public async update(taskId: number | string, updateTaskRequest: UpdateTaskDTO) {
    const task: Task = await this.findById(taskId);
    const { title, description, status } = updateTaskRequest;

    if (title) task.title = title || task.title;
    if (description) task.description = description;
    if (status) task.status = status || task.status;

    await this.taskRepository.save(task);

    return this.entityToDTO(task);
  }
}
