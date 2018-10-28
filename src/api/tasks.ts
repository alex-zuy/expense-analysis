import axios from 'axios';
import {Task} from "../domain/Task";

export const getTasks = () => axios.get<Task>('/api/tasks/1.json')
    .then((result) => ({
        ...result,
        data: [result.data]
    }));
