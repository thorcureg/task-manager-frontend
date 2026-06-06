import { useState, useEffect } from "react";
import { getTasks, createTasks, updateTasks, deleteTasks } from "../api/taskApi";
import { DndContext, DragOverlay, closestCorners, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import TaskForm from "../components/TaskForm";
import TaskColumn from "../components/TaskColumn";
import Modal from "../components/Modal";

export default function TaskPage(){
    const [tasks, setTasks] = useState([]);
    // const [title, setTitle] = useState('');
    // const [isCompleted, setIsCompleted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTaskId, setActiveTaskId] = useState(null);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5, 
        },
    });
    const sensors = useSensors(mouseSensor);
    
    useEffect(()=>{
        fetchTasks();
    }, []);
    
    const fetchTasks = async () => {
        try{
            const res = await getTasks();
            setTasks(res.data);
        }catch(err){
            console.log(err);
            setError('Failed to fetch tasks');
        }finally{
            setLoading(false);
        }
    }
    const handleAddTask = async (title, description) => {
        // if (title.trim() === '') return;

        try{
            await createTasks({ 
                title       : title, 
                description : description,
                is_completed: '0' 
            });
            fetchTasks(); 
        }catch(err){
            console.log(err);
            setError('Failed to add task');
        }finally{
            setLoading(false);  
        }
    }
    const handleUpdateTask = async (id, title, isCompleted) => {
        try{
            await updateTasks(id, { title: title, is_completed: isCompleted }); 
            fetchTasks();
        }catch(err){
            console.log(err);
            setError('Failed to update task');
        }finally{
            setLoading(false);
        }
    }
    const handleToggleComplete = async (id, title, isCompleted) => {
        try{
            await updateTasks(id, { title: title, is_completed: isCompleted });
            fetchTasks();
            // setIsCompleted(!isCompleted);
        }catch(err){
            console.log(err);
            setError('Failed to update task');
        }finally{
            setLoading(false);
        }
    }
    const handleDeleteTask = async (id) => {
        try{
            await deleteTasks(id);
            fetchTasks();
        }catch(err){
            console.log(err);
            setError('Failed to delete task');
        }finally{
            setLoading(false);
        }
    }
    if(loading){
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    const handleMoveTask = async (taskId, targetStatus) => {
        const currentTask = tasks.find((task)=>task.id === taskId);
        
        if(!currentTask || currentTask.is_completed === targetStatus){
            return;
        }
        setTasks((currentTasks)=>
            currentTasks.map((task) => 
                task.id === taskId
                    ? {...task, is_completed: targetStatus }
                    : task
            )
        )
        try{
            await updateTasks(taskId, {
                title: currentTask.title,
                is_completed: targetStatus
            });
            // fetchTasks();
        } catch(err){
            console.log(err);
            setError('Failed to move task');
        }
    }
    const handleDragStart = (event) => {
        setActiveTaskId(event.active.id);
        setIsDragging(true);
    }
    const handleDragEnd = (event) => {
        const { 
            active: draggedTask, 
            over: targetColumn
        } = event;

        setActiveTaskId(null);
        setIsDragging(false);

        if(!targetColumn) return;

        const currentTask = tasks.find((task) => task.id === draggedTask.id);
        const targetStatus = targetColumn.data.current?.statusId;

        // if(targetStatus > 1) return;

        if(!currentTask || currentTask.is_completed === targetStatus){
            return;
        }

        handleMoveTask(currentTask.id, targetStatus);
    };

    const handleDragCancel = () => {
        setActiveTaskId(null);
        setIsDragging(false);
    }

    const pendingTasks = tasks.filter(task => task.is_completed === '0');
    const inProgressTasks = tasks.filter(task => task.is_completed === '1');
    const completedTasks = tasks.filter(task => task.is_completed === '2');
    const activeTask = tasks.find((task) => task.id === activeTaskId);
    
    return (
        <div className="container">
            <h1 className="header">Task Manager</h1>

            <div className="
                    flex
                    justify-end
                    mb-5
                "
            >
                <button className="
                        rounded-md
                        bg-[#6049e7]
                        px-4 py-2
                        text-sm
                        font-medium
                        text-white
                        transition hover:bg-[#5038c7]
                    "
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Task
                </button>
            </div>
            {
                isModalOpen &&
                <Modal 
                    // isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                >
                    <TaskForm
                        onAddTask = {handleAddTask}
                    />
                </Modal>
            }
            <DndContext 
                sensors={sensors}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                onDragCancel={handleDragCancel}
                collisionDetection={closestCorners}
            >
                <div className={`board ${isDragging ? 'dragging' : ''}`}>
                    <TaskColumn
                        statusId = "0"
                        status = "Pending Tasks"
                        tasks = {pendingTasks}
                        handleToggleComplete = {handleToggleComplete}
                        handleDeleteTask = {handleDeleteTask}
                        handleUpdateTask = {handleUpdateTask}
                    />
                    <TaskColumn
                        statusId = "1"
                        status = "In Progress Tasks"
                        tasks = {inProgressTasks}
                        handleToggleComplete = {handleToggleComplete}
                        handleDeleteTask = {handleDeleteTask}
                        handleUpdateTask = {handleUpdateTask}
                    />
                    <TaskColumn
                        statusId = "2"
                        status = "Completed Tasks"
                        tasks = {completedTasks}
                        handleToggleComplete = {handleToggleComplete}
                        handleDeleteTask = {handleDeleteTask}
                        handleUpdateTask = {handleUpdateTask}
                    />
                </div>
                <DragOverlay>
                    {
                        activeTask ? (
                            <div className="task-item task-item-overlay">
                                <div>{activeTask.title}</div>
                            </div>
                        ) : null
                    }
                </DragOverlay>
            </DndContext>
        </div>
    );
};

