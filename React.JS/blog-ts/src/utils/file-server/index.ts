import {FileUpload, GetFileData, NextFileFragment} from "./server";

export {FileUpload,GetFileData,NextFileFragment};

export default {
	FileUpload,
	GetFileData,

	/**
	 * @function 下一个要发送的文件片段
	 * @param fileID number类型，文件id
	 * @param origin DataView类型，文件数据
	 * @param index number类型，片段的下标
	 * @param isEnd boolean类型，true表示是最后，false表示不是最后
	 * */
	NextFileFragment}
