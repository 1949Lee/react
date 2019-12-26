import axios from 'axios';
import React, {Component, Fragment} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import CategoriesTags from "../../../components/categories-tags/categories-tags";
import FileTable,{ FileTableItem, FileTableItemStatus} from "../../../components/file-table/file-table";
import LeeEditor from "../../../components/lee-editor/editor";
import {Parse, Token} from "../../../components/lee-editor/tokens-parser";
import PreviewFullPage from "../../../components/preview-full-page/preview-full-page";
import FileServer from "../../../utils/file-server";
import {FileSizeText} from "../../../utils/methods";
import * as style from './style.scss';
import {Button, Drawer, Empty, Modal} from "antd";
import {ArticleInfo, CategoryWithTags, EditorData} from "../../../utils/interface";

interface State {
	previewFlag: boolean
	previewHtml: JSX.Element,
	previewHeight: string,
	previewPosition: number,
	files: { [key: string]: FileTableItem },
	filesTableFlag: boolean,
	postingFlag: boolean,
	postModalFlag: boolean,
	categoryWithTags: CategoryWithTags[]
	article: ArticleInfo
	finalPreview: boolean
}

interface Props extends React.ComponentProps<any>, RouteComponentProps<{ id: any }> {
}

class NewArticle extends Component<Props, State> {

	ws: WebSocket = null;

	preview: React.RefObject<HTMLDivElement> = React.createRef();
	previewResult: React.RefObject<HTMLDivElement> = React.createRef();
	fileSelected: React.RefObject<HTMLInputElement> = React.createRef();
	chosenTags: React.RefObject<CategoriesTags> = React.createRef();

	test = "dasdasd";

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
			files: {},
			filesTableFlag: false,
			postingFlag: false,
			postModalFlag: false,
			finalPreview: false,
			categoryWithTags: [],
			article: {
				articleID: -1,
				title: '',
				createTime: ''
			}
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
		axios.post('http://localhost:1314/categories-with-tags', {}).then((res) => {
			if (res.data.code === 0) {
				this.setState({categoryWithTags: res.data.data});
			}
		}, err => {
			console.error(err);
		});
		this.setState((state, props) => {
			state.article.articleID = props.match.params.id * 1;
			return {
				article: {
					...state.article
				}
			}
		})
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
		data.articleID = this.props.match.params.id * 1;
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
			const filesList = {type: 2, files: [], articleID: this.props.match.params.id * 1};
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

	showSysFileSelected = () => {
		this.fileSelected.current.click();
	};

	confirmUpload = () => {
		if (this.fileSelected.current.files.length > 0) {
			let me = this;
			let files = Array(me.fileSelected.current.files.length);
			files.fill(0);
			Modal.confirm({
				title: `确认上传选择的${me.fileSelected.current.files.length}个文件吗？`,
				content: <Fragment>
					{files.map((val, i: number) => {
						return <p
							key={i}>{me.fileSelected.current.files[i].name}，约{FileSizeText(me.fileSelected.current.files[i].size)}</p>
					})}
				</Fragment>,
				icon: null,
				maskClosable: false,
				onOk() {
					me.uploadSelected();
				},
				onCancel() {
					me.fileSelected.current.value = null;
				},
			});
		}
	};

	// 选择图片上传
	uploadSelected = () => {
		if (this.fileSelected.current.files.length > 0) {
			for (let i = 0; i < this.fileSelected.current.files.length; i++) {
				let data: FormData = new FormData();
				data.append("file", this.fileSelected.current.files[i], this.fileSelected.current.files[i].name);
				data.append("articleID", this.props.match.params.id);
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
				this.setState((state) => {
					return {files: {...state.files, [name]: fileInfo}}
				}, () => {
					axios.post("http://localhost:1314/new-file", data, {
						onUploadProgress: (e: ProgressEvent) => {
							this.setState((state) => {
								if (state.files[name]) {
									state.files[name].upload.loaded = e.loaded;
								}
								return {files: state.files}
							});
							// this.setState({files:this.state.files.map((file,index) =>{if(index === this.state.files.length - 1)file.upload.loaded = e.loaded;return file})});
						},
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}).then((res: any) => {
						if (res.data.type === 4 && res.data.code === 0) {
							this.setState((state) => {
								state.files[name].status = FileTableItemStatus.Success;
								res.data.data && res.data.data.map((file: any) => {
									if (file.url) {
										state.files[file.fileName].url = file.url;
									}
								});
								return {files: state.files}
							});
						}

					});
				});
			}
		} else {
			console.log('未选择文件');
		}
	};

	// 文件列表中文件删除。
	FileTableFileChange = (name: string, action: string) => {
		if (name !== null && name !== undefined) {
			switch (action) {
				case 'delete':
					this.setState((state) => {
						delete state.files[name];
						return state
					});
					break;
				default:
					break;
			}
		}
	};

	// 文件列表抽屉关闭
	FilesTableDrawerClose = () => {
		this.FilesTableDrawerToggle(false);
	};

	// 文件列表抽屉关闭或显示
	FilesTableDrawerToggle = (value: boolean) => {
		this.setState({filesTableFlag: value});
	};

	// 打开或关闭发布弹窗
	togglePostModal = (value: boolean) => {
		this.setState({postModalFlag: value});
	};

	// 关闭发布弹窗
	postModalCancel = () => {
		this.setState({postModalFlag: false})
	};

	// 发布弹窗点击下一步，需要显示最终预览
	previewBeforePost = () => {
		//	预览自己蒙层+类全屏的预览区域+三个按钮（直接返回修改、返回文章信息填写弹窗、最终发布）
		let result = this.getCategoryAndTagsInChild();
		this.setState((state) => {
			state.article.category = result.category;
			state.article.tags = result.tags;
			return {
				article: {...state.article}
			}
		},() => {this.setState({finalPreview:true});});
	};

	// 获取子组件中选择的分类和标签结果
	getCategoryAndTagsInChild = () => {
		let ID = this.chosenTags.current.state.categoryID;
		let tags = this.chosenTags.current.state.chosenTags;
		let result = {
			category: {
				id: null,
				name: null
			},
			tags: []
		};
		if (ID > 0) {
			let ctg = this.state.categoryWithTags && this.state.categoryWithTags.find((c) => c.id === this.chosenTags.current.state.categoryID);
			result.category.id = ctg.id;
			result.category.name = ctg.name;
		} else {
			result.category = null;
			result.tags = null;
			return result;
		}

		if (tags && tags.length > 0) {
			result.tags = [...tags];
		} else {
			result.tags = null;
		}

		return result;
	};

	// 同步文章title变更
	handleArticleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		this.setState((state) => {
			state.article.title = e.target.value;
			return {article: {...state.article}}
		})
	};

	// 同步文章发布日期变更
	handleCreateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		this.setState((state) => {
			state.article.createTime = e.target.value;
			return {article: {...state.article}}
		})
	};

	// 返回编辑：隐藏预览和文章信息弹窗。
	continueEditing = () => {
		this.setState({finalPreview:false,postModalFlag:false});
	};

	resumePostModal = () => {
		this.setState({finalPreview:false});
	};


	render() {
		return (
			<div className={style['new-article']}>
				<PreviewFullPage show={this.state.finalPreview} articleInfo={this.state.article} html={this.state.previewHtml} onClose={()=>{this.continueEditing()}} onHide={() => {this.resumePostModal()}}></PreviewFullPage>
				<Drawer
					title="该文章已上传的文件"
					placement="left"
					closable={false}
					onClose={this.FilesTableDrawerClose}
					visible={this.state.filesTableFlag}
					width="60%"
					headerStyle={{height: '60px'}}
				>
					{
						Object.getOwnPropertyNames(this.state.files).length > 0 ?
							<div className={style['file-list']}>
								<FileTable files={this.state.files} onFileChange={this.FileTableFileChange}/>
							</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="这里什么也没有，上传后再来看看吧"/>
					}
				</Drawer>
				<Modal
					visible={this.state.postModalFlag}
					title="文章信息"
					onCancel={this.postModalCancel}
					wrapClassName={style['post-modal']}
					footer={[
						<Button key="back" onClick={this.postModalCancel}>
							取消
						</Button>,
						<Button key="submit" type="primary" loading={this.state.postingFlag} onClick={this.previewBeforePost}>
							下一步
						</Button>,
					]}
				>
					<div className={`${style['form-control-field']}`}>
						<input className={`lee-input lee-input-text ${style['form-control-field']} ${style['article-title']}`}
									 type="text" value={this.state.article.title} onChange={(e) => {
							this.handleArticleTitleChange(e)
						}} placeholder="文章标题"/>
					</div>
					<div className={`${style['form-control-field']}`}>
						<input className={`lee-input lee-input-text ${style['form-control-field']} ${style['article-create-time']}`}
									 type="text" value={this.state.article.createTime} onChange={(e) => {
							this.handleCreateTimeChange(e)
						}} placeholder="发布时间"/>
					</div>
					<div className={style['form-control-field']}>
						<CategoriesTags ref={this.chosenTags} categoryWithTags={this.state.categoryWithTags}></CategoriesTags>
					</div>
				</Modal>
				<div className={style['options-wrapper']}>
					<Button className={`${style['lee-btn']} ${style['open-post-modal']}`} size={"small"} type="primary"
									onClick={() => {
										this.togglePostModal(true)
									}}>发送</Button>
					<Button className={`${style['lee-btn']} ${style['preview']}`} type="primary" size={"small"}
									onClick={this.togglePreview}>{
						this.state.previewFlag ? '取消预览' : '预览'
					}</Button>
					<Button className={`${style['lee-btn']} ${style['upload']}`} size={"small"}
									onClick={this.showSysFileSelected}>上传文件</Button>
					<input type="file" ref={this.fileSelected} multiple={true} style={{display: "none"}}
								 onChange={this.confirmUpload}/>
					<Button className={`${style['lee-btn']} ${style['open-files-table-drawer']}`} size={"small"} onClick={() => {
						this.FilesTableDrawerToggle(true)
					}}>文件列表</Button>
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
				<div className={style['divider']}/>
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

export default withRouter(NewArticle);
