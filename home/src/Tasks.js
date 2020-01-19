import React, { useState, useEffect, useReducer } from 'react';
import uuid from 'uuid/v4';

const TASK_STORAGE_KEY = 'TASK_STORAGE_KEY';
const TYPES = {
	ADD_TASK: 'ADD_TASK',
	COMPLETE_TASK: 'COMPLETE_TASK',
	DELETE_TASK: 'DELETE_TASK'
};
const initialTaskState = {
	tasks: [],
	completedTasks: []
};
//this is nothing but reducer function
const taskReducer = (state = initialTaskState, action) => {
	switch (action.type) {
		case TYPES.ADD_TASK:
			return {
				...state,
				//Add task in the tasks
				tasks: [ ...state.tasks, action.task ]
			};

		case TYPES.COMPLETE_TASK:
			const { completeTasks } = action;
			return {
				...state,
				//Add entry in completedTasks
				completedTasks: [ ...state.completedTasks, completeTasks ],
				//Remove task from tasks
				tasks: [ ...state.tasks.filter((task) => task.id !== completeTasks.id) ]
			};

		case TYPES.DELETE_TASK:
			return {
				...state,
				//Remove task from completedTasks
				completedTasks: [ ...state.completedTasks.filter((t) => t.id !== action.task.id) ]
			};
		default:
			break;
	}
};

const storeTasks = ({ tasks, completedTasks }) => {
	localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify({ tasks, completedTasks }));
};
const restoredTasks = () => {
	let taskMap = JSON.parse(localStorage.getItem('TASK_STORAGE_KEY'));
	return taskMap ? taskMap : initialTaskState;
};

function Tasks () {
	const [ taskText, setTaskText ] = useState('');
	const storedTasks = restoredTasks();

	const [ state, dispatch ] = useReducer(taskReducer, storedTasks);
	const { tasks, completedTasks } = state;

	useEffect(() => {
		storeTasks({ tasks, completedTasks });
	});

	const updateTaskText = (event) => {
		setTaskText(event.target.value);
	};
	const addTask = () => {
		dispatch({
			type: 'ADD_TASK',
			task: { taskText, id: uuid() }
		});
	};
	const completeTasks = (completeTasks) => {
		dispatch({
			type: 'COMPLETE_TASK',
			completeTasks
		});
	};
	const deleteTasks = (task) => () => {
		dispatch({
			type: 'DELETE_TASK',
			task
		});
	};

	return (
		<div>
			<h3>Tasks</h3>
			<div className="form">
				<input vaule={taskText} onChange={updateTaskText} />
				<button onClick={addTask}>Add Task</button>
			</div>
			<div className="task-list">
				{tasks.map((task) => {
					return (
						<div
							key={task.id}
							onClick={() => {
								completeTasks(task);
							}}
						>
							{task.taskText}
						</div>
					);
				})}
			</div>
			<hr />
			<div className="task-list">
				{completedTasks.map((task) => {
					return (
						<div key={task.id}>
							<div className="float-left">{task.taskText + '  '}</div>
							<div className="float-right" onClick={deleteTasks(task)} className="delete-task">
								{' '}
								X{' '}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default Tasks;
