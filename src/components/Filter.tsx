import React, {useState} from 'react';
import {Filter1} from "../types/types";

type FilterProps = {
    onFilterChange: (filter:Filter1) => void
}

export function Filter({onFilterChange}:FilterProps) {
    const [filter, setFilter] = useState<Filter1>({
        search:'',
        done:'all',
        important:'',
        creatingDateFrom:new Date(0),
        deadlineFrom:new Date(0),
        creatingDateTo:new Date(),
        deadlineTo:new Date(),
    })
    function handleChange(key: keyof Filter1, value: unknown) {
        const newFiller = {...filter, [key]:value}
        setFilter(newFiller)
        onFilterChange(newFiller)
    }
    return (
        <div className="filter">
            <input className="filter__input" type="text" placeholder="Поиск"
                value={filter.search}
                onChange={e => handleChange('search', e.target.value)}
            />
            <select className="filter__select"
                value={filter.done}
                onChange={e => handleChange('done', e.target.value)}
            >
                <option value="all">Все</option>
                <option value="done">Выполненные</option>
                <option value="uncompleted">Не выполненные</option>
            </select>
            <select className="filter__select"
                value={filter.important}
                onChange={e => handleChange('important', e.target.value)}
            >
                <option value="">Все приоритеты</option>
                <option value="high">Высокий</option>
                <option value="normal">Обычный</option>
                <option value="low">Низкий</option>
            </select>
            <button
                className="filter__btn filter__btn--reset"
                onClick={() => {
                    handleChange('search', '');
                    handleChange('done', 'all');
                    handleChange('important', '');
                }}
            >
                Сбросить
            </button>
        </div>
    )
}