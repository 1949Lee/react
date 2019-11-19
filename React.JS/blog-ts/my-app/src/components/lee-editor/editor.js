import React,{Component} from 'react';
import PropTypes from 'prop-types';

class LeeEditor extends Component {
	constructor(props){
		super(props);
		this.props = props
		this.textPaste = this.textPaste.bind(this);
		this.textInput = this.textInput.bind(this);
		this.textChange = this.textChange.bind(this);
		this.imgShow = this.imgShow.bind(this);
		this.imgOnload = this.imgOnload.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
		this.fileFragmentSend = this.fileFragmentSend.bind(this);
		this.textEditor = React.createRef();
		// TODO 复制粘贴过来的好像多了一行空行
	}


	textPaste(e) {
		// 阻止默认粘贴
		e.preventDefault();
		// 粘贴事件有一个clipboardData的属性，提供了对剪贴板的访问
		// clipboardData的getData(fomat) 从剪贴板获取指定格式的数据
		let clipboardData = e.clipboardData;
		let dataTypes = clipboardData.types;
		console.log(dataTypes);
		if (dataTypes.filter((type) => type === 'Files').length > 0) {
			this.imgShow(clipboardData.files);
			// TODO 可以做成上传图片到服务器：粘贴后直接弹出询问弹窗，是否上传图片，是，直接上传。显示文件列表。
			// this.fileUpload(clipboardData.files);
		} else {
			dataTypes.map((type) => {
				switch (type) {
					case 'text/plain':
						let text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
						document.execCommand("insertText", false, text);
						break;
					default:
				}
				return type;
			})
		}
	}

	imgShow(files) {
		for (let file of files) {
			if (file.type.indexOf('image') > -1) { // 图片展示处理
				const src = window.URL.createObjectURL(file);
				// img.onload = ;
				// TODO 行首直接插入，行中换行插入。图片onload事件。
				// document.execCommand("insertText", false, `![${file.name}](${src})`);
				document.execCommand("insertText", false, `![请输入图片描述](${src})`);
			}
		}
	}

	imgOnload(url) {
		window.URL.revokeObjectURL(url);
	}

	fileUpload(files) {
		for (let file of files) {
			if (file.type.indexOf('image') > -1) { // 图片展示处理
				// TODO 上传图片的具体实现。参考链接 https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications
				/*var reader = new FileReader();
				this.ctrl = createThrobber(img);
				var xhr = new XMLHttpRequest();
				this.xhr = xhr;

				var self = this;
				this.xhr.upload.addEventListener("progress", function(e) {
					if (e.lengthComputable) {
						var percentage = Math.round((e.loaded * 100) / e.total);
						self.ctrl.update(percentage);
					}
				}, false);

				xhr.upload.addEventListener("load", function(e){
					self.ctrl.update(100);
					var canvas = self.ctrl.ctx.canvas;
					canvas.parentNode.removeChild(canvas);
				}, false);
				xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
				xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
				reader.onload = function(evt) {
					xhr.send(evt.target.result);
				};
				reader.readAsBinaryString(file);*/
				const fileInfo = {
					file:{
						name:file.name,
						size:file.size,
						lastModified:file.lastModified,
					}
				};
				console.log(fileInfo);
				const reader = new FileReader();
				reader.readAsArrayBuffer(file);
				reader.onload = (e) => {
					this.fileFragmentSend(e.target.result)
				};
			}
		}
	}

	fileFragmentSend(arrayBuffer) {
		let buffer = new ArrayBuffer(arrayBuffer.byteLength + 4);
		let data = new DataView(buffer);
		let origin = new DataView(arrayBuffer);
		data.setUint16(0,2);
		data.setUint16(2,64);
		for (let i = 4; i<data.byteLength;i+=2){
			data.setUint16(i,origin.getUint16(i - 4));
		}
		this.ws.send(data.buffer);
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

	textChange() {
		this.props.textChange(this.textEditor.current.innerText);
	}

	render() {

		let {className,style} = this.props;
		return (
			<div className={className} onInput={this.textChange} ref={this.textEditor} style={style} onKeyDown={this.textInput} contentEditable="true" onPaste={this.textPaste}></div>
		)
	}
}

LeeEditor.proptype = {
	textChange:PropTypes.func,
	className:PropTypes.string,
	style:PropTypes.object
};


export default LeeEditor;
