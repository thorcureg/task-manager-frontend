import {useState} from 'react';

export default function TaskDetails({ 
    task, 
    onUpdate
 }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    return (
        <div className="">
            <input className="text-2xl 
                font-bold 
                mb-4
                " 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => onUpdate(task.id, title, task.description)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onUpdate(task.id, title, task.description);
                    }
                }}
            />
            <input className="text-2xl 
                font-bold 
                mb-4
                " 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => onUpdate(task.id, task.title, description)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onUpdate(task.id, task.title, description);
                    }
                }}
            />
        </div>
    );
};