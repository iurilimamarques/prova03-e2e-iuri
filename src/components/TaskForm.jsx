import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const taskTitle = title.trim();

    if (!taskTitle) {
      return;
    }

    onAddTask(taskTitle);
    setTitle('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} data-testid="form-tarefa">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Digite uma nova tarefa"
        aria-label="Nova tarefa"
        data-testid="input-nova-tarefa"
      />

      <button type="submit" data-testid="botao-adicionar-tarefa">
        Adicionar
      </button>
    </form>
  );
}