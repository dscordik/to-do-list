import React, { useState } from 'react';
import { Task } from '../types/types';

type UpdateTaskProps = {
    task: Task,
    onUpdate: (newText: string, newDeadline: Date, newImportant: string) => void,
    onCancel: () => void
}

export function UpdateTask({task, onUpdate, onCancel}: UpdateTaskProps) {
    const [text, setText] = useState(task.text)
    const [deadline, setDeadline] = useState(
        task.deadline ? task.deadline.toISOString().slice(0,16) : '')
    const [important,setImportant] = useState(task.important)

    const handleSubmit = () => {
        onUpdate(text, deadline ? new Date(deadline) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  important)
    }

    return(
        <div className="update-task__overlay" onClick={onCancel}>
            <div className="update-task__modal" onClick={e => e.stopPropagation()}>
                <h3 className="update-task__title">Редактировать задачу</h3>
                <div className="update-task__field">
                    <label className="update-task__label">Текст задачи:</label>
                    <input className="update-task__input" type="text" value={text} onChange={e => setText(e.target.value)}/>
                </div>
                <div className="update-task__field">
                    <label className="update-task__label">Дата сдачи:</label>
                    <input className="update-task__input update-task__input--date" type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)}/>
                </div>
                <div className="update-task__field">
                    <label className="update-task__label">Приоритет:</label>
                    <select className="update-task__select" value={important} onChange={e => setImportant(e.target.value)}>
                        <option value="normal">Обычная</option>
                        <option value="high">Высокий</option>
                        <option value="low">Низкий</option>
                    </select>
                </div>
                <div className="update-task__actions">
                    <button className="update-task__btn update-task__btn--cancel" onClick={onCancel}>Отмена</button>
                    <button className="update-task__btn update-task__btn--save" onClick={handleSubmit}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}