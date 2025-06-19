const BASE_URL = '/api/tasks';

export const fetchTasks = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const createTask = async (task) => {
    const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
});
    return res.json();
};

export const updateTaskStatus = async (id, status) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
});
    return res.json();
};

export const removeTask = async (id) => {
    return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};
