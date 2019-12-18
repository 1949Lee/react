import axios from 'axios';
import {string} from "prop-types";
import React, {Component} from 'react';
import {FileTable, FileTableItem, FileTableItemStatus} from "../../../components/file-table/file-table";
import LeeEditor, {EditorData} from "../../../components/lee-editor/editor";
import {Parse, Token} from "../../../components/lee-editor/tokens-parser";
import FileServer from "../../../utils/file-server";
import * as style from './style.scss';

interface State {
	previewFlag: boolean
	previewHtml: JSX.Element,
	previewHeight: string,
	previewPosition: number,
	files: {[key:string]:FileTableItem}
}

interface Props extends React.ComponentProps<any> {
}

class NewArticle extends Component<Props, State> {

	ws: WebSocket = null;

	preview: React.RefObject<HTMLDivElement> = React.createRef();
	previewResult: React.RefObject<HTMLDivElement> = React.createRef();
	fileSelected: React.RefObject<HTMLInputElement> = React.createRef();

	// 当前上传中/上传完成/上传失败的文件
	copyFiles: any[] = [];

	// 每次粘贴后存储的临时文件夹
	tempFile: any[] = [];

	constructor(props: Props) {
		super(props);
		this.state = {
			previewFlag: false,
			previewHtml: null,
			previewHeight: '100%',
			previewPosition: 0,
			files: {}
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

	// 向server发送websocket的消息
	send = (data: EditorData) => {
		data.articleID = 1234567811111111;
		// Web Socket 使用 send() 方法发送数据
		this.ws.send(JSON.stringify(data));
	};

	// 接受server返回的websocket的消息
	receive = (event: MessageEvent) => {
		let result = (JSON.parse(event.data));
		if (result && +result.code === 0) {
			if (result.type === 1 && result.markdown) { // 返回结果是markdown转换结果
				// this.setState({previewHtml: result.markdown.html})
				this.setState({previewHtml: Parse(result.markdown.list as Token[][])})
			} else if (result.type === 2 && result.files) { // 返回结果是确认收到文件信息并返回文件id
				this.handleFileServerPrepare(result.files)
			}
		}
	};

	// 将鼠标对应的预览内容，展示到预览区
	moveToPreview = (event: React.MouseEvent) => {
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

	// 隐藏预览，切换回编辑
	hidePreview = () => {
		this.setState({previewFlag: false})
	};

	// 切换预览与编辑
	togglePreview = () => {
		this.setState({previewFlag: !this.state.previewFlag})
	};

	//
	fileUpload = (files: EditorData) => {
		if (files.type === 2 && files.files && files.files.length >= 1) {
			const filesList = {type: 2, files: [],articleID:1234567811111111};
			filesList.files = FileServer.FileUpload(files.files);
			this.ws.send(JSON.stringify(filesList));
			for (let [key, file] of Object.entries(filesList.files)) {
				this.tempFile.push({name: file.name, size: file.size, file: files.files[key]})
			}
		}
	};

	// 将上传的文件添加到文件列表
	handleFileServerPrepare = (files: any[]) => {
		this.tempFile.map((file: any) => {
			let tem = files.find((f) => {
				return file.name === f.name
			});
			if (tem) {
				file.id = tem.id;
				this.copyFiles.push(file);
				// file.status = 0
			}
		});
		this.tempFile = [];
		this.sendFileFragment().then(() => {
		});
	};

	//直接粘贴图片后，将图片分片上传
	sendFileFragment = async () => {
		for (let j = 0; j < this.copyFiles.length; j++) {
			if (this.copyFiles[j].file) {
				let arrayBuffer = await FileServer.GetFileData(this.copyFiles[j].file);
				let origin = new DataView(arrayBuffer);
				let size = 64;
				let res, i = 0;
				console.log(this.copyFiles[j]);
				while (true) {
					res = FileServer.NextFileFragment(this.copyFiles[j].id, origin, i, false, size);
					if (res.flag === 4) {// 需要分片发完了
						delete this.copyFiles[j].file;
						this.copyFiles[j].status = 'finished';
						break;
					}
					console.log(res.data.byteLength);
					this.ws.send(res.data.buffer);
					if (res.flag === 1) {// 不需要分片发完了
						delete this.copyFiles[j].file;
						this.copyFiles[j].status = 'finished';
						break;
					}
					i++;
				}
			}
		}
	};

	// 选择图片上传
	uploadSelected = () => {
		if (this.fileSelected.current.files.length > 0) {
			for (let i = 0; i < this.fileSelected.current.files.length; i++) {
				let data: FormData = new FormData();
				data.append("file", this.fileSelected.current.files[i], this.fileSelected.current.files[i].name);
				data.append("articleID",'1234567811111111');
				let fileInfo: FileTableItem = {
					name: this.fileSelected.current.files[i].name,
					size: this.fileSelected.current.files[i].size,
					status: FileTableItemStatus.Uploading,
					upload: {
						loaded: 0,
						total: this.fileSelected.current.files[i].size
					}
				};
				let name = fileInfo.name;
				this.setState((state) =>{
					return {files:{...state.files,[name]:fileInfo}}
				},() => {
					axios.post("http://localhost:1314/new-file", data, {
						onUploadProgress: (e: ProgressEvent) => {
							this.setState((state) =>{
								if(state.files[name]) {
									state.files[name].upload.loaded = e.loaded;
								}
								return {files:state.files}
							});
							// this.setState({files:this.state.files.map((file,index) =>{if(index === this.state.files.length - 1)file.upload.loaded = e.loaded;return file})});
						},
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}).then( (res:any) => {
						if(res.data.type === 4 && res.data.code === 0) {
							this.setState((state) =>{
								state.files[name].status = FileTableItemStatus.Success;
								res.data.data && res.data.data.map( (file:any) => {
									if (file.url) {
										state.files[file.fileName].url = file.url;
									}
								});
								return {files:state.files}
							});
						}

					});
				});
			}
		} else {
			console.log('未选择文件');
		}
	};



	render() {
		return (
			<div className={style['new-article']}>
				<div className={style['options-wrapper']}>
					{/*<button onClick={}>发送</button>*/}
					<button onClick={this.togglePreview}>{
						this.state.previewFlag ? '取消预览' : '预览'
					}</button>
					<input type="file" ref={this.fileSelected} multiple={true}/>
					{/*<input type="checkbox" onChange={}/>*/}
					<button onClick={this.uploadSelected}>上传</button>
					{
						Object.getOwnPropertyNames(this.state.files).length >= 0 ?
							<div className={style['file-list']}>
								<FileTable files={this.state.files}/>
								{/*<FileTable files={[]}></FileTable>*/}
							</div> : null
					}
				</div>
				<div className={style['editor-wrapper']}>
					<LeeEditor className={style['editor']}
										 style={{opacity: this.state.previewFlag ? 0 : 1}}
										 textChange={(data: EditorData) => {
											 this.send(data)
										 }}
										 fileUpload={(files: EditorData) => {
											 this.fileUpload(files)
										 }}/>
					<div className={style['preview-result']} style={
						{
							opacity: this.state.previewFlag ? 1 : 0,
							zIndex: this.state.previewFlag ? 1 : -1
						}} ref={this.previewResult}
						// dangerouslySetInnerHTML={{__html: this.state.previewHtml}}></div>
					>{this.state.previewHtml}</div>
				</div>
				<div className={style['divider']} />
				<div className={style['preview-wrapper']} onMouseMove={(event) => {
					this.moveToPreview(event)
				}} onMouseLeave={this.hidePreview}>
					<div className={style['preview-html']} ref={this.preview}
						// dangerouslySetInnerHTML={{__html: this.state.previewHtml}}>
					>{this.state.previewHtml}
					</div>
					<div className={style['preview-options-area']}
							 style={{height: this.preview.current ? this.preview.current.getBoundingClientRect().height + 'px' : '100%'}}/>
				</div>
			</div>
		);
	}
}

export default NewArticle;
