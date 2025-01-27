import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskStateType} from './App';
import {v1} from "uuid";
import {changeTodolistFilterAC} from "./todolist-reducer";

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

});

test('correct task should be added to correct array', () => {
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

    const action = addTaskAC('juice', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].isDone).toBe(false);

});

test('status of specified task should be changed', () => {
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

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(false)

    });