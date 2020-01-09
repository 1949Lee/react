import React,{Component} from 'react';
import {EditorData} from "../../utils/interface";


interface State {
}

interface Props {
	// editor的markdown内容改变返回的数据为EditorData类型
	textChange:(text:EditorData) => void,
	fileUpload:(file:EditorData) => void,
	className:string,
	style:{[key:string]:any};
	initText:string
}

class LeeEditor extends Component<Props,State> {

	textEditor:React.RefObject<HTMLDivElement> = React.createRef();

	constructor(props){
		super(props);
	}

	componentDidMount() {
		if(this.props.initText){
			// this.textEditor.current.innerHTML = this.props.initText;
			this.textEditor.current.focus();
			document.execCommand("insertText", false, this.props.initText);
		}
	}

	initEditor = () => {
		// console.log(document.execCommand("defaultParagraphSeparator", false, 'br'));
	};

	// 粘贴时的处理
	textPaste = (e:React.ClipboardEvent) => {
		// 阻止默认粘贴
		e.preventDefault();
		// 粘贴事件有一个clipboardData的属性，提供了对剪贴板的访问
		// clipboardData的getData(fomat) 从剪贴板获取指定格式的数据
		let clipboardData = e.clipboardData;
		let dataTypes = clipboardData.types;
		if (dataTypes.filter((type) => type === 'Files').length > 0) {
			this.imgShow(clipboardData.files);
			this.fileUpload(clipboardData.files);
		} else {
			dataTypes.map((type) => {
				switch (type) {
					case 'text/plain':
						let text = (e['originalEvent'] || e).clipboardData.getData('text/plain') || '\`不支持的粘贴内容\`';
						document.execCommand("insertText", false,text);
						break;
					default:
				}
				return type;
			})
		}
	};

	// 键盘按下时的处理，包括tab处理。
	keyDown= (e:React.KeyboardEvent)=> {
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
			this.textChange();
			e.preventDefault();
		}
	};


	// 将粘贴时的图片展示。
	imgShow = (files:FileList) => {
		for (let file of Object.values(files)) {
			if (file.type.indexOf('image') > -1) { // 图片展示处理
				const src = window.URL.createObjectURL(file);
				// img.onload = ;
				// TODO 行首直接插入，行中换行插入。图片粘贴直接按上传文件处理。
				// document.execCommand("insertText", false, `![${file.name}](${src})`);
				document.execCommand("insertText", false, `![请输入图片描述](${src})`);
			}
		}
	};

	// 粘贴的图片使用了blob，所以需要将blog删除。否则，只能等到关闭网站时才会清除，不清除会占用浏览器性能
	imgOnload = (url:string) => {
		window.URL.revokeObjectURL(url);
	};

	// markdown内容改变
	textChange = () => {
		let data = this.textEditor.current.innerText;
		data = data.replace(/\n\n/g,'\n');
		this.props.textChange({type:1,text:data});
	};

	// 文件添加
	fileUpload = (files:FileList) => {
		this.props.fileUpload({type:2,files:files});
	};

	render = () => {
		let {className,style} = this.props;
		return (
			<div className={className}
					 onFocus={this.initEditor}
					 onInput={this.textChange}
					 ref={this.textEditor}
					 style={style}
					 onKeyDown={this.keyDown}
					 contentEditable={true}
					 onPaste={this.textPaste}></div>
		)
	};
}


export default LeeEditor;

// // editor添加文件后发射的数据
// export interface EditorFile {
// 	// 文件名字
// 	name:string
//
// 	// 文件大小，单位：byte字节
// 	size:number
//
// 	// 场次修改时间，ms时间戳
// 	lastModified:number
// }
