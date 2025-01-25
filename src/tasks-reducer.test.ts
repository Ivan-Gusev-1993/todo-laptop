import {removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskStateType} from './App';
import {v1} from "uuid";

test('correct task should be deleted from correct array', () => {
const startState: TaskStateType = {
    'todolistId1': [
        {id: '1', title: 'HTML&CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'ReactJS', isDone: false}
    ],

    'todolistId2': [
        {id: '1', title: 'Laptop', isDone: false},
        {id: '2', title: 'Xbox', isDone: true},
        {id: '3', title: 'Piano', isDone: true}
    ]
};

const action = removeTaskAC('2', 'todolistId2')

const endState = tasksReducer(startState, action)
expect(endState['todolistId1'].length).toBe(3)
expect(endState['todolistId2'].length).toBe(2)
expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
expect(endState['todolistId2'][0].id).toBe('1');
expect(endState['todolistId2'][1].id).toBe('3');

})