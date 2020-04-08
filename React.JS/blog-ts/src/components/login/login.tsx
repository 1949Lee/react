import React, {Fragment} from 'react'
import * as style from './style.scss'
import {GetWSURL} from "../../api";
import {Modal, message} from "antd";
import QRCode from 'qrcode.react'

interface State {
	QRValue: any;
	show: boolean;
}

interface Props extends React.ComponentProps<any> {

}

class Login extends React.Component<Props, State> {
	ws: WebSocket = null;

	constructor(props: Props) {
		super(props);
		this.state = {
			QRValue: null,
			show: false
		}
	}

	componentDidMount(): void {
		this.initWebSocket();
	}

	initWebSocket = () => {
		// 打开一个 web socket
		this.ws = new WebSocket(GetWSURL("/ws/check-login"));
		this.ws.onmessage = (evt) => {
			this.receive(evt)
		};
		this.ws.onopen = () => {
			console.log("已连接");
			this.ws.send(JSON.stringify({action: "login"}));
		};
		this.ws.onclose = () => {
			// 关闭 websocket
			console.log("连接已关闭...");
		};
		// ws.binaryType
	};

	// 接受server返回的websocket的消息
	receive = (event: MessageEvent) => {
		let result = JSON.parse(event.data);
		if (result && +result.code === 0) {
			if (result.data.key) {
				this.setState({
					QRValue: {key: result.data.key, action: "login"},
					show: true
				});
				return
			} else if (result.data.leeToken) {

				localStorage.setItem("leeToken",result.data.leeToken);
				localStorage.setItem("leeKey",this.state.QRValue.key);

				// 隐藏二维码弹窗
				this.setState({
					QRValue: null,
					show: false
				});

				// todo 登录成功
				message.info('登录成功');

				return
			}
		}
		this.setState({
			QRValue: null,
			show: false
		});
	};

	render() {
		return <Fragment>
			<Modal wrapClassName={style['login-modal']} width={'auto'} closable={false} maskClosable={true} onCancel={() => {
				this.setState({show: false})
			}} footer={null} title={null} visible={this.state.show}>
				<QRCode
					value={JSON.stringify(this.state.QRValue)}/></Modal>
		</Fragment>;
	}
}

export default Login
