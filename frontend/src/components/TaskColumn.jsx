import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

export default function TaskColumn({
    statusId, 
    status, 
    tasks, 
    handleToggleComplete, 
    handleDeleteTask,
    handleUpdateTask
}){

    const {setNodeRef, isOver} = useDroppable({
        id: statusId,
        data: {
            statusId
        }
    });
    return(
        <SortableContext items={tasks.map(task => task.id)}>
            <div className={`task-column ${isOver ? 'task-column-over' : ''}`} ref={setNodeRef}>
                <h2 className="header">{status}</h2>
                <div className="task-list">
                    {
                        tasks.length === 0 ? (
                            <div>No tasks available</div>
                        ) : (tasks
                        .map(task => (
                            <TaskItem
                                key ={task.id}
                                task = {task}
                                onToggleComplete = {handleToggleComplete}
                                onDelete = {handleDeleteTask}
                                onUpdate = {handleUpdateTask}
                                />
                        ))
                    )
                    }
                </div>
            </div>
        </SortableContext>
    );
}

