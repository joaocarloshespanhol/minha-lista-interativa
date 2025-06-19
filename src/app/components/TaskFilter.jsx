'use client';

export default function TaskFilter({ filter, setFilter }) {
    const getFilterClass = (status) => {
        const base = "px-4 py-2 rounded border font-medium transition";
        const isActive = filter === status;
        if (!isActive) return `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-100`;

        switch (status) {
        case 'pendente':
            return `${base} bg-yellow-500 text-white border-yellow-600`;
        case 'concluída':
            return `${base} bg-green-500 text-white border-green-600`;
        default:
            return `${base} bg-[#0485FF] text-white border-[#036ECF]`;
        }
    };

    return (
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
    );
}
