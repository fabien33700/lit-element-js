import {css} from 'lit';

export default css`
  :host {
    display: flex;
    flex-direction: row;
    margin-bottom: 3px;
  }

  .text {
    transition: 0.3s;
  }

  .text.done {
    text-decoration: line-through;
    font-style: italic;
    color: #666;
  }

  .checkbox, .delete-btn {
    background: none;
    border: none;
    border-radius: 3px;
    transition: 0.3s;
    padding: 2px 6px;
    margin-right: 5px;
    cursor: pointer;
  }

  .delete-btn {
    font-size: 12pt;
  }

  .checkbox:hover {
    background-color: #eee;
  }

  .delete-btn:hover {
    background-color: #c0392b;
    color: white;
  }

  .checkbox.done {
    background-color: #7dcea0;
    color: white;
  }

  .checkbox.done:hover {
    background-color: #229954;
  }
`;
