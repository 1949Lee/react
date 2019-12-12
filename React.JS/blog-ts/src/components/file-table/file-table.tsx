import axios from "axios";
import React, {Component, Fragment} from 'react';
import {diff} from "../../utils/methods";
import * as style from "./style.scss";

interface State {

}

// 文件状态
export enum FileTableItemStatus {
	Fail = 1,
	Uploading = 2,
	Success = 0
}

// 文件列表项
export interface FileTableItem {

	// 文件名字
	name: string,

	// 文件大小，单位字节
	size: number

	status: FileTableItemStatus

	upload: { total: number, loaded: number }
}


interface Props {
	// 文件列表数据
	files: {[key:string]:FileTableItem}
}

// 文件列表：显示文件信息、文件上传进度、操作选项、等
export class FileTable extends Component<Props, State> {

	statusText: any = {
		[1]: "失败",
		[2]: "上传中",
		[0]: "可使用",
	};

	constructor(props: Props) {
		super(props);
	}

	fileSizeText = (size: number = -1): string => { // 保留两位小数
		let result = "--";
		if (size > 0) {
			if (size < 1024) { // 大小区间：[0,1KB)
				result = size + "B";
			} else if (size >= 1024 && size < 1024 * 1024) { // 大小区间：[1KB,1MB)
				result = (size / 1024).toFixed(2) + "KB";
			} else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) { // 大小区间：[1MB,1GB)
				result = (size / 1024 / 1024).toFixed(2) + "MB";
			} else { // 大小区间：[1GB,+∞)
				result = (size / 1024 / 1024 / 1024).toFixed(2) + "GB";
			}
		}
		return result;
	};

	shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
		return !diff(nextProps, this.props);
	}

	deleteFile = (file: FileTableItem) => {
		axios.post("http://localhost:1314/delete-file", {
			ArticleID:'1234567811111111',
			FileName:file.name
		}, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}).then((res) => {
			console.log(res);
		});
	};

	tdFileStatus = (file: FileTableItem) => {
		let part = this.statusText[file.status];
		switch (file.status) {
			case FileTableItemStatus.Fail:
				break;
			case FileTableItemStatus.Success:
				break;
			case FileTableItemStatus.Uploading:
				part += ':' + (file.upload.loaded/file.upload.total * 100).toFixed(2) + '%';
				break;
		}

		return <Fragment>{part}</Fragment>
	};

	render() {
		return (<div className={style['lee-file-table-wrapper']}>
			<table className={style['lee-file-table']}>
				<thead>
				<tr>
					<th>文件名</th>
					<th>大小</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
				</thead>
				<tbody>
				{
					Object.keys(this.props.files).map((name: string, i) => {
						return (
							<tr key={name}>
								<td>{this.props.files[name].name}</td>
								<td>{this.fileSizeText(this.props.files[name].size)}</td>
								<td>{this.tdFileStatus(this.props.files[name])}</td>
								<td>
									<span onClick={() => {
										this.deleteFile(this.props.files[name])
									}}>删除</span>
								</td>
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>)
	}
}
