import React from "react";

type DeleteTaskProps = {
    taskId: string,
    taskText: string,
    onDelete:(id:string) => void,
    onCancel:() => void
}

export function DeleteTask({taskId,taskText,onDelete,onCancel}:DeleteTaskProps) {
    return (
        <div className="delete-task__overlay" onClick={onCancel}>
            <div className="delete-task__modal" onClick={e => e.stopPropagation()}>
                <h3 className="delete-task__title">Удалить задачу</h3>
                <p className="delete-task__text">Вы уверены, что хотите удалить задачу: <strong>«{taskText}»</strong>?</p>
                <div className="delete-task__actions">
                    <button className="delete-task__btn delete-task__btn--cancel" onClick={onCancel}>
                        Отмена
                    </button>
                    <button className="delete-task__btn delete-task__btn--delete" onClick={() => onDelete(taskId)}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}