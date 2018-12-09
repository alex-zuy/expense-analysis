import {Item} from './Item';

export interface Task {
    id: string,
    title: string,
    items: Item[]
}
