import React from 'react';
import { Task } from '../types/types';
import { TaskItem } from './TaskItem';

type TasksListProps = {
    tasks: Task[],
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string, newDeadline: Date, newImportant: string) => void;
}

export function TaskList({tasks,onToggle,onEdit,onDelete}:TasksListProps) {
    if (tasks.length === 0) {
        return <div className="tasks-list__empty">Задач нет — добавьте первую выше</div>
    }
    return (
        <div className="tasks-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </div>
    );
}