import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";


import styles from "./todo-item.css";

export default class TodoItemElement extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      todo: {type: Object}
    }
  }

  /**
   * Emits 'toggle-done' event to the parent list
   */
  _toggleDone() {
    this.dispatchEvent(new CustomEvent("toggle-done"));
  }

  /**
   * Emits 'delete-todo' event to the parent list
   */
  _deleteTodo() {
    this.dispatchEvent(new CustomEvent("delete-todo"));
  }

  render() {
    const { done } = this.todo;
    const classes = {
      check: { checkbox: true, done },
      text: { text: true, done },
    };

    return html`
      <div
        id="todo-check"
        class=${classMap(classes.check)}
        @click=${this._toggleDone}
      >
        ✓
      </div>
      <span id="todo-text" class=${classMap(classes.text)}>
        <slot></slot>
        <button id="delete-btn" class="delete-btn" @click=${this._deleteTodo}>⨯</button>
      </span>
    `;
  }
}

window.customElements.define("todo-item", TodoItemElement);
