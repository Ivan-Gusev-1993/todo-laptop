import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolist} from "@/model/todolists-selectors.ts";


export const Todolists = () => {
    const todolists = useAppSelector(selectTodolist)

    return (
        <>
            {todolists.map(todolist => (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem todolist={todolist}/>
                        </Paper>
                    </Grid>
                )
            )}

        </>
    );
};

