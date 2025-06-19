'use client';

import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';

const BASE_URL = '/api/tasks';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('todas');
    const [loading, setLoading] = useState(true);
    const [filterPendenteDelayId, setfilterPendenteDelayId] = useState(null);

    //// Fetch inicial \\\\
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(BASE_URL);
                const data = await res.json();
                setTasks(data);
            } catch (err) {
                console.error('Erro ao carregar tarefas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    //// Criar tarefa \\\\
    const handleAdd = async (title, description) => {
        const newTask = {
            name: title,
            description,
            status: 'pendente',
        };

        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            const savedTask = await res.json();
            setTasks(prev => [savedTask, ...prev]);
        } catch (err) {
            console.error('Erro ao adicionar tarefa:', err);
        }
    };

    //// Marcar como concluída/pendente \\\\
    const handleToggle = async (id) => {
        const task = tasks.find(t => t.id === id);
        const updatedStatus = task.status === 'pendente' ? 'concluída' : 'pendente';

        try {
            const res = await fetch(`${BASE_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: updatedStatus }),
            });
            const updatedTask = await res.json();

            setTasks(prev =>
                prev.map(t => (t.id === id ? updatedTask : t))
            );

            if (filter === 'pendente' && task.status === 'pendente') {
                setfilterPendenteDelayId(id);
                setTimeout(() => setfilterPendenteDelayId(null), 500);
            }
        } catch (err) {
            console.error('Erro ao alternar status:', err);
        }
    };

    //// Remover tarefa \\\\
    const handleRemove = async (id) => {
        try {
            await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            console.error('Erro ao remover tarefa:', err);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'todas') return true;
        if (filter === 'pendente') {
            return task.status === 'pendente' || filterPendenteDelayId === task.id;
        }
        return task.status === filter;
    });

    //// Debug: verificar ids das tasks filtradas para evitar warning de key duplicada ou undefined \\\\
    console.log('filteredTasks ids:', filteredTasks.map(t => t.id));

    return (
        <>
            <TaskForm onAdd={handleAdd} />
            <TaskFilter filter={filter} setFilter={setFilter} />

            {loading ? (
                <p className="text-center text-gray-500 mt-4">Carregando tarefas...</p>
            ) : (
                <ul className="space-y-3">
                    {filteredTasks.length === 0 ? (
                        <li className="text-center text-gray-500">Nenhuma tarefa encontrada.</li>
                    ) : (
                        filteredTasks.map((task, index) => (
                            <TaskItem
                                key={task.id ?? `task-${index}`} //// fallback para key \\\\
                                task={task}
                                onToggle={handleToggle}
                                onRemove={handleRemove}
                            />
                        ))
                    )}
                </ul>
            )}
        </>
    );
}
