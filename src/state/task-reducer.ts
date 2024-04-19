import {TasksStateType} from "../App";

export type FirstActionType = {
    type: ''
}
export type SecondActionType = {
    type: ''
}

type ActionType = FirstActionType | SecondActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case '':
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): FirstActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId } as const
}
export const secondAC = (title :string): SecondActionType => {
    return { type: ''}
}