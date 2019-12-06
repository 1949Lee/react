import React, {Component} from 'react';
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
	name:string,

	// 文件大小，单位字节
	size:number

	status:FileTableItemStatus

	upload:{total:number,loaded:number}
}


interface Props {
	// 文件列表数据
	files:FileTableItem[]
}

// 文件列表：显示文件信息、文件上传进度、操作选项、等
export class FileTable extends Component<Props, State> {

	statusText:any = {
		[1]:"失败",
		[2]:"上传中",
		[0]:"可使用",
	};

	constructor(props: Props) {
		super(props);
	}

	fileSizeText = (size:number = -1):string => { // 保留两位小数
		let result = "--";
		if(size > 0) {
			if( size < 1024) { // 大小区间：[0,1KB)
				result = size + "B";
			} else if( size >= 1024 && size < 1024*1024) { // 大小区间：[1KB,1MB)
				result = (size / 1024).toFixed(2) + "KB";
			} else if( size >= 1024*1024 && size < 1024*1024*1024) { // 大小区间：[1MB,1GB)
				result = (size / 1024 / 1024).toFixed(2) + "MB";
			} else { // 大小区间：[1GB,+∞)
				result = (size / 1024 / 1024 / 1024).toFixed(2) + "GB";
			}
		}
		return result;
	};
	shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
		console.log(nextProps,nextState);
		return true;
	}

	render() {
		return (<div className={style['lee-file-table']}>
			<table>
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
					this.props.files.map((file:FileTableItem,i) => {
						return (
							<tr key={i}>
								<td>{file.name}</td>
								<td>{this.fileSizeText(file.size)}</td>
								<td>{this.statusText[file.status]+ ':' + (file.upload.loaded/file.upload.total * 100).toFixed(2) + '%'}</td>
								<td>操作</td>
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>)
	}
}
