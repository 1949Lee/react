import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {ImagerItem} from "../../utils/interface";
import * as style from './style.scss'

interface State {
	activeIndex:number
}

interface Props extends React.ComponentProps<any> {
	items: ImagerItem[]
	currentIndex: number
	close: () => void
}

class LeeImager extends Component<Props,State> {
	container : HTMLDivElement = document.createElement('div');
	constructor(props:Props) {
		super(props);
		this.container.style.position = "fixed";
		this.container.style.top = "0";
		// this.container.style.display = "none";
		this.container.style.width = "100%";
		this.container.style.height = "100%";
		this.container.style.backgroundColor = "rgba(1,1,1,.8)";
		this.container.style.overflow = "auto";
		this.container.style.zIndex = "2";
		document.body.style.overflow = "hidden";
		this.state = {
			activeIndex:this.props.currentIndex || 0
		};
	}

	componentDidMount() {
		// 在 Modal 的所有子元素被挂载后，
		// 这个 portal 元素会被嵌入到 DOM 树中，
		// 这意味着子元素将被挂载到一个分离的 DOM 节点中。
		// 如果要求子组件在挂载时可以立刻接入 DOM 树，
		// 例如衡量一个 DOM 节点，
		// 或者在后代节点中使用 ‘autoFocus’，
		// 则需添加 state 到 Modal 中，
		// 仅当 Modal 被插入 DOM 树中才能渲染子元素。
		document.body.appendChild(this.container);
	}

	componentWillUnmount() {
		document.body.style.overflow = null;
		document.body.removeChild(this.container);
	}


	// 改变当前显示的图片下标，传入负数向上翻页，传入正数向下翻页
	go = (increment:number) => {
		let index = this.state.activeIndex + increment;
		if(index < 0) {
			index = 0;
		}
		if(index > this.props.items.length - 1) {
			index = this.props.items.length - 1
		}
		this.setState({activeIndex:index});
	};

	close =() => {
		document.body.style.overflow = null;
		this.props.close()
	};

	render() {
		let image = this.props.items[this.state.activeIndex];
		return ReactDOM.createPortal(
			<div className={style['lee-imager-content']}>
				<i className={`lee-icon-cross ${style['close-btn']}`} onClick={() =>  {this.close()}}></i>
				{this.state.activeIndex === 0?null:
					<div className={`${style['nav']} ${style['nav-button']} ${style['prev']}`} onClick={()=>{this.go(-1)}}>
						<i className={style['icon']}></i>
						<span className={style['text']}>上一张</span>
					</div>}
				<div className={style['image-wrapper']}>
					<img className={style['active-image']} src={image.src} alt=""/>
				</div>
				{this.state.activeIndex === this.props.items.length - 1?null:
					<div className={`${style['nav']} ${style['nav-button']} ${style['next']}`} onClick={()=>{this.go(1)}}>
						<i className={style['icon']}></i>
						<span className={style['text']}>下一张</span>
					</div>}
			</div>,
			this.container
		);
	}
}

export default LeeImager
