export default function TaskItem({ task, onToggle, onRemove }) {
  return (
    <div className="task-item" data-testid="item-tarefa">
      <button
        type="button"
        className={task.done ? 'task-title done' : 'task-title'}
        onClick={() => onToggle(task.id)}
        aria-label={`Alternar tarefa ${task.title}`}
        data-testid={`alternar-tarefa-${task.id}`}
      >
        <span aria-hidden="true">{task.done ? '✅' : '⬜'}</span>
        <span data-testid="titulo-tarefa">{task.title}</span>
      </button>

      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(task.id)}
        aria-label={`Remover tarefa ${task.title}`}
        data-testid={`remover-tarefa-${task.id}`}
      >
        Remover
      </button>
    </div>
  );
}