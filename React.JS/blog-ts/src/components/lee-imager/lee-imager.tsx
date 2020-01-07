import React, {Component} from "react";
import ReactDOM from 'react-dom';

interface State {

}

interface Props extends React.ComponentProps<any>{

}

class LeeImager extends Component<Props,State> {
	container : HTMLDivElement = document.createElement('div');
	constructor(props:Props) {
		super(props);
		this.container.style.position = "fixed";
		this.container.style.top = "0";
		// this.container.style.display = "none";
		this.container.style.width = "100%";
		this.container.style.height = "100%";
		this.container.style.backgroundColor = "rgba(1,1,1,.45)";
		this.container.style.overflow = "auto";
		document.body.style.overflow = "hidden";
	}

	componentDidMount() {
		// 在 Modal 的所有子元素被挂载后，
		// 这个 portal 元素会被嵌入到 DOM 树中，
		// 这意味着子元素将被挂载到一个分离的 DOM 节点中。
		// 如果要求子组件在挂载时可以立刻接入 DOM 树，
		// 例如衡量一个 DOM 节点，
		// 或者在后代节点中使用 ‘autoFocus’，
		// 则需添加 state 到 Modal 中，
		// 仅当 Modal 被插入 DOM 树中才能渲染子元素。
		document.body.appendChild(this.container);
	}

	componentWillUnmount() {
		document.body.style.overflow = null;
		document.body.removeChild(this.container);
	}

	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.container
		);
	}
}

export default LeeImager
