export function FileUpload(files:FileList) {
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
			const fileInfo = {
				file:{
					name:file.name,
					size:file.size,
					lastModified:file.lastModified,
				}
			};
			// this.props.textChange({type:2,file:fileInfo.file});
			console.log(fileInfo.file);
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = (e) => {
				FileFragmentSend(e.target.result as ArrayBuffer)
			};
		}
	}
}


export function FileFragmentSend(arrayBuffer:ArrayBuffer) {
	console.log(arrayBuffer);
	let buffer = new ArrayBuffer(arrayBuffer.byteLength + 4);
	let data = new DataView(buffer);
	let origin = new DataView(arrayBuffer);
	data.setUint16(0,2);
	data.setUint16(2,64);
	for (let i = 4; i<data.byteLength;i+=2){
		data.setUint16(i,origin.getUint16(i - 4));
	}
	// this.ws.send(data.buffer);
}