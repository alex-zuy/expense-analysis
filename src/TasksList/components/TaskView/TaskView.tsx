import * as React from 'react';
import {Task} from "../../../domain/Task";
import {Item} from "../../../domain/Item";

interface TaskViewProps {
    task: Task
}

const TaskView = (props: TaskViewProps) => {
    const {task} = props;

    return (
        <div>
            <h4>
                {task.title}
            </h4>
            <div>
                {task.items.map((item) => (
                    <ItemView
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
};

export default TaskView;

interface ItemViewProps {
    item: Item
}

const ItemView = (props: ItemViewProps) => (
    <div>
        {props.item.title}
    </div>
);
