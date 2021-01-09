import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {CreateTaskDto} from "../dto/create-task.dto";
import {TaskService} from "./task.service";
import { UpdateTaskDTO } from '../dto/update-task';

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {
  }

  @Get()
  public async getAll() {
    const res = await this.taskService.getAll();
    return res;
  }

  @Get('/:id')
  public async findById(@Param('id') taskId: number | string) {
    const res = await this.taskService.findById(taskId);
    return res;
  }

  @Post()
  public async createone(@Body() createTaskRequest: CreateTaskDto) {
    const res = await this.taskService.createOne(createTaskRequest);
    return res;
  }

  @Put('/:id')
  public async update(
    @Param('id') taskId: number | string,
    @Body() updateTaskRequests: UpdateTaskDTO,
  ) {
    const res = await this.taskService.update(taskId, updateTaskRequests);
    return res;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') taskId: number | string) {
    const res = await this.taskService.delete(taskId);
    return res;
  }
}
