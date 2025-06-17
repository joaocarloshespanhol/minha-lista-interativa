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

          <ul className="space-y-3">
            {tasks.map(task => (
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
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}