'use strict';

const STORAGE_KEY = 'todo-app-v1';

// ─── State ───────────────────────────────────────────────────────────────────

let todos = load();
let filter = 'all';
let editingId = null;

// ─── Persistence ─────────────────────────────────────────────────────────────

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ─── CRUD ────────────────────────────────────────────────────────────────────

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.unshift({ id: Date.now(), text: trimmed, done: false });
  save();
  render();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    save();
    render();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function updateTodo(id, text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = trimmed;
    save();
    render();
  }
}

function clearDone() {
  todos = todos.filter(t => !t.done);
  save();
  render();
}

// ─── Render ──────────────────────────────────────────────────────────────────

function filteredTodos() {
  if (filter === 'active') return todos.filter(t => !t.done);
  if (filter === 'done')   return todos.filter(t => t.done);
  return todos;
}

function render() {
  const list       = document.getElementById('todo-list');
  const emptyState = document.getElementById('empty-state');
  const footer     = document.getElementById('footer');
  const remaining  = document.getElementById('remaining');
  const summary    = document.getElementById('summary');

  const visible = filteredTodos();

  // Update summary
  const total  = todos.length;
  const active = todos.filter(t => !t.done).length;
  summary.textContent = `${total}件のタスク`;

  // Footer
  remaining.textContent = `残り ${active}件`;
  footer.classList.toggle('hidden', total === 0);

  // List
  list.innerHTML = '';

  if (visible.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    visible.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.done ? ' done' : ''}`;
      li.dataset.id = todo.id;

      const checkbox = document.createElement('input');
      checkbox.type    = 'checkbox';
      checkbox.checked = todo.done;
      checkbox.setAttribute('aria-label', `完了: ${todo.text}`);
      checkbox.addEventListener('change', () => toggleTodo(todo.id));

      const span = document.createElement('span');
      span.className   = 'todo-text';
      span.textContent = todo.text;

      const actions = document.createElement('div');
      actions.className = 'item-actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'icon-btn edit';
      editBtn.innerHTML = '✏️';
      editBtn.setAttribute('aria-label', '編集');
      editBtn.addEventListener('click', () => openModal(todo.id, todo.text));

      const delBtn = document.createElement('button');
      delBtn.className = 'icon-btn delete';
      delBtn.innerHTML = '🗑️';
      delBtn.setAttribute('aria-label', '削除');
      delBtn.addEventListener('click', () => deleteTodo(todo.id));

      actions.append(editBtn, delBtn);
      li.append(checkbox, span, actions);
      list.appendChild(li);
    });
  }
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function openModal(id, text) {
  editingId = id;
  const modal     = document.getElementById('modal');
  const editInput = document.getElementById('edit-input');
  modal.classList.remove('hidden');
  editInput.value = text;
  editInput.focus();
  editInput.select();
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  editingId = null;
}

function saveModal() {
  if (editingId === null) return;
  const text = document.getElementById('edit-input').value;
  updateTodo(editingId, text);
  closeModal();
}

// ─── Event listeners ─────────────────────────────────────────────────────────

document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('todo-input');
  addTodo(input.value);
  input.value = '';
  input.focus();
});

document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const input = e.currentTarget;
    addTodo(input.value);
    input.value = '';
  }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    render();
  });
});

document.getElementById('clear-done-btn').addEventListener('click', clearDone);

document.getElementById('modal-cancel').addEventListener('click', closeModal);
document.getElementById('modal-save').addEventListener('click', saveModal);

document.getElementById('edit-input').addEventListener('keydown', e => {
  if (e.key === 'Enter')  saveModal();
  if (e.key === 'Escape') closeModal();
});

document.querySelector('.modal-overlay').addEventListener('click', closeModal);

// ─── Init ────────────────────────────────────────────────────────────────────

render();
