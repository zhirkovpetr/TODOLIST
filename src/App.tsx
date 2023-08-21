import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const App = () => {
    let task1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: false},
    ]

    let task2 = [
        {id: 1, title: 'Terminator', isDone: true},
        {id: 2, title: 'XXX', isDone: true},
        {id: 3, title: 'Gentlemen of fortune', isDone: false},
    ]

    return (
        <div>
            <Todolist title={'What to learn'} tasks={task1} />
            <Todolist title={'Movies'} tasks={task2}/>
        </div>
    );
}
