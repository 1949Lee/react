import React, {Component} from 'react';

interface State {

}

interface Props {

}

// 文件列表：显示文件信息、文件上传进度、操作选项、等
export class FileTable extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return <table>
			<thead>
			<tr>
				<th>文件名</th>
				<th>文件名</th>
			</tr>
			</thead>
			<tbody>
			{/*<tr>*/}
			{/*	<td></td>*/}
			{/*</tr>*/}
			</tbody>
		</table>
	}
}
