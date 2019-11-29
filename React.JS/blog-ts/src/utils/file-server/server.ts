export function FileUpload(files: FileList) {
	const fileList = [];
	for (let file of Object.values(files)) {
		if (file.type.indexOf('image') > -1) {
			const nameArray = file.name.match(/(.+)(\.[^.]+$)/);
			const fileInfo = {
				name: nameArray[1] + (Math.random() * 1000).toFixed(0) + nameArray[2],
				extType: nameArray[2].substring(1),
				size: file.size,
				lastModified: file.lastModified,
			};
			fileList.push(fileInfo);
		}
	}

	return fileList;
}

function FileUploadBySelect() {
// TODO 上传图片的具体实现。参考链接 https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications
	/*var reader = new FileReader();
          this.ctrl = createThrobber(img);
          var xhr = new XMLHttpRequest();
          this.xhr = xhr;

          var self = this;
          this.xhr.upload.addEventListener("progress", function(e) {
              if (e.lengthComputable) {
                  var percentage = Math.round((e.loaded * 100) / e.total);
                  self.ctrl.update(percentage);
              }
          }, false);

          xhr.upload.addEventListener("load", function(e){
              self.ctrl.update(100);
              var canvas = self.ctrl.ctx.canvas;
              canvas.parentNode.removeChild(canvas);
          }, false);
          xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
          xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
          reader.onload = function(evt) {
              xhr.send(evt.target.result);
          };
          reader.readAsBinaryString(file);*/
}


// 工具截图后，粘贴上传图片。
export function GetFileData(file: File): Promise<ArrayBuffer> {
	const reader = new FileReader();
	reader.readAsArrayBuffer(file);

	return new Promise((resolve, reject) => {
		reader.onload = (e) => {
			const arrayBuffer = e.target.result as ArrayBuffer;
			resolve(arrayBuffer)
		};
	});
}

/**
 * @function 下一个要发送的文件片段
 * @param fileID number类型，文件id
 * @param origin DataView类型，文件数据
 * @param index number类型，片段的下标
 * @param isEnd boolean类型，true表示是最后，false表示不是最后
 * @param size number类型，文件片段的一段的大小，单位kb。默认值64。
 * */
export function NextFileFragment(fileID: number, origin: DataView, index: number, isEnd: boolean, size: number = 64):{data:DataView,flag:boolean} {

	let realSize,buffer,data,flag;
	if(size * 1024 > origin.buffer.byteLength) { // 不需要分片，只发一次。
		flag = 1;
		realSize = origin.buffer.byteLength; // 分片的size是文件整体大小。
		index = 0; // 是第一个文件片段
		isEnd = true; // 是最后一个文件片段（虽然也是第一个文件片段）
	} else if(origin.buffer.byteLength - (index+1) * size * 1024 > 0){ // 可以完整的分一页
		flag = 2;
		realSize = size * 1024; // 分片的size是文件整体大小。
	} else if(origin.buffer.byteLength > index * size * 1024) { // 不够完整的分一页
		flag = 3;
		realSize = origin.buffer.byteLength - index * size * 1024; // 分片的size是文件剩余部分的大小。
		isEnd = true; // 是最后一个文件片段
	} else { // 已经不需要在分片了
		flag = 4;
		return {data:null,flag}
	}
	buffer = new ArrayBuffer(realSize + 8);
	data = new DataView(buffer);
	// 文件ID
	data.setUint32(0, fileID);

	// 文件片段序号
	data.setUint16(4, index);

	// 文件 是否是最后一个片段 1表示是最后， 0 表示不是最后
	data.setUint16(6, isEnd ? 1 : 0);

	// 每页的起始标志位
	let offset = index * size*1024;
	for (let i = 8; i < data.byteLength; i++) {
		data.setUint8(i, origin.getUint8(i - 8 + offset));
	}

	return {data,flag};
}
