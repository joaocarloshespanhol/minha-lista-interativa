'use client';

import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';

const initialTasks = [
    {
        id: 1,
        name: 'Verificar saldo de crédito',
        description: 'Consultar valor total disponível após contemplação',
        status: 'pendente',
        createdate: new Date().toLocaleString()
    },
    {
        id: 2,
        name: 'Enviar documentação complementar',
        description: 'Anexar documentação para liberação do crédito',
        status: 'concluída',
        createdate: new Date().toLocaleDateString()
    },
    {
        id: 3,
        name: 'Simular parcelas',
        description: 'Realizar simulação no app do Consórcio Magalu',
        status: 'pendente',
        createdate: new Date().toLocaleString()
    },
    ];

    export default function TaskList() {
        const [tasks, setTasks] = useState([]);
        const [filter, setFilter] = useState('todas');
        const [filterPendenteDelayId, setfilterPendenteDelayId] = useState(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        } else {
        setTasks(initialTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAdd = (title, description) => {
        const newItem = {
        id: Date.now(),
        name: title,
        description,
        status: 'pendente',
        createdate: new Date().toLocaleString()
        };
        setTasks([newItem, ...tasks]);
    };

    const handleToggle = (id) => {
        setTasks(prev =>
        prev.map(task =>
            task.id === id
            ? { ...task, status: task.status === 'pendente' ? 'concluída' : 'pendente' }
            : task
        )
        );

        const toggledTask = tasks.find(task => task.id === id);
        if (filter === 'pendente' && toggledTask?.status === 'pendente') {
        setfilterPendenteDelayId(id);
        setTimeout(() => setfilterPendenteDelayId(null), 500);
        }
    };

    const handleRemove = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'todas') return true;
        if (filter === 'pendente') {
        return task.status === 'pendente' || filterPendenteDelayId === task.id;
        }
        return task.status === filter;
    });

    return (
        <>
        <TaskForm onAdd={handleAdd} />
        <TaskFilter filter={filter} setFilter={setFilter} />

        <ul className="space-y-3">
            {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-500">Nenhuma tarefa encontrada.</li>
            ) : (
            filteredTasks.map(task => (
                <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onRemove={handleRemove}
                />
            ))
            )}
        </ul>
        </>
    );
}
