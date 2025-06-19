let tasks = [
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
    }
    ];

    export const getTasks = () => tasks;

    export const addTask = (task) => {
    const newTask = {
        ...task,
        id: Date.now(),
        createdate: new Date().toLocaleString()
    };
    tasks = [newTask, ...tasks];
    return newTask;
    };

    export const updateTask = (id, updates) => {
    let updatedTask = null;
    tasks = tasks.map(t => {
        if (t.id === id) {
        updatedTask = { ...t, ...updates };
        return updatedTask;
        }
        return t;
    });
    return updatedTask;
    };

    export const deleteTask = (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    return tasks.length < initialLength;
};
