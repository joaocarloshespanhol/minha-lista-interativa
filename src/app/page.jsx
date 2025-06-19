import TaskList from './components/TaskList';
import Image from 'next/image';


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <Image
          src="/images/logo-consorcio-magalu.png"
          alt="Logo"
          width={258}
          height={138}
          className="mx-auto mb-4 mt-12"
        />
        <h1 className="text-3xl sm:text-4xl text-gray-800 font-medium mb-6 text-center mt-12">
          Minha Lista de Tarefas Interativas
        </h1>
        <TaskList />
      </div>
    </main>
  );
}