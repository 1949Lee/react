import React from 'react';

class ToDoItem extends React.Component {

    constructor(props){
        super(props);
        this.sendDeleteIndex = this.sendDeleteIndex.bind(this);
    }
    sendDeleteIndex(){
        this.props.delete(this.props.index);
    }
    render() {
        return (
            <div onDoubleClick={this.sendDeleteIndex}>{this.props.content}</div>
        )
    }
}

export default ToDoItem;