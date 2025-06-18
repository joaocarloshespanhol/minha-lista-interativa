'use client';

import { useEffect, useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

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
    createdate: '06/06/2025, 15:02:01',
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
          ? { ...task, status: task.status === 'pendente' ? 'concluída' : 'pendente' }
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

  const getFilterClass = (status) => {
    const base = "px-4 py-2 rounded border font-medium transition";
    const isActive = filter === status;
    if (!isActive) return `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-100`;

    switch (status) {
      case 'pendente':
        return `${base} bg-yellow-400 text-white border-yellow-500`;
      case 'concluída':
        return `${base} bg-green-500 text-white border-green-600`;
      default:
        return `${base} bg-blue-600 text-white border-blue-700`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Minha Lista de Tarefas Interativas
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            id="newTask"
            className="flex-1 border p-2 rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Título da tarefa"
          />
          <input
            id="newDescription"
            className="flex-1 border p-2 rounded"
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

        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {['todas', 'pendente', 'concluída'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={getFilterClass(status)}
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
                className="flex items-start sm:items-center justify-between p-3 border rounded bg-white"
              >
                <div className="flex items-start gap-3 w-full">
                  <button
                    onClick={() => handleToggle(task.id)}
                    className={`mt-1 text-xl ${
                      task.status === 'concluída' ? 'text-green-600' : 'text-black'
                    }`}
                    aria-label="Alterar status da tarefa"
                  >
                    {task.status === 'concluída' ? <FaCheckCircle /> : <FaRegCircle />}
                  </button>

                  <div className="flex-1">
                    <p
                      className={`text-lg font-semibold ${
                        task.status === 'concluída'
                          ? 'text-green-600 line-through'
                          : 'text-black'
                      }`}
                    >
                      {task.name}
                    </p>
                    <p className="text-sm text-gray-700">{task.description}</p>
                    <small className="text-gray-500">{task.createdate}</small>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(task.id)}
                  className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 ml-4"
                >
                  Remover
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
