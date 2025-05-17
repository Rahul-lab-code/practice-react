import { Card, CardContent, Typography } from "@mui/material"
import type { fetchedTaskType } from "../types"


export const TaskCard = (task:fetchedTaskType)=>{
    return (
            <Card key={task._id} variant="outlined">
                <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                    <Typography variant="body2">Priority: {task.priority}</Typography>
                    <Typography variant="body2">
                        Assignees: {task.assignees.map((assignee) => assignee.username).join(", ")}
                    </Typography>
                </CardContent>
            </Card>
    )
}