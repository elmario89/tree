import React, { Component } from "react";
import "../css/BinaryNodeTreeApp.css";
import BinaryTreeNode from "../classes/BinaryTreeNode";
import BinaryTreeLevel from "./BinaryTreeLevel";

const INITIAL_STATE = {
  insertKey: "",
  insertValue: "",
  find: "",
  remove: "",
  bTree: new BinaryTreeNode(),
  operation_time: 0,
  activateArrows: true
};
/*
* Каждый узел в дереве может иметь максимум двух детей
* Все значения дерева уникальны
* Элементы слева всех ниже родительского элемента
* элементы справа всегда выше родительского элемента
*/
class BinaryNodeTreeApp extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.aux_timer = 0;
    this.onChangeInsertKey = this.onChangeInsertKey.bind(this);
    this.onChangeInsertValue = this.onChangeInsertValue.bind(this);
    this.onChangeFind = this.onChangeFind.bind(this);
    this.onChangeRemove = this.onChangeRemove.bind(this);
    this.onChangeActivateArrow = this.onChangeActivateArrow.bind(this);
    this.insert = this.insert.bind(this);
    this.remove = this.remove.bind(this);
    this.find = this.find.bind(this);
    this.clear = this.clear.bind(this);
  }
  initTimer() {
    this.aux_timer = performance.now();
  }
  finishTimer() {
    this.setState({
      operation_time: performance.now() - this.aux_timer
    });
  }
  insert() {
    this.initTimer();
    this.insertKey = "";
    this.insertValue="";
    this.state.bTree.insert(this.state.insertKey, this.state.insertValue);
    this.forceUpdate();

    this.finishTimer();
  }

  remove() {
    this.initTimer();
    if (this.state.bTree !== null && !isNaN(this.state.remove)) {
      this.state.bTree.remove(parseInt(this.state.remove, 10));
      this.forceUpdate();
    }
    this.finishTimer();
  }
  find() {
    // This is not the truly way to find and element in the table
    // The good one is the above commented lines
    this.initTimer();
    const found = document.querySelector(
      '[data-key="' + this.state.find + '"] .round'
    );
    if (found != null) {
      found.classList.add("found");
      setTimeout(() => {
        found.classList.remove("found");
      }, 3000);
    }
    this.finishTimer();
  }
  clear() {
    this.initTimer();
    if (this.state.bTree !== null) {
      this.state.bTree.clear();
      this.state = INITIAL_STATE;
      this.forceUpdate();
    }
    this.finishTimer();
  }

  onChangeInsertKey(e) {
    const insertKey = +e.target.value;
    if (!isNaN(insertKey)) {
      this.setState({
        insertKey
      });
    }
  }
  onChangeInsertValue(e) {
    this.setState({
      insertValue: e.target.value
    });
  }
  onChangeFind(e) {
    this.setState({
      find: e.target.value
    });
  }
  onChangeRemove(e) {
    this.setState({
      remove: e.target.value
    });
  }
  onChangeActivateArrow() {
    this.setState({
      activateArrows: !this.state.activateArrows
    });
  }

  render() {
    const values = this.state.bTree !== null && this.state.bTree.levelOrder();
    return (
      <div className="Binary-Node-Tree-App">
        <div className="App-intro">
          <div className="App-buttons col-md-12">
            {this.state.bTree !== null && (
              <div>
                <div className="pull-left col-md-5">
                  <input
                    className="pull-left"
                    placeholder="Ключ"
                    value={this.state.insertKey}
                    onChange={this.onChangeInsertKey}
                  />
                  <input
                    className="pull-left"
                    placeholder="Значение"
                    value={this.state.insertValue}
                    onChange={this.onChangeInsertValue}
                  />
                  <button
                    onClick={this.insert}
                    className="btn btn-default pull-left"
                  >
                    Вставить O(n)
                  </button>
                </div>
                <div className="pull-left col-md-2">
                  <input
                    id="find"
                    className="pull-left"
                    value={this.state.find}
                    onChange={this.onChangeFind}
                  />
                  <button
                    onClick={this.find}
                    className="btn btn-default pull-left"
                  >
                    Найти O(n)
                  </button>
                </div>
                <div className="pull-left col-md-5">
                  <input
                    id="remove"
                    className="pull-left"
                    value={this.state.remove}
                    onChange={this.onChangeRemove}
                  />
                  <button
                    onClick={this.remove}
                    className="btn btn-default pull-left"
                  >
                    Удалить O(n)
                  </button>
                  <button
                    onClick={this.clear}
                    className="btn btn-default pull-left"
                  >
                    Очистить O(n)
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="App-canvas col-md-12">
            <div className="content">
              <div className="bTree">
                {values.length > 0 &&
                  values.map((value, level) => (
                    <BinaryTreeLevel
                      activateArrows={this.state.activateArrows}
                      key={level}
                      level={level + 1}
                      values={value}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="operation-time">
          <span className="time">{this.state.operation_time}</span> миллисекунд
        </div>
      </div>
    );
  }
}
export default BinaryNodeTreeApp;
