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

  return (
    <>
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Minha Lista de Tarefas Interativas</h1>

        <ul className="space-y-3 text-2xl">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between items-start p-3 border rounded bg-white"
            >
          <div className="flex flex-col gap-1">
            <p className={`font-medium ${task.status === 'concluída' ? 'line-through text-green-800' : 'text-black'}`}>
              {task.name}
            </p>
              <p className="text-lg text-gray-900">{task.description}</p>
                <small className="text-gray-600">{task.createdate}</small>
          </div>
            </li>
  ))}
        </ul>
        </div>
      </main>
    </>
  );
}