import React, {Component} from 'react';
import FileServer from "../../../utils/file-server";
import LeeEditor, {EditorData} from "../../../components/lee-editor/editor";
import * as style from './style.scss'

interface State {
	previewFlag:boolean
	// previewHtml:'<div class="content"><div class="block"><h3 class="header-h3" ><span class="text" >斜体和粗体和粗斜体</span></h3></div><div class="block"><span class="text" >使用 * 和 ** 和 *** 表示斜体和粗体。</span></div><div class="block"><span class="text" >这是 </span><span class="italic" >斜体</span><span class="text" >，这是 </span><span class="bold" >粗体</span><span class="text" >，这是</span><span class="bold-italic" >粗斜体</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >删除线</span></h3></div><div class="block"><span class="text" >使用 ~~ 表示删除线</span></div><div class="block"><span class="text" >这是 </span><span class="deleted-text" >删除线</span><span class="text" >，这是 </span><span class="deleted-text" >删除线+</span><span class="bold-italic deleted-text" >粗斜体</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >外链接</span></h3></div><div class="block"><span class="text" >使用 [描述](链接地址) 为文字增加外链接。</span></div><div class="block"><span class="text" >这是一个链接：</span><a class="inline-web-link"  href="https://www.jiaxuanlee.com" ><span class="text" >李佳轩的个人网站——</span><span class="bold-italic" >镜中之人</span></a></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >图像块</span></h3></div><div class="block"><span class="text" >使用![图像描述](图像地址)来添加图像，一个图像一行。</span></div><div class="block image-block"><div class="image-wrapper"><img class="image"  src="./img.jpeg"  alt="" /><div class="image-text-wrapper"><span class="inline-background-strong" ><span class="text" >这里是一个图片，可以使用其他</span><span class="bold-italic" >语法</span></span></div></div></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >行内底色变色强调</span></h3></div><div class="block"><span class="text" >使用`表示行内底色变色强调。</span></div><div class="block"><span class="text" >这是一个</span><span class="inline-background-strong" ><span class="text" >行内底色变色强调。</span><a class="inline-web-link"  href="https://www.jiaxuanlee.com" ><span class="text" >李佳轩的个人网站——</span><span class="bold-italic" >镜中之人</span></a></span><span class="text" >。</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >多级标题</span></h3></div><div class="block"><span class="text" >使用一个或多个#然后跟一个空格来表示多级标题</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h1 class="header-h1" ><span class="text" >这是一个一级标题</span></h1></div><div class="block"><h6 class="header-h6" ><span class="text" >这是一个六级标题，标题还可以跟一些简单语法法。</span><span class="inline-background-strong" ><span class="text" >变色强调。</span><span class="bold-italic" >粗斜体</span></span></h6></div></div>',
	previewHtml: string,
	previewHeight: string,
	previewPosition: number
}

interface Props extends React.ComponentProps<any>{
}

class NewArticle extends Component<Props,State> {

	ws:WebSocket = null;

	preview:React.RefObject<HTMLDivElement> = React.createRef();
	previewResult:React.RefObject<HTMLDivElement> = React.createRef();

	constructor(props:Props) {
		super(props);
		this.state = {
			previewFlag: false,
			// previewHtml:'<div class="content"><div class="block"><h3 class="header-h3" ><span class="text" >斜体和粗体和粗斜体</span></h3></div><div class="block"><span class="text" >使用 * 和 ** 和 *** 表示斜体和粗体。</span></div><div class="block"><span class="text" >这是 </span><span class="italic" >斜体</span><span class="text" >，这是 </span><span class="bold" >粗体</span><span class="text" >，这是</span><span class="bold-italic" >粗斜体</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >删除线</span></h3></div><div class="block"><span class="text" >使用 ~~ 表示删除线</span></div><div class="block"><span class="text" >这是 </span><span class="deleted-text" >删除线</span><span class="text" >，这是 </span><span class="deleted-text" >删除线+</span><span class="bold-italic deleted-text" >粗斜体</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >外链接</span></h3></div><div class="block"><span class="text" >使用 [描述](链接地址) 为文字增加外链接。</span></div><div class="block"><span class="text" >这是一个链接：</span><a class="inline-web-link"  href="https://www.jiaxuanlee.com" ><span class="text" >李佳轩的个人网站——</span><span class="bold-italic" >镜中之人</span></a></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >图像块</span></h3></div><div class="block"><span class="text" >使用![图像描述](图像地址)来添加图像，一个图像一行。</span></div><div class="block image-block"><div class="image-wrapper"><img class="image"  src="./img.jpeg"  alt="" /><div class="image-text-wrapper"><span class="inline-background-strong" ><span class="text" >这里是一个图片，可以使用其他</span><span class="bold-italic" >语法</span></span></div></div></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >行内底色变色强调</span></h3></div><div class="block"><span class="text" >使用`表示行内底色变色强调。</span></div><div class="block"><span class="text" >这是一个</span><span class="inline-background-strong" ><span class="text" >行内底色变色强调。</span><a class="inline-web-link"  href="https://www.jiaxuanlee.com" ><span class="text" >李佳轩的个人网站——</span><span class="bold-italic" >镜中之人</span></a></span><span class="text" >。</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h3 class="header-h3" ><span class="text" >多级标题</span></h3></div><div class="block"><span class="text" >使用一个或多个#然后跟一个空格来表示多级标题</span></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block empty-single-line-block"><br class="empty-line-br" /></div><div class="block"><h1 class="header-h1" ><span class="text" >这是一个一级标题</span></h1></div><div class="block"><h6 class="header-h6" ><span class="text" >这是一个六级标题，标题还可以跟一些简单语法法。</span><span class="inline-background-strong" ><span class="text" >变色强调。</span><span class="bold-italic" >粗斜体</span></span></h6></div></div>',
			previewHtml: '',
			previewHeight: '100%',
			previewPosition: 0
		};
		this.send = this.send.bind(this);
		this.moveToPreview = this.moveToPreview.bind(this);
		this.hidePreview = this.hidePreview.bind(this);
		this.togglePreview = this.togglePreview.bind(this);
	}

	componentDidMount() {
		// 打开一个 web socket
		this.ws = new WebSocket("ws://localhost:1314/ws/parser");

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

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.previewHtml !== this.state.previewHtml) {
			this.setState({previewHeight: this.preview.current.getBoundingClientRect().height + 'px'});
		}
	}

	send = (data:EditorData) => {
		// Web Socket 使用 send() 方法发送数据
		this.ws.send(JSON.stringify(data));
		// this.ws.send("");
	};

	receive = (event:MessageEvent) => {
		let result = (JSON.parse(event.data));
		console.log(result);
		if (result && +result.code === 0) {
			if (result.Type === 1 && result.markdown) {
				this.setState({previewHtml: result.markdown.html})
			} else if (result.Type === 2 && result.markdown) {

			}
		}
	};

	moveToPreview= (event:React.MouseEvent) =>{
		event.persist();
		let e = event.nativeEvent;
		if (this.state.previewHtml) {
			this.setState({
				previewPosition: e.offsetY,
				previewFlag: true
			});
		}
		this.previewResult.current.scrollTop = this.state.previewPosition * 5 - 20
	};

	hidePreview = () => {
		this.setState({previewFlag: false})
	};

	togglePreview = () => {
		this.setState({previewFlag: !this.state.previewFlag})
	};

	fileUpload = (files:EditorData) => {
		if (files.type === 2 && files.files && files.files.length >= 1) {
			const filesList = {type:2,files:[]};
			filesList.files = FileServer.FileUpload(files.files);
			this.ws.send(JSON.stringify(filesList));
		}
	};

	render() {
		return (
			<div className={style['new-article']}>
				<div className={style['options-wrapper']}>
					{/*<button onClick={this.send}>发送</button>*/}
					<button onClick={this.togglePreview}>{
						this.state.previewFlag? '取消预览':'预览'
					}</button>
				</div>
				<div className={style['editor-wrapper']}>
					<LeeEditor className={style['editor']}
										 style={{opacity: this.state.previewFlag ? 0 : 1}}
										 textChange={(data:EditorData) => {this.send(data)}}
										 fileUpload={(files:EditorData) => {this.fileUpload(files)}}></LeeEditor>
					<div className={style['preview-result']} style={
						{
							opacity: this.state.previewFlag ? 1 : 0,
							zIndex: this.state.previewFlag ? 1 : -1
						}} ref={this.previewResult}
							 dangerouslySetInnerHTML={{__html: this.state.previewHtml}}></div>
				</div>
				<div className={style['divider']}></div>
				<div className={style['preview-wrapper']} onMouseMove={(event) => {
					this.moveToPreview(event)
				}} onMouseLeave={this.hidePreview}>
					<div className={style['preview-html']} ref={this.preview} dangerouslySetInnerHTML={{__html: this.state.previewHtml}}>
					</div>
					<div className={style['preview-options-area']}
							 style={{height: this.preview.current ? this.preview.current.getBoundingClientRect().height + 'px' : '100%'}}></div>
				</div>
			</div>
		);
	}
}

export default NewArticle;
