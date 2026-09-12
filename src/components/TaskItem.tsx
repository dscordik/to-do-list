import React, { useState } from 'react';
import { Task } from '../types/types';
import { DeleteTask } from './DeleteTask';
import { UpdateTask } from './UpdateTask';

type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string, newDeadline: Date, newImportant: string) => void;
};

export function TaskItem({ task, onDelete, onToggle, onEdit }: TaskItemProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const priorityLabel: Record<string, string> = {
        high: 'Высокий',
        normal: 'Обычный',
        low: 'Низкий'
    };

    const formatDate = (date: Date) => {
        if (!date || isNaN(new Date(date).getTime())) {
            return 'Дата не указана';
        }
        return new Date(date).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = () => {
        onDelete(task.id);
        setShowDeleteModal(false);
    };

    const handleUpdate = (newText: string, newDeadline: Date, newImportant: string) => {
        onEdit(task.id, newText, newDeadline, newImportant);
        setShowUpdateModal(false);
    };

    return (
        <div className={`task-item task-item--${task.important}${task.done ? ' task-item--done' : ''}`}>
            <div className="task-item__content">
                <div className="task-item__header">
                    <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} className="task-item__checkbox"/>
                    <span className="task-item__text">{task.text}</span>
                    <span className={`task-item__priority task-item__priority--${task.important}`}>
                        {priorityLabel[task.important] ?? task.important}
                    </span>
                </div>
                <div className="task-item__dates">
                    <span className="task-item__date">Создана: {formatDate(task.creatingDate)}</span>
                    <span className="task-item__date">Срок: {formatDate(task.deadline)}</span>
                    {task.done && <span className="task-item__badge task-item__badge--done">Выполнено</span>}
                </div>
            </div>
            <div className="task-item__actions">
                <button className="task-item__btn task-item__btn--edit" onClick={() => setShowUpdateModal(true)}>
                    Изменить
                </button>
                <button className="task-item__btn task-item__btn--delete" onClick={() => setShowDeleteModal(true)}>
                    Удалить
                </button>
            </div>
            {showDeleteModal && (<DeleteTask taskId={task.id} taskText={task.text} onDelete={handleDelete} onCancel={() => setShowDeleteModal(false)}/>)}
            {showUpdateModal && (<UpdateTask task={task} onUpdate={handleUpdate} onCancel={() => setShowUpdateModal(false)}/>)}
        </div>
    );
}