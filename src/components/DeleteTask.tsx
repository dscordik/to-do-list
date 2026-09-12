import React from "react";

type DeleteTaskProps = {
    taskId: string,
    taskText: string,
    onDelete:(id:string) => void
}

export function DeleteTask({taskId,taskText,onDelete}:DeleteTaskProps) {
    return (
        <div className="delete-task__overlay">
            <div className="delete-task__modal">
                <h3 className="delete-task__title">Удалить задачу</h3>
                <p className="delete-task__text">Вы уверены, что хотите удалить задачу: <strong>"{taskText}"</strong>?</p>
                <div className="delete-task__actions">
                    <button className="delete-task__btn delete-task__btn--delete" onClick={() => onDelete(taskId)}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}