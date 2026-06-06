import { useState } from "react";

export default function TaskForm({onAddTask}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e) => {
         e.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;
        const trimmedDescription = description.trim();
        if (!trimmedDescription) return;

        await onAddTask(trimmedTitle, trimmedDescription);
        setTitle('');
        setDescription('');
    }

    return (
            <form 
                onSubmit={handleSubmit}
                className="
                    mb-5 
                    grid grid-row-3 
                    gap-3
                "
            >
                <input
                    type="text"
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="
                        rounded-md 
                        border border-slate-300 
                        px-3 py-2 
                        text-sm 
                        outline-none 
                        transition focus:border-slate-500
                    "
                />
                <input
                    type="text"
                    value={description}
                    onChange = {(e) => setDescription(e.target.value)}
                    placeholder="Enter task Description"
                    className="
                        rounded-md 
                        border border-slate-300 
                        px-3 py-2 
                        text-sm 
                        outline-none 
                        transition focus:border-slate-500
                    "
                />
                <button 
                    type="submit"
                    className="
                        rounded-md 
                        bg-slate-900 
                        px-4 py-2 
                        text-sm 
                        font-medium 
                        text-white 
                        transition hover:bg-slate-700"
                >
                    Add Task
                </button>
            </form>
    );
}
