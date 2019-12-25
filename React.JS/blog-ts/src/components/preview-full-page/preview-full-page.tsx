import React, {Component} from 'react';
import * as style from './style.scss'

interface State {

}

interface Props extends React.ComponentProps<any>{
	// 控制显隐
	show:boolean

	// 关闭最终预览
	onClose:() => void

	// 隐藏预览
	onHide:() => void
}

class PreviewFullPage extends Component<Props,State> {

	componentDidMount() {
		document.body.style.overflow = "hidden";
	}

	overlayClick = () =>{
		this.props.onClose();
	};

	contentWrapper = (e:React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	doCloseBtnCLick = () => {
		this.props.onClose();
	};

	doBackBtnCLick = () => {
		this.props.onHide();
	};

	render() {
		return (<div className={style['preview-full-page-wrapper']} onClick={this.overlayClick} style={{display:!this.props.show?"none":"block"}}>
			<div className={style['main-wrapper']} onClick={(e)=>{this.contentWrapper(e)}}>
				<span className={style['back-btn']} onClick={() => {this.doBackBtnCLick()}}>
					{/*<i className={`${style['close-btn-icon']} lee-icon-cross`}></i>*/}
					返回
				</span>
				<span className={style['close-btn']} onClick={() => {this.doCloseBtnCLick()}}>
					<i className={`${style['close-btn-icon']} lee-icon-cross`}></i>
				</span>
				<div className={style['content-wrapper']}></div>
			</div>
		</div>)
	}
}

export default PreviewFullPage
