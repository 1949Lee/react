import {notification} from "antd";
import axios from "axios";

/**本地和线上两种环境的URL*/
let API_URL = {
	'development': 'http://localhost:1016',
	// 'development':'https://blogserver.jiaxuanlee.com',
	'production': 'https://blogserver.jiaxuanlee.com',
	'production_http': 'http://blogserver.jiaxuanlee.com'
};

let WS_URL = {
	'development': 'ws://localhost:1016',
	// 'development':'wss://blogserver.jiaxuanlee.com',
	'production': 'wss://blogserver.jiaxuanlee.com',
	'production_http': 'ws://blogserver.jiaxuanlee.com'
};


/**
 * @method 根据传入的路径获取最终请求的URL。
 * @param path string 传入的url路径*/
export let GetURL = (path: string) => {
	console.log(process.env.API_ENV)
	return API_URL[process.env.API_ENV] + path;
};

/**
 * @method 根据传入的路径获取WebSocket的URL。
 * @param path string 传入的url路径*/
export let GetWSURL = (path: string) => {
	return WS_URL[process.env.API_ENV] + path;
};


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	config.headers.leeKey = localStorage.getItem("leeKey");
	config.headers.leeToken = localStorage.getItem("leeToken");
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	console.log(response);
	if (response.data.code === 1479) {
		notification.error({description:'即将跳转首页', message: response.data.data,onClose:() => {window.location.href = "/"}});
	}
	// 对响应数据做点什么
	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
