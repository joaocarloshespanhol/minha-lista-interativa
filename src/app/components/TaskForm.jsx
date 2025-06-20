'use client';

import { useState } from 'react';
import { sendEvent } from '../utils/analytics';

export default function TaskForm({ onAdd }) {
    const [newTask, setNewTask] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleSubmit = () => {
        if (!newTask.trim() || !newDescription.trim()) {
        alert('Adicione o nome e descrição da tarefa');
        return;
        }

        onAdd(newTask, newDescription);

        //// Evento GA4 ao adicionar tarefa \\\\
        sendEvent({
        action: 'add_task',
        params: {
            task_title: newTask,
            task_description: newDescription,
        },
        });

        setNewTask('');
        setNewDescription('');
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
            className="flex-1 border p-2 rounded bg-gray-100"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Título da tarefa"
        />
        <input
            className="flex-1 border p-2 rounded bg-gray-50"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Descrição da tarefa"
        />
        <button
            onClick={handleSubmit}
            className="bg-[#0485FF] text-white px-4 py-2 rounded hover:bg-[#0980F0]"
        >
            Adicionar
        </button>
        </div>
    );
}

