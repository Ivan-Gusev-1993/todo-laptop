import {useAppSelector} from '@/common/hooks/useAppSelector'
import {selectTodolists} from '@/features/todolists/model/todolists-selectors'
import {TodolistItem} from './TodolistItem/TodolistItem'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
      <>
        {todolists.map(todolist => (
            <Grid key={todolist.id}>
              <Paper sx={{p: '0 20px 20px 20px'}}>
                <TodolistItem todolist={todolist}/>
              </Paper>
            </Grid>
        ))}
      </>
  )
}