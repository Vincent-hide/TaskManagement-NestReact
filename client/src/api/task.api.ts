import axios from "axios";
import {TaskDTO} from "./dto/task.dto";
import {CreateTaskDTO} from "./dto/create-task.dto";
import {UpdateTaskDTO} from "./dto/update-task.dto";

export class TaskAPI {
  public static async getAll(): Promise<TaskDTO[]> {
    return await axios.get("http://localhost:2000/task")
      .then(res => res.data)
      .catch(err => err);
  }

  public static async createOne(createRequest: CreateTaskDTO) {
    return await axios.post("http://localhost:2000/task", createRequest)
      .then(res => res.data)
      .catch(err => err);
  }

  public static async deleteOne(taskId: number | string) {
    return await axios.delete(`http://localhost:2000/task/${taskId}`)
      .then(res => res.data)
      .catch(err => err);
  }

  public static async updateOne(taskId: number | string, updateRequest: UpdateTaskDTO) {
    return await axios.put(`http://localhost:2000/task/${taskId}`, updateRequest)
      .then(res => res.data)
      .catch(err => err);
  }

}
