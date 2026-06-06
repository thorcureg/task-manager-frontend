import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaCheck } from 'react-icons/fa';
import { BsThreeDots  } from "react-icons/bs";
import { useState } from "react";
import Modal from "../components/Modal";
import TaskDetails from "./TaskDetails";

export default function TaskItem ({ 
    task, 
    onToggleComplete, 
    onDelete,
    onUpdate
}){
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [itemOptionsOpen, setItemOptionsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: task.id,
        data: {
            statusId: task.is_completed
        }
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    return (
        <div className="task-item group"
            ref = {setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => setIsModalOpen(true)}
        >
            {
            isModalOpen && 
                    <Modal
                        onClose={() => setIsModalOpen(false)}
                    >
                        <TaskDetails
                            task={task}
                            onUpdate={onUpdate}
                        />
                    </Modal>
            }
            <div className="
                hidden
                justify-end
                items-center
                gap-2
                group-hover:flex
            ">
                {
                    task.is_completed != '2' && (
                        <FaCheck 
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => onToggleComplete(task.id, task.title, '2')}
                        >
                        </FaCheck>
                    )
                }
                <div>
                    <button 
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => setItemOptionsOpen(!itemOptionsOpen)}
                    >
                        <BsThreeDots  />
                    </button>

                    {itemOptionsOpen && (
                        <div className="task-item-options">
                            <button 
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => onDelete(task.id)}
                            >
                                Delete Task
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                {task.title}
            </div>

        </div>
                
    );
}

