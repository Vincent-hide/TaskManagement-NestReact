import axios from "axios";
import {TaskDTO} from "./dto/task.dto";

export class TaskAPI {
  public static async getAll(): Promise<TaskDTO[]> {
    return await axios.get("http://localhost:3000/task")
      .then(res => res.data)
      .catch(err => err)
  }
}
