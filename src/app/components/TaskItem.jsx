'use client';

import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { sendEvent } from '../utils/analytics';

export default function TaskItem({ task, onToggle, onRemove }) {
    return (
        <li className="flex items-start sm:items-center justify-between p-3 border rounded bg-gray-100">
        <div className="flex items-start gap-3 w-full">
            <button
            onClick={() => {
                onToggle(task.id);
                sendEvent({
                    action: 'task_toggle_click',
                    params: {
                        task_id: task.id,
                        current_status: task.status,
                    },
                });
            }}
            className={`mt-1 text-xl ${task.status === 'concluída' ? 'text-green-600' : 'text-gray-800'}`}
            aria-label="Alterar status da tarefa"
            >
            {task.status === 'concluída' ? <FaCheckCircle /> : <FaRegCircle />}
            </button>

            <div className="flex-1">
            <p className={`text-lg sm:text-xl font-semibold ${task.status === 'concluída' ? 'text-green-600 line-through' : 'text-gray-800'}`}>
                {task.name}
            </p>
            <p className="text-md sm:text-lg text-gray-700">{task.description}</p>
            <small className="text-gray-500">{task.createdate}</small>
            </div>
        </div>

        <button
            onClick={() => {
                onRemove(task.id);
                sendEvent({
                    action: 'task_remove_click',
                    params: {
                        task_id: task_id,
                        task_title: task.name,
                    },
                });
            }}
            className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 ml-4"
        >
            Remover
        </button>
        </li>
    );
}
