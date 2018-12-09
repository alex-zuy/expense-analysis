import * as React from 'react';
import {connect} from 'react-redux';

import {Task} from '../domain/Task';
import {RootState} from '../store/rootState';
import * as selectors from '../store/selectors';

import TaskView from './components/TaskView/TaskView';

interface TasksListProps {
    tasks: {
        isLoaded: boolean,
        list: Task[]
    },

}

const TasksList = (props: TasksListProps) => {
    return (
        <div>
            {props.tasks.list.map((task) => (
                <TaskView
                    key={task.id}
                    task={task}
                />
            ))}
            {props.tasks.isLoaded || (
                <div>
                    Loading...
                </div>
            )}
        </div>
    )
};

const mapState = (state: RootState): TasksListProps => ({
    tasks: selectors.getTasks(state)
});

export default connect(mapState)(TasksList);
