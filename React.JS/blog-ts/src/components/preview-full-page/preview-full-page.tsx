import {Button} from "antd";
import axios from "axios";
import React, {Component, RefObject} from 'react';
import {ArticleInfo} from "../../utils/interface";
import * as style from './style.scss'

interface State {

}

interface Props extends React.ComponentProps<any> {
	// 控制显隐
	show: boolean

	// 关闭最终预览
	onClose: () => void

	// 隐藏预览
	onHide: () => void

	// 确认按钮点击
	onConfirm: () => void

	// 要展示Markdown的HTML
	html: JSX.Element

	// 文章相关信息，标题、发布时间、分类、标签。等
	articleInfo: ArticleInfo
}

class PreviewFullPage extends Component<Props, State> {

	contentRef:RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

	componentDidMount() {
		document.body.style.overflow = "hidden";
	}

	// componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any){
	// 	console.log(prevProps,this.props);
	// }

	overlayClick = () => {
		this.props.onClose();
	};

	contentWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	doCloseBtnCLick = () => {
		this.props.onClose();
	};

	doBackBtnCLick = () => {
		this.props.onHide();
	};

	doConfirm = () => {
		this.props.onConfirm()
	};

	render() {
		return (<div className={style['preview-full-page-wrapper']} onClick={this.overlayClick}
								 style={{display: !this.props.show ? "none" : "block"}}>
			<div className={style['main-wrapper']} onClick={(e) => {
				this.contentWrapper(e)
			}}>
				<span className={style['back-btn']} onClick={() => {
					this.doBackBtnCLick()
				}}>
					{/*<i className={`${style['close-btn-icon']} lee-icon-cross`}></i>*/}
					返回
				</span>
				<span className={style['close-btn']} onClick={() => {
					this.doCloseBtnCLick()
				}}>
					<i className={`${style['close-btn-icon']} lee-icon-cross`}></i>
				</span>
				<div className={style['article-info-wrapper']}>
					<div className={style['title']}>{this.props.articleInfo.title}</div>
					<div
						className={style['category']}>{this.props.articleInfo.category && this.props.articleInfo.category.name}</div>
					<div className={style['tags']}>{this.props.articleInfo.tags && this.props.articleInfo.tags.map((tag) => {
						return <span key={tag.id}>{tag.name}</span>
					})}</div>
				</div>
				<div className={style['content-wrapper']}>
					{this.props.html}
				</div>
				<div ref={this.contentRef} className={style['options-wrapper']}>
					<Button key="submit" type="primary" onClick={this.doConfirm}>
						下一步
					</Button>
				</div>
			</div>
		</div>)
	}
}

export default PreviewFullPage
