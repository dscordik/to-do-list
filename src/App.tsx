import React, { useEffect, useState } from 'react';
import './App.css';
import { Task, Filter1 } from './types/types';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TasksList';
import { Filter as FilterComponent } from './components/Filter';
import { Statistics } from './components/Statistics';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter1>({
        search: '',
        done: 'all',
        important: '',
        creatingDateFrom: new Date(0),
        deadlineFrom: new Date(0),
        creatingDateTo: new Date(),
        deadlineTo: new Date()
    });

    function AddOneTask(newTask: Task) {
        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function toggleDone(id: string) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, done: !task.done };
            }
            return task;
        }));
    }

    function editTask(id: string, newText: string, newDeadline: Date, newImportant: string) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText, deadline: newDeadline, important: newImportant };
            }
            return task;
        }));
    }

    function toggleAllTasks(done: boolean) {
        setTasks(tasks.map(task => ({ ...task, done })));
    }

    const filteredTasks = tasks.filter(task => {
        // Поиск по тексту
        if (filter.search && !task.text.toLowerCase().includes(filter.search.toLowerCase())) {
            return false;
        }
        // По статусу
        if (filter.done === 'completed' && !task.done) {
            return false;
        }
        if (filter.done === 'uncompleted' && task.done) {
            return false;
        }
        // По приоритету
        if (filter.important && task.important !== filter.important) {
            return false;
        }
        return true;
    });
    useEffect(() => {
        if (tasks.length > 0) {
            console.log('Задача добавлена');
            console.log(tasks[tasks.length - 1]);
        }
    }, [tasks]);

    return (
        <div className="app">
            <h1 className="app__title">Список задач</h1>
            <Statistics tasks={tasks} />
            <AddTask onAddTask={AddOneTask} />
            <div className="app__controls">
                <button className="app__btn app__btn--complete-all" onClick={() => toggleAllTasks(true)} disabled={tasks.length === 0}>
                    Выполнить все
                </button>
                <button className="app__btn app__btn--uncomplete-all" onClick={() => toggleAllTasks(false)} disabled={tasks.length === 0}>
                    Отменить выполнение всех
                </button>
            </div>
            <FilterComponent onFilterChange={setFilter} />
            <TaskList tasks={filteredTasks} onToggle={toggleDone} onDelete={deleteTask} onEdit={editTask}/>
        </div>
    );
}

export default App;