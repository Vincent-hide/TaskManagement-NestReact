import {Body, Controller, Post} from '@nestjs/common';
import {CreateTaskDto} from "../dto/create-task.dto";
import {TaskService} from "./task.service";

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {
  }

  @Post()
  public async createone(@Body() createTaskRequest: CreateTaskDto) {
    const res = await this.taskService.createOne(createTaskRequest);
    return res;
  }
}
