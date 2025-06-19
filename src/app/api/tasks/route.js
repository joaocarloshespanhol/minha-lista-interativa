import { getTasks, addTask } from './tasksMock';


export async function GET() {
    const tasks = getTasks();
    return Response.json(tasks);
}


export async function POST(request) {
    try {
        const body = await request.json();
        const newTask = addTask(body);
    return Response.json(newTask);
} catch (error) {
    return Response.json({ error: 'Erro ao adicionar tarefa' }, { status: 500 });
}
}


