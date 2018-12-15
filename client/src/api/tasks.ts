import axios from 'axios';
import {Task} from '../domain/Task';

export const getTask = () => axios.get<Task>('/api/tasks/1.json')
