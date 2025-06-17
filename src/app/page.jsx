'use client'

import { useEffect, useState } from 'react';

// import Image from "next/image";

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
    createdatefix: '06/06/2025, 15:02:01',
  },
  {
    id: 3,
    name: 'Simular parcelas',
    description: 'Realizar simulação no app do Consórcio Magalu',
    status: 'pendente',
    createdate: new Date().toLocaleString()
  },
];

export default function Home() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('todas');

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  useEffect(() => {
  const fixedDate = initialTasks.map(task => ({
    ...task,
    createdate: task.createdatefix || task.createdate
  }));
  setTasks(fixedDate);
}, []);

  const handleAdd = () => {
  if (!newTask.trim() || !newDescription.trim()) return;

  const newItem = {
    id: Date.now(),
    name: newTask.trim(),
    description: newDescription.trim(),
    status: 'pendente',
    createdate: new Date().toLocaleString()
  };

  setTasks([newItem, ...tasks]);
  setNewTask('');
  setNewDescription('');
};

  const handleToggle = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'pendente' ? 'concluída' : 'pendente'
            }
          : task
      )
    );
  };

    const handleRemove = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'todas' ? true : task.status === filter
  );

  return (
    <>
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Minha Lista de Tarefas Interativas</h1>

          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 border p-2 rounded"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Adicionar nova tarefa"
            />
            <input
              className="border p-2 rounded"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descrição da tarefa"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Adicionar
            </button>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            {['todas', 'pendente', 'concluída'].map(status => (
                <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded border transition ${
                  filter === status
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>

            ))}
          </div>

          <ul className="space-y-3">
            {filteredTasks.length === 0 ? (
              <li className="text-center text-gray-500">Nenhuma tarefa encontrada.</li>
            ) : (
              filteredTasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between items-center p-3 border rounded bg-white"
            >
            <div>
              <p className={`font-medium ${task.status === 'concluída' ? 'line-through text-gray-400' : ''}`}>
                {task.name}
              </p>
              <p className="text-lg text-gray-900">{task.description}</p>
              <small className="text-gray-500">{task.createdate}</small>
            </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle(task.id)}
                  className="text-sm px-3 py-1 rounded border hover:bg-gray-100"
                >
                  {task.status === 'pendente' ? 'Concluída' : 'Desfazer'}
                </button>
                <button
                  onClick={() => handleRemove(task.id)}
                  className="text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            </li>
    ))
  )}
            </ul>
          </div>
        </main>
    </>
  );
}