import React, {useEffect, useState} from 'react';
import {Task} from "../types/types";

type StatisticsProps = {
    tasks:Task[]
}

export function Statistics({tasks}:StatisticsProps) {
    const [total, setTotal] = useState(0)
    const [completed, setCompleted] = useState(0)
    const [uncompleted, setUncompleted] = useState(0)
    const [urgent, setUrgent] = useState(0)

    useEffect(() => {
        const now = new Date();
        const totalCount = tasks.length;
        const completedCount = tasks.filter(t => t.done).length;
        const uncompletedCount = totalCount - completedCount;
        const urgentCount = tasks.filter(t => {
            if (t.done) return false;
            const data = new Date(t.deadline).getTime() - now.getTime();
            return data < 2 * 60 * 1000 && data > 0;
        }).length;

        setTotal(totalCount);
        setCompleted(completedCount);
        setUncompleted(uncompletedCount);
        setUrgent(urgentCount);
    }, [tasks]);

    useEffect(() => {
        console.log(`Всего зздач ${total}`)
    }, [total]);
    useEffect(() => {
        console.log(`Выполнено зздач ${completed}`)
    }, [completed]);
    useEffect(() => {
        console.log(`Не выполнено зздач ${uncompleted}`)
    }, [uncompleted]);
    useEffect(() => {
        console.log(`Срочные зздачи ${urgent}`)
    }, [urgent]);

    return(
        <div className="statistics">
            <div className="statistics__item">
                <span className="statistics__label">Всего</span>
                <span className="statistics__value">{total}</span>
            </div>
            <div className="statistics__item statistics__item--completed">
                <span className="statistics__label">Выполнено</span>
                <span className="statistics__value">{completed}</span>
            </div>
            <div className="statistics__item statistics__item--uncompleted">
                <span className="statistics__label">Не выполнено</span>
                <span className="statistics__value">{uncompleted}</span>
            </div>
            <div className="statistics__item statistics__item--urgent">
                <span className="statistics__label">Срочных</span>
                <span className="statistics__value">{urgent}</span>
            </div>
        </div>
    )
}
