import { html, LitElement } from "lit";

import styles from './todo-list.css';

// Required custom elements
import "../todo-item/todo-item";

export default class TodoListElement extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      todos: {type: Array}
    }
  }

  /**
   * Emits 'toggle-done' event with the item index.
   * @param {number} index The index of the item in the list
   */
  toggleDone(index) {
    const event = new CustomEvent("toggle-done", { detail: index });
    this.dispatchEvent(event);
  }

  /**
   * Emits 'delete-todo' event with the item index.
   * @param {number} index The index of the item in the list
   */
  deleteTodo(index) {
    const event = new CustomEvent("delete-todo", { detail: index });
    this.dispatchEvent(event);
  }

  render() {
    return this.todos.map(
      (todo, index) => html`
        <todo-item
          .todo=${todo}
          @toggle-done=${() => this.toggleDone(index)}
          @delete-todo=${() => this.deleteTodo(index)}
        >
          ${todo.text}
        </todo-item>
      `
    );
  }
}

window.customElements.define('todo-list', TodoListElement);
