import TaskList from './components/TaskList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Minha Lista de Tarefas Interativas
        </h1>
        <TaskList />
      </div>
    </main>
  );
}