'use client';

import { useState } from 'react';

export default function TaskForm({ onAdd }) {
    const [newTask, setNewTask] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleSubmit = () => {
        if (!newTask.trim() || !newDescription.trim()) return;
        onAdd(newTask, newDescription);
        setNewTask('');
        setNewDescription('');
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
            className="flex-1 border p-2 rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Título da tarefa"
        />
        <input
            className="flex-1 border p-2 rounded"
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
