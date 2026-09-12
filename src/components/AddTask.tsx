import React, { useState } from "react";
import { Task } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

type AddTaskProps = {
    onAddTask: (task: Task) => void;
};

export function AddTask({ onAddTask }: AddTaskProps) {
    const [taskInput, setTaskInput] = useState("");
    const [deadline, setDeadline] = useState("")
    const [important, setImportant] = useState('normal')

    const AddOneTask = () => {
        if (!taskInput.trim()) return;

        const newTask: Task = {
            text: taskInput,
            done: false,
            id: uuidv4(),
            important: important,
            creatingDate: new Date(),
            deadline: deadline ? new Date(deadline) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };

        onAddTask(newTask);
        setTaskInput('');
        setDeadline('')
        setImportant('normal')
    }
    return(
        <div className="add-task">
            <input className="add-task__input" type="text" placeholder='Введите задачу'
                onChange={e => setTaskInput(e.target.value)}
                value={taskInput}
            />
            <input
                className="add-task__input add-task__input--date"
                type="datetime-local"
                onChange={e => setDeadline(e.target.value)}
                value={deadline}
            />
            <select className="add-task__select" value={important} onChange={e => setImportant(e.target.value)}>
                <option value="normal">Обычная</option>
                <option value="high">Высокий</option>
                <option value="low">Низкий</option>
            </select>
            <button className="add-task__btn" onClick={AddOneTask}>Добавить</button>
        </div>
    )
}