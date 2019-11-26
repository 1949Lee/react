export function FileUpload(files:FileList) {
	const fileList = [];
	for (let file of Object.values(files)) {
		if (file.type.indexOf('image') > -1) { // 图片展示处理
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
			const nameArray = file.name.match(/(.+)(\.[^.]+$)/);
			const fileInfo = {
				name:nameArray[1]+(Math.random() * 1000).toFixed(0)+nameArray[2],
				size:file.size,
				lastModified:file.lastModified,
			};
			fileList.push(fileInfo);
			// const reader = new FileReader();
			// reader.readAsArrayBuffer(file);
			// reader.onload = (e) => {
			// 	console.log(fileInfo);
			// 	FileFragmentSend(e.target.result as ArrayBuffer)
			// };
		}
	}

	return fileList;
}


export function FileFragmentSend(arrayBuffer:ArrayBuffer) {
	let buffer = new ArrayBuffer(arrayBuffer.byteLength + 4);
	let data = new DataView(buffer);
	let origin = new DataView(arrayBuffer);
	data.setUint16(0,2);
	data.setUint16(2,64);
	for (let i = 4; i<data.byteLength;i++){
		data.setUint8(i,origin.getUint8(i - 4));
	}
	// this.ws.send(data.buffer);
}
