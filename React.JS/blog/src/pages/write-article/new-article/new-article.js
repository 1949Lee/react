import React, {Component} from 'react';
import './style.scss'

class NewArticle extends Component {

	ws = null;
	fileFragmentSize = 64; // 64kb

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			previewFlag: false,
			// previewHtml:'<div class="content"><div class="block"><h3 class="header-h3" ><span class="text" >斜体和粗体和粗斜体</span></h3></div><div class="block"><span class="text" >使用 * 和 ** 和 *** 表示斜体和粗体。</span></div><div class="block"><span class="text" >这是 </span><span class="italic" >斜体</span><span class="text" >，这是 </span><span class="bold" >粗体</span><span class="text" >，这是</span><span class="bold-italic" >粗斜体</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >删除线</span></h3></div><div class="block"><span class="text" >使用 ~~ 表示删除线</span></div><div class="block"><span class="text" >这是 </span><span class="deleted-text" >删除线</span><span class="text" >，这是 </span><span class="deleted-text" >删除线+</span><span class="bold-italic deleted-text" >粗斜体</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >外链接</span></h3></div><div class="block"><span class="text" >使用 [描述](链接地址) 为文字增加外链接。</span></div><div class="block"><span class="text" >这是一个链接：</span><a class="inline-web-link"  href="https://www.jiaxuanlee.com" ><span class="text" >李佳轩的个人网站——</span><span class="bold-italic" >镜中之人</span></a></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >图像块</span></h3></div><div class="block"><span class="text" >使用![图像描述](图像地址)来添加图像，一个图像一行。</span></div><div class="block image-block"><div class="image-wrapper"><img class="image"  src="./img.jpeg"  alt="" /><div class="image-text-wrapper"><span class="inline-background-strong" ><span class="text" >这里是一个图片，可以使用其他</span><span class="bold-italic" >语法</span></span></div></div></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >行内底色变色强调</span></h3></div><div class="block"><span class="text" >使用`表示行内底色变色强调。</span></div><div class="block"><span class="text" >这是一个</span><span class="inline-background-strong" ><span class="text" >行内底色变色强调。</span><a class="inline-web-link"  href="https://www.jiaxuanlee.com" ><span class="text" >李佳轩的个人网站——</span><span class="bold-italic" >镜中之人</span></a></span><span class="text" >。</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >多级标题</span></h3></div><div class="block"><span class="text" >使用一个或多个#然后跟一个空格来表示多级标题</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h1 class="header-h1" ><span class="text" >这是一个一级标题</span></h1></div><div class="block"><h6 class="header-h6" ><span class="text" >这是一个六级标题，标题还可以跟一些简单语法法。</span><span class="inline-background-strong" ><span class="text" >变色强调。</span><span class="bold-italic" >粗斜体</span></span></h6></div></div>',
			previewHtml: '',
			previewHeight: '100%',
			previewPosition: 0
		};
		this.textInput = this.textInput.bind(this);
		this.textPaste = this.textPaste.bind(this);
		this.send = this.send.bind(this);
		this.moveToPreview = this.moveToPreview.bind(this);
		this.hidePreview = this.hidePreview.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
		this.imgShow = this.imgShow.bind(this);
		this.imgOnload = this.imgOnload.bind(this);
		this.fileFragmentSend = this.fileFragmentSend.bind(this);
	}

	componentDidMount() {
		// 打开一个 web socket
		let ws = new WebSocket("ws://localhost:1314/ws");
		this.ws = ws;

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
		// ws.binaryType

	}

	componentWillUnmount() {
		this.ws.close();
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
			this.fileUpload(clipboardData.files);
		} else {
			dataTypes.map((type) => {
				console.log(clipboardData.getData(type));
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

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.previewHtml !== this.state.previewHtml) {
			this.setState({previewHeight: this.refs.preview.getBoundingClientRect().height + 'px'});
		}
	}

	send() {
		// Web Socket 使用 send() 方法发送数据
		this.ws.send(JSON.stringify({text: this.refs.editor.innerText}));
		// this.ws.send("");
	}

	receive(event) {
		let result = (JSON.parse(event.data));
		console.log(result);
		if (result && +result.code === 0) {
			if (result.markdown) {
				this.setState({previewHtml: result.markdown.html})
			}
		}
	}

	moveToPreview(event) {
		event.persist();
		let e = event.nativeEvent;
		if (this.state.previewHtml) {
			this.setState({
				previewPosition: e.offsetY,
				previewFlag: true
			});
		}
		this.refs.previewResult.scrollTop = this.state.previewPosition * 5 - 20
	}

	hidePreview() {
		this.setState({previewFlag: false})
	}

	render() {
		return (
			<div id="new-article">
				<div className="options-wrapper">
					{/*<button onClick={this.send}>发送</button>*/}
					<img ref="img" src="" alt="" height="60"/>
				</div>
				<div className="editor-wrapper">
					<div className="editor" ref="editor" style={{opacity: this.state.previewFlag ? 0 : 1}} onInput={this.send}
							 onKeyDown={this.textInput} contentEditable="true" onPaste={this.textPaste}></div>
					<div className="preview-result" style={{opacity: this.state.previewFlag ? 1 : 0}} ref="previewResult"
							 dangerouslySetInnerHTML={{__html: this.state.previewHtml}}></div>
					{/*<div className="preview-result" ref="previewResult" dangerouslySetInnerHTML={{__html:this.state.previewHtml}}></div>*/}
				</div>
				<div className="divider"></div>
				<div className="preview-wrapper" onMouseMove={(event) => {
					this.moveToPreview(event)
				}} onMouseLeave={this.hidePreview}>
					<div className="preview-html" ref="preview" dangerouslySetInnerHTML={{__html: this.state.previewHtml}}>
					</div>
					<div className="preview-options-area"
							 style={{height: this.refs.preview ? this.refs.preview.getBoundingClientRect().height + 'px' : '100%'}}></div>
				</div>
			</div>
		);
	}
}

export default NewArticle;
