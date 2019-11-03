import React, {Component} from 'react';
import './style.scss'

class NewArticle extends Component {

	ws = null;
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			previewHtml:"",
			previewHeight:'100%'};
		this.textInput = this.textInput.bind(this);
		this.textPaste = this.textPaste.bind(this);
		this.send = this.send.bind(this);
	}

	componentDidMount() {
		// 打开一个 web socket
		let ws = new WebSocket("ws://localhost:1314/ws");
		this.ws =  ws;

		// TODO 计算机睡眠后在开启，websocket链接会断开。想办法处理
		this.ws.onopen = () => {
			console.log("已连接");
		};

		this.ws.onmessage = (evt) => {
			this.receive(evt)
		};

		this.ws.onclose = () => {
			// 关闭 websocket
			console.log("连接已关闭...");
		};

	}

	componentWillUnmount() {
		this.ws.close();
	}

	textPaste(e) {
		// 阻止默认粘贴
		e.preventDefault();
		// 粘贴事件有一个clipboardData的属性，提供了对剪贴板的访问
		// clipboardData的getData(fomat) 从剪贴板获取指定格式的数据
		let text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
		// 插入
		document.execCommand("insertText", false, text);
	}

	textInput(e) {
		// this.setState({data:this.state.data+this.state.data});
		if (e.key.toUpperCase() === 'TAB') {
			let selection = window.getSelection();
			if (selection.type === 'Caret') {
				let endNode = selection.anchorNode;
				let endIndex = selection.anchorOffset;
				selection.anchorNode.nodeValue = '    ' + selection.anchorNode.nodeValue;
				selection.collapse(endNode, endIndex + 4)
				// let range = document.createRange();
				// let range = selection.getRangeAt(0);
				// // range.selectNode(endNode);
				// range.setEnd(endNode,endIndex + 4);
				// range.collapse(false);
			} else {
				let startIndex = null;
				let endIndex = null;
				let parent = selection.anchorNode.parentNode;
				// 获取到选中的行的下标
				for (let i = 0; i < parent.childNodes.length; i++) {
					if (parent.childNodes[i].isSameNode(selection.anchorNode)) { // 开始用鼠标拖动选择行时，点击的行。
						startIndex = i;
					}
					if (parent.childNodes[i].isSameNode(selection.focusNode)) { // 结束用鼠标拖动选择行时，离开的行。
						endIndex = i
					}
				}
				// 因为有可能是从下往上选拖动的鼠标，所以开始下标可能会比他
				if (startIndex > endIndex) {
					let temp = startIndex;
					startIndex = endIndex;
					endIndex = temp;
				}

				for (let i = startIndex; i <= endIndex; i++) {
					if (parent.childNodes[i].nodeValue !== '\n') {
						parent.childNodes[i].nodeValue = '    ' + parent.childNodes[i].nodeValue;
					}
				}

			}
			e.preventDefault();
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevState.previewHtml !== this.state.previewHtml){
			this.setState({previewHeight:this.refs.preview.getBoundingClientRect().height + 'px'});
		}
	}

	send() {
		// Web Socket 使用 send() 方法发送数据
		this.ws.send(JSON.stringify({text:this.refs.editor.innerText}));
		// this.ws.send("");
	}

	receive(event){
		let result = (JSON.parse(event.data));
		console.log(result);
		this.setState({previewHtml:result.data.html})
	}

	render() {
		return (
			<div id="new-article">
				<div className="options-wrapper">
					<button onClick={this.send}>发送</button>
				</div>
				<div className="editor-wrapper">
					<div className="editor" ref="editor" onKeyDown={this.textInput} contentEditable="true" onPaste={this.textPaste}></div>
				</div>
				<div className="divider"></div>
				<div className="preview-wrapper">
					<div className="preview-html" ref="preview" dangerouslySetInnerHTML={{__html:this.state.previewHtml}}>
					</div>
					<div className="preview-options-area" style={{height:this.refs.preview?this.refs.preview.getBoundingClientRect().height + 'px':'100%'}}></div>
				</div>
			</div>
		);
	}
}

export default NewArticle;
