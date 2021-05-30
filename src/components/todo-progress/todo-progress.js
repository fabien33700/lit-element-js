import { LitElement, html } from 'lit';
import { styleMap } from 'lit/directives/style-map';

import styles from './todo-progress.css';

/**
 * Bounds a number between min and max.
 * @param {number} value The value
 * @param {number} range A tuple of the [min, max] bounds
 * @returns The value between min and max
 */
function bound(value, range) {
  let [min, max] = range
  if (max < min) [min, max] = [max, min]
  return (value < min) ? min : (value > max) ? max : value;
}

export default class TodoProgressElement extends LitElement {
  static styles = styles

  static get properties() {
    return {
      percent: {
        type: Number
      }
    }
  }

  constructor() {
    super();
    this.percent = 0;
  }

  render() {
    const percent = bound(this.percent, [0, 100]);
    const style = { width: `${percent}%` };
    return html`
      <div class="progress">
        <div class="todo-progress" style=${styleMap(style)}>&nbsp;</div>
      </div>
    `;
  }
}

window.customElements.define("todo-progress", TodoProgressElement);
