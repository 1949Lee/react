import axios from 'axios';
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
	files: FileTableItem[]
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
			files: []
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

	send = (data: EditorData) => {
		// Web Socket 使用 send() 方法发送数据
		console.log(data);
		this.ws.send(JSON.stringify(data));
	};

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

	hidePreview = () => {
		this.setState({previewFlag: false})
	};

	togglePreview = () => {
		this.setState({previewFlag: !this.state.previewFlag})
	};

	fileUpload = (files: EditorData) => {
		if (files.type === 2 && files.files && files.files.length >= 1) {
			const filesList = {type: 2, files: []};
			filesList.files = FileServer.FileUpload(files.files);
			this.ws.send(JSON.stringify(filesList));
			for (let [key, file] of Object.entries(filesList.files)) {
				this.tempFile.push({name: file.name, size: file.size, file: files.files[key]})
			}
		}
	};

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

	uploadSelected = () => {
		if (this.fileSelected.current.files.length > 0) {
			for (let i = 0; i < this.fileSelected.current.files.length; i++) {
				let data: FormData = new FormData();
				data.append("file", this.fileSelected.current.files[i], this.fileSelected.current.files[i].name);
				let fileInfo: FileTableItem = {
					name: this.fileSelected.current.files[i].name,
					size: this.fileSelected.current.files[i].size,
					status: FileTableItemStatus.Uploading,
					upload: {
						loaded: 0,
						total: this.fileSelected.current.files[i].size
					}
				};
				let index = 0;
				this.setState((state) =>{
					console.log(state.files);
					return {files:[...state.files,fileInfo]}
				},() => {
					index = this.state.files.length;
					axios.post("http://localhost:1314/new-article", data, {
						onUploadProgress: (e: ProgressEvent) => {
							this.setState((state) =>{
								state.files[index - 1].upload.loaded = e.loaded;
								return {files:state.files}
							});
							// this.setState({files:this.state.files.map((file,index) =>{if(index === this.state.files.length - 1)file.upload.loaded = e.loaded;return file})});
						},
						headers: {
							"Content-Type": "multipart/form-data"
						}
					})
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
					{/*<button onClick={this.send}>发送</button>*/}
					<button onClick={this.togglePreview}>{
						this.state.previewFlag ? '取消预览' : '预览'
					}</button>
					<input type="file" ref={this.fileSelected} multiple={true}/>
					{/*<input type="checkbox" onChange={}/>*/}
					<button onClick={this.uploadSelected}>上传</button>
					{
						this.state.files.length >= 0 ?
							<div className={style['file-list']}>
								{/*<FileTable files={this.state.files}></FileTable>*/}
								<FileTable files={[]}></FileTable>
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
										 }}></LeeEditor>
					<div className={style['preview-result']} style={
						{
							opacity: this.state.previewFlag ? 1 : 0,
							zIndex: this.state.previewFlag ? 1 : -1
						}} ref={this.previewResult}
						// dangerouslySetInnerHTML={{__html: this.state.previewHtml}}></div>
					>{this.state.previewHtml}</div>
				</div>
				<div className={style['divider']}></div>
				<div className={style['preview-wrapper']} onMouseMove={(event) => {
					this.moveToPreview(event)
				}} onMouseLeave={this.hidePreview}>
					<div className={style['preview-html']} ref={this.preview}
						// dangerouslySetInnerHTML={{__html: this.state.previewHtml}}>
					>{this.state.previewHtml}
					</div>
					<div className={style['preview-options-area']}
							 style={{height: this.preview.current ? this.preview.current.getBoundingClientRect().height + 'px' : '100%'}}></div>
				</div>
			</div>
		);
	}
}

export default NewArticle;
