import React, { Component,Fragment } from 'react';
import ToDoItem from './toDoItem';

class ToDoList extends Component {
  state = {
    list:[],
    newItemValue:''
  }

  constructor(props){
    super(props);
    this.addItem = this.addItem.bind(this);
    this.updateNewItemValue = this.updateNewItemValue.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  /**添加新事项 */
  addItem() {
    if(this.state.newItemValue){
      this.setState({
        list:[...this.state.list,this.state.newItemValue],
        newItemValue:''
      })
    }
  }

  /**更新待添加事项的内容 */
  updateNewItemValue(e) {
    this.setState({
      newItemValue:e.target.value
    });
  }

  /**删除某个事项 */
  deleteItem(i) {
    let list = [...this.state.list];
    list.splice(i,1);
    this.setState({
      list
    });
  }

  renderList(){
    return (
      this.state.list.map((item,i) => {
        // return <li key={i} onDoubleClick={this.deleteItem.bind(this,i)}>{item}</li>
        return <ToDoItem delete={this.deleteItem.bind(this,i)} key={i} content={item} index={i} />
      })
    )
  }


  render() {
    return (
      <Fragment>
        <input type="text" value={this.state.newItemValue} onChange={this.updateNewItemValue}  />
        <button onClick={this.addItem}>添加</button>
          {
            this.renderList()
          }
      </Fragment>
    );
  }
}

export default ToDoList;
