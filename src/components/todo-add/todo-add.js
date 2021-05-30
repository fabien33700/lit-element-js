import { html, LitElement } from "lit";

import styles from './todo-add.css'

export default class TodoAddElement extends LitElement {
  static styles = styles

  /**
   * Handle event fired when user press Enter key, and
   * fire a 'todo-added' event to the parent element
   * @param {KeyboardEvent} e The keyup event from the task input
   */
  _addTodo(e) {
    if (e.key !== "Enter") return;

    const text = e.target.value;

    if (text && text.trim()) {
      const event = new CustomEvent('todo-added', { detail: text })
      this.dispatchEvent(event);
      e.target.value = '';
    }
  }

  render() {
    return html`
      <input type="checkbox" disabled />
      <input
        type="text"
        placeholder="Add a todo text"
        class="add-todo"
        @keyup=${this._addTodo}
      />
    `;
  }
}

window.customElements.define("todo-add", TodoAddElement);
