import React,{Component} from 'react';
import FileServer from "../../utils/file-server";


interface State {
}

interface Props {
	// editor的markdown内容改变或者添加文件。返回的数据为EditorData类型
	textChange:(text:EditorData) => void,
	className:string,
	style:{[key:string]:any};
}

class LeeEditor extends Component<Props,State> {

	textEditor:React.RefObject<HTMLDivElement> = React.createRef();

	constructor(props){
		super(props);
		// TODO 复制粘贴过来的好像多了一行空行
	}


	textPaste = (e:React.ClipboardEvent) => {
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
				switch (type) {
					case 'text/plain':
						let text = (e['originalEvent'] || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
						document.execCommand("insertText", false, text);
						break;
					default:
				}
				return type;
			})
		}
	};

	imgShow = (files:FileList) => {
		for (let file of Object.values(files)) {
			if (file.type.indexOf('image') > -1) { // 图片展示处理
				const src = window.URL.createObjectURL(file);
				// img.onload = ;
				// TODO 行首直接插入，行中换行插入。图片onload事件。
				// document.execCommand("insertText", false, `![${file.name}](${src})`);
				document.execCommand("insertText", false, `![请输入图片描述](${src})`);
			}
		}
	}

	imgOnload = (url:string) => {
		window.URL.revokeObjectURL(url);
	}

	fileUpload = (files:FileList) => {
		FileServer.FileUpload(files)
	};

	keyDown= (e:React.KeyboardEvent)=> {
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
	};

	textChange = () => {
		this.props.textChange({type:1,text:this.textEditor.current.innerText});
	};

	render = () => {

		let {className,style} = this.props;
		return (
			<div className={className} onInput={this.textChange} ref={this.textEditor} style={style} onKeyDown={this.keyDown} contentEditable={true} onPaste={this.textPaste}></div>
		)
	};
}


export default LeeEditor;

// editor添加文件后发射的数据
export interface EditorFile {
	// 文件名字
	name:string

	// 文件大小，单位：byte字节
	size:number

	// 场次修改时间，ms时间戳
	lastModified:number
}

// editor的markdown的内容修改或者添加文件后发射的数据
export interface EditorData {
	// 1表示数据类型为markdown内容修改。2表示数据类型为添加文件
	type:number;

	// markdown内容
	text?:string;

	// 添加的文件信息（数据需要单独接受）
	file?:EditorFile
}