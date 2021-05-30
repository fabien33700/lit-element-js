import { html, LitElement } from "lit";

import styles from "./todo-app.css";

// Required custom elements
import "../todo-list/todo-list";
import "../todo-add/todo-add";
import "../todo-progress/todo-progress";
import TodoService from "../../services/todos.service"

export default class TodoAppElement extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      _todos: {state: true}
    }
  }

  constructor() {
    super();
    this._todos = TodoService.load();
  }

  /**
   * Handle 'toggle-done' event from <todo-list> element
   * @param {CustomEvent} e the event fired by TodoListElement
   */
  _onToggleDone(e) {
    const index = e.detail;
    this._todos = this._todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
  }

  /**
   * Handle 'delete-todo' event from <todo-list> element
   * @param {CustomEvent} e the event fired by TodoListElement
   */
  _onDeleteTodo(e) {
    const index = e.detail;
    this._todos = this._todos.filter((_, i) => i !== index);
  }

  /**
   * Handle 'todo-added' event from <todo-add> element
   * @param {CustomEvent} e the event fired by TodoAddElement
   */
  _onTodoAdded(e) {
    const text = e.detail;

    // Filter predicates
    if (this._todos.find((todo) => todo.text === text))
      return;

    this._todos = [
      ...this._todos,
      {
        text,
        done: false,
      },
    ];
  }

  updated() {
    TodoService.save(this._todos);
  }

  render() {
    const done = this._todos.filter(todo => todo.done).length;
    const total = this._todos.length;
    const percent = done / total * 100;

    return html`
      <div class="container">
        <h1>Todo List</h1>
        <div class="column">
          <todo-list
            .todos=${this._todos}
            @toggle-done=${this._onToggleDone}
            @delete-todo=${this._onDeleteTodo}
          >
          </todo-list>
          <todo-add @todo-added=${this._onTodoAdded}></todo-add>
          <todo-progress .percent=${percent}></todo-progress>
          <span>
            <b>${done}</b> out of <b>${total}</b> tasks done
          </span>
        </div>
      </div>
    `;
  }
}

window.customElements.define("todo-app", TodoAppElement);
