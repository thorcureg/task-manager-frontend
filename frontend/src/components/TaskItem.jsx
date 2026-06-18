import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaCheck } from 'react-icons/fa';
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { useState } from "react";
import Modal from "./Modal";
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
    const stopPropagation = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
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
                            onPointerDown={stopPropagation}
                            onClick={(e) => {
                                stopPropagation(e);
                                onToggleComplete(task.id, task.title, '2');
                            }}
                        >
                        </FaCheck>
                    )
                }
                <div className="relative">
                    <button 
                        onPointerDown={stopPropagation}
                        onClick={(e) => {
                            stopPropagation(e);
                            setItemOptionsOpen(!itemOptionsOpen);
                        }}
                    >
                        <BsThreeDots  />
                    </button>

                    {itemOptionsOpen && (
                        <div className="
                            absolute
                            right-0
                            top-8
                            w-40
                            bg-white
                            rounded-md
                            shadow-lg
                            py-1
                            z-10
                        ">
                            <button 
                                className="
                                    w-full
                                    px-4
                                    py-2
                                    flex
                                    items-center
                                    gap-2
                                    text-left
                                    text-sm
                                "
                                onPointerDown={stopPropagation}
                                onClick={(e) => {
                                    stopPropagation(e);
                                    onDelete(task.id);
                                }}
                            >
                               <BsTrash /> Delete
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

