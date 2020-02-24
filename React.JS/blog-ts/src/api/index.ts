
/**本地和线上两种环境的URL*/
let API_URL = {
	'development':'http://localhost:1016',
	// 'development':'https://blogserver.jiaxuanlee.com',
	'production':'https://blogserver.jiaxuanlee.com'
};

let WS_URL = {
	'development':'ws://localhost:1016',
	// 'development':'wss://blogserver.jiaxuanlee.com',
	'production':'wss://blogserver.jiaxuanlee.com'
};


/**
 * @method 根据传入的路径获取最终请求的URL。
 * @param path string 传入的url路径*/
export let GetURL =  (path:string) => {
	return API_URL[process.env.NODE_ENV]+path;
};

/**
 * @method 根据传入的路径获取WebSocket的URL。
 * @param path string 传入的url路径*/
export let GetWSURL = (path:string) => {
	return WS_URL[process.env.NODE_ENV]+path;
};
