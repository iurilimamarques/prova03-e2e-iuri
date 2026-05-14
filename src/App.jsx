import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Estudar React', done: false },
    { id: 2, title: 'Criar meu primeiro componente', done: true }
  ]);

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      done: false
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function removeTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const completedTasks = tasks.filter((task) => task.done).length;

  return (
    <main className="container" data-testid="app-container">
      <section className="card">
        <header>
          <h1 data-testid="titulo-pagina">Minha Lista de Tarefas</h1>
          <p data-testid="contador-tarefas">
            {completedTasks} de {tasks.length} tarefas concluídas
          </p>
        </header>

        <TaskForm onAddTask={addTask} />

        <div className="task-list" data-testid="lista-tarefas">
          {tasks.length === 0 ? (
            <p className="empty-message" data-testid="mensagem-lista-vazia">
              Nenhuma tarefa cadastrada.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onRemove={removeTask}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}