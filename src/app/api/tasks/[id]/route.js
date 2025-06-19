import { getTasks, updateTask, deleteTask } from '../tasksMock';

export async function PATCH(request, context) {
  const { id } = await context.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return Response.json({ error: 'ID inválido' }, { status: 400 });
  }

  const task = getTasks().find(t => t.id === parsedId);
  if (!task) {
    return Response.json({ error: 'Task not found' }, { status: 404 });
  }

  const body = await request.json();
  const updated = updateTask(parsedId, body);

  return Response.json(updated);
}

export async function DELETE(request, context) {
  const { id } = await context.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return Response.json({ error: 'ID inválido' }, { status: 400 });
  }

  const task = getTasks().find(t => t.id === parsedId);
  if (!task) {
    return Response.json({ error: 'Task not found' }, { status: 404 });
  }

  const success = deleteTask(parsedId);
  return Response.json({ success });
}

