'use strict';

// ===== 状態管理 =====
const STORAGE_KEY = 'todo_items';
let todos = load();
let filter = 'all';      // 'all' | 'active' | 'done'
let editingId = null;    // 編集中のTodo ID

// ===== DOM =====
const todoList    = document.getElementById('todoList');
const emptyMsg    = document.getElementById('empty');
const countEl     = document.getElementById('count');
const inputEl     = document.getElementById('input');
const addBtn      = document.getElementById('addBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalInput  = document.getElementById('modalInput');
const saveBtn     = document.getElementById('saveBtn');
const cancelBtn   = document.getElementById('cancelBtn');
const tabs        = document.querySelectorAll('.tab');

// ===== LocalStorage =====
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

// ===== Todo操作 =====
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.unshift({ id: Date.now(), text: trimmed, done: false });
  save();
  render();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) { todo.done = !todo.done; save(); render(); }
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
  if (todo) { todo.text = trimmed; save(); render(); }
}

// ===== フィルタリング =====
function filtered() {
  if (filter === 'active') return todos.filter(t => !t.done);
  if (filter === 'done')   return todos.filter(t =>  t.done);
  return todos;
}

// ===== レンダリング =====
function render() {
  const items = filtered();

  // カウント表示（全件）
  const active = todos.filter(t => !t.done).length;
  countEl.textContent = `${active}件の未完了 / 全${todos.length}件`;

  // 空表示
  emptyMsg.classList.toggle('empty--visible', items.length === 0);

  // リスト生成
  todoList.innerHTML = '';
  items.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    li.innerHTML = `
      <button class="todo-item__check ${todo.done ? 'todo-item__check--done' : ''}"
              aria-label="${todo.done ? '未完了に戻す' : '完了にする'}">
        ${todo.done ? '✓' : ''}
      </button>
      <span class="todo-item__text ${todo.done ? 'todo-item__text--done' : ''}">
        ${escapeHtml(todo.text)}
      </span>
      <div class="todo-item__actions">
        <button class="todo-item__btn todo-item__btn--edit" aria-label="編集">✎</button>
        <button class="todo-item__btn todo-item__btn--delete" aria-label="削除">✕</button>
      </div>
    `;

    // チェックボタン
    li.querySelector('.todo-item__check').addEventListener('click', () => toggleTodo(todo.id));
    // テキストタップでも切り替え
    li.querySelector('.todo-item__text').addEventListener('click', () => toggleTodo(todo.id));
    // 編集
    li.querySelector('.todo-item__btn--edit').addEventListener('click', () => openModal(todo.id, todo.text));
    // 削除
    li.querySelector('.todo-item__btn--delete').addEventListener('click', () => {
      if (confirm(`「${todo.text}」を削除しますか？`)) deleteTodo(todo.id);
    });

    todoList.appendChild(li);
  });
}

// XSS対策
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

// ===== モーダル =====
function openModal(id, text) {
  editingId = id;
  modalInput.value = text;
  modalOverlay.classList.add('modal-overlay--open');
  // 少し遅らせてからフォーカス（iOS対策）
  setTimeout(() => modalInput.focus(), 50);
}

function closeModal() {
  editingId = null;
  modalOverlay.classList.remove('modal-overlay--open');
}

function saveEdit() {
  if (editingId === null) return;
  updateTodo(editingId, modalInput.value);
  closeModal();
}

// ===== イベント =====

// Todo追加
addBtn.addEventListener('click', () => {
  addTodo(inputEl.value);
  inputEl.value = '';
  inputEl.focus();
});

inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTodo(inputEl.value);
    inputEl.value = '';
  }
});

// タブ切り替え
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filter = tab.dataset.filter;
    tabs.forEach(t => t.classList.remove('tab--active'));
    tab.classList.add('tab--active');
    render();
  });
});

// モーダル操作
saveBtn.addEventListener('click', saveEdit);
cancelBtn.addEventListener('click', closeModal);
modalInput.addEventListener('keydown', e => { if (e.key === 'Enter') saveEdit(); });

// オーバーレイタップで閉じる
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

// ===== 初期描画 =====
render();
