import React, {Fragment} from 'react'
import {LoginAction} from "../../store/action-creators";
import {Connect} from "../../utils/decorators";
import * as style from './style.scss'
import {GetWSURL} from "../../api";
import {Modal, message} from "antd";
import QRCode from 'qrcode.react'
import {actionCreators, actionTypes} from '../../store';


const mapDispatchToProps = (dispatch: any) => ({

	// 设置登录信息
	doSetLoginInfo(data: LoginAction) {
		dispatch(actionCreators.setLoginInfo(data));
	}
});

interface State {
	QRValue: any;
	show: boolean;
}

interface Props extends React.ComponentProps<any> {
	doSetLoginInfo?: (data: LoginAction) => void;
}

@Connect(null, mapDispatchToProps)
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

	shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
		if (!nextState.show) {
			this.closeWebSocket();
		}
		return true;
	}

	closeWebSocket = () => {
		// 关闭长连接
		if (this.ws && (this.ws.readyState !== WebSocket.CLOSED)) {
			this.ws.close();
			this.ws = null;
		}
	};

	componentWillUnmount(): void {
		this.closeWebSocket()
	};

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

				localStorage.setItem("leeToken", result.data.leeToken);
				localStorage.setItem("leeKey", this.state.QRValue.key);
				this.props.doSetLoginInfo({
					type: actionTypes.SetLoginInfo,
					key: this.state.QRValue.key,
					leeToken: result.data.leeToken
				});

				// 隐藏二维码弹窗
				this.setState({
					QRValue: null,
					show: false
				});

				// todo 关闭连接
				message.info('登录成功', 2000);
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
