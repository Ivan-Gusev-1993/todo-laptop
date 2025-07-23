import { beforeEach, expect, test } from "vitest"
import { deleteTask, changeTaskStatus, createTask, tasksSlice, type TasksState } from "../tasks-slice"
import { changeTaskTitle } from "../tasks-slice"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { TaskPriority, TaskStatus } from "@/common/enums"

let startState: TasksState = {}

beforeEach(() => {
  const taskDefaultValues = {
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
  }

  beforeEach(() => {
    startState = {
      todolistId1: [
        {
          id: "1",
          title: "CSS",
          status: TaskStatus.New,
          todoListId: "todolistId1",
          ...taskDefaultValues,
        },
        {
          id: "2",
          title: "JS",
          status: TaskStatus.Completed,
          todoListId: "todolistId1",
          ...taskDefaultValues,
        },
        {
          id: "3",
          title: "React",
          status: TaskStatus.New,
          todoListId: "todolistId1",
          ...taskDefaultValues,
        },
      ],
      todolistId2: [
        {
          id: "1",
          title: "bread",
          status: TaskStatus.New,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
        {
          id: "2",
          title: "milk",
          status: TaskStatus.Completed,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
        {
          id: "3",
          title: "tea",
          status: TaskStatus.New,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
      ],
    }
  })
})

test("correct task should be deleted", () => {
  const endState = tasksSlice(startState, deleteTask({ todolistId: "todolistId2", taskId: "2" }))

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const endState = tasksSlice(
    startState,
    createTask({
      todolistId: "todolistId2",
      title: "juice",
    }),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("juice")
  expect(endState.todolistId2[0].isDone).toBe(false)
})

test("correct task should change its status", () => {
  const endState = tasksSlice(startState, changeTaskStatus({ todolistId: "todolistId2", taskId: "2", isDone: false }))

  expect(endState.todolistId2[1].isDone).toBe(false)
  expect(endState.todolistId1[1].isDone).toBe(true)
})

test("correct task should change its title", () => {
  const endState = tasksSlice(startState, changeTaskTitle({ todolistId: "todolistId2", taskId: "2", title: "coffee" }))

  expect(endState.todolistId2[1].title).toBe("coffee")
  expect(endState.todolistId1[1].title).toBe("JS")
})

test("array should be created for new todolist", () => {
  const endState = tasksSlice(startState, createTodolistTC("New todolist"))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksSlice(startState, deleteTodolistTC({ id: "todolistId2" }))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
