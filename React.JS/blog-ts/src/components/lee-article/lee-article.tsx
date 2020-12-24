import React, {Component, Fragment} from "react";
import {ImagerItem, Token} from "../../utils/interface";
import {diff, ToStyleObj} from "../../utils/methods";
import {UUID} from "../../utils/uuid";
import LeeImager from "../lee-imager/lee-imager";

import { arduinoLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from "./hightlight";



interface State {
	imagerItems: ImagerItem[]
	showImager: boolean
	currentIndex: number
}

interface Props extends React.ComponentProps<any> {
	content: Token[][]
}

// token转换，lines数组中的每一项都是markdown中的对应行
class LeeArticle extends Component<Props, State> {

	// 最新的markdown串中存在的图片数据
	lastedImagerItems: ImagerItem[] = [];

	constructor(props: Props) {
		super(props);
		this.state = {
			imagerItems: null,
			showImager: false,
			currentIndex: null
		};
	}

	imagerShow = (i: number) => {
		this.setState({showImager: true, currentIndex: i})
	};

	// 将token转化为html
	tokensToHtml = (tokens: Token[]): any => {
		let objs = [];
		for (let i = 0; i < tokens.length; i++) {
			let obj = {};
			if (tokens[i] && tokens[i].attrs) {
				for (let j = 0; j < tokens[i].attrs.length; j++) {
					obj[tokens[i].attrs[j].key] = tokens[i].attrs[j].value;
				}
			}
			objs.push(obj);
		}
		return <Fragment key={UUID()}>
			{
				tokens.map((token, i) => {
					let ele = null;
					if (token.tokenType == "empty-line-br") {
						ele = React.createElement(
							token.tagName,
							{className: token.class, ...objs[i], key: UUID()}
						);
					} else if (tokens[i].tokenType === "image") { // image的特殊处理
						this.lastedImagerItems.push({
							src: objs[i].src, text: <div className="image-text-wrapper" key={UUID()}>{token.text}
								{token.children && token.children.length > 0 ? this.tokensToHtml(token.children) : null}
							</div>
						});
						let index = this.lastedImagerItems.length - 1;
						ele = <div className="image-wrapper" key={UUID()}>
							{React.createElement(
								token.tagName,
								{
									className: token.class, ...objs[i], key: UUID(), onClick: () => {
										this.imagerShow(index)
									}
								}
							)}
							<div className="image-text-wrapper" key={UUID()}>{token.text}
								{token.children && token.children.length > 0 ? this.tokensToHtml(token.children) : null}
							</div>
						</div>
					} else if (tokens[i].tokenType === "check-list-checkbox") {
						objs[i]['checked'] = objs[i]['checked'] == "true";
						objs[i]['readOnly'] = true;
						// objs[i]['defaultChecked'] = objs[i]['checked'];
						// delete objs[i]['checked'];
						ele = React.createElement(
							token.tagName,
							{className: token.class, ...objs[i], key: UUID(),}
						);
					} else if (tokens[i].tokenType === 'table-block-tbody-tr' || tokens[i].tokenType === 'table-block-tbody-td' || tokens[i].tokenType === 'table-block-thead-th') {
						if (objs[i]['rowspan'] !== undefined) {
							objs[i]['rowSpan'] = objs[i]['rowspan'];
							delete objs[i]['rowspan'];
						}
						if (objs[i]['colspan'] !== undefined) {
							objs[i]['colSpan'] = objs[i]['colspan'];
							delete objs[i]['colspan'];
						}
						if (objs[i].style) {
							objs[i].style = ToStyleObj(objs[i].style);
						}
						ele = React.createElement(
							token.tagName,
							{className: token.class, ...objs[i], key: UUID(),},
							[token.text ? token.text : null, token.children && token.children.length > 0 ? this.tokensToHtml(token.children) : null]
						);
					} else {
						if (objs[i].style) {
							objs[i].style = ToStyleObj(objs[i].style);
						}
						ele = React.createElement(
							token.tagName,
							{className: token.class, ...objs[i], key: UUID()},
							[token.text ? token.text : null, token.children && token.children.length > 0 ? this.tokensToHtml(token.children) : null]
						);
					}
					return ele;
				})
			}
		</Fragment>
	};

	// 将markdown中的某一行转换为html
	lineToHtml = (tokens: Token[]) => {
		let result = null;
		let imageIndex = null;
		// 空行
		if (tokens[0].tokenType == 'empty-line-br') {
			result = <div className="block empty-single-line-block" key={UUID()}>
				{this.tokensToHtml(tokens)}
			</div>;
		}
		// 颜色块儿
		else if (tokens[0].tokenType == 'styled-block') {
			tokens[0].class += " block";
			result = this.tokensToHtml(tokens);
		} else if (tokens[0].tokenType == 'code-block') {
			result = <div className="block code-block" key={UUID()}>
				{/* Todo 主题色js的还可以，go的并不好看*/}
				<SyntaxHighlighter language="javascript" style={arduinoLight} showLineNumbers={true}>
					{tokens[0].children[0].text}
				</SyntaxHighlighter>
			</div>;
		}
		// 图片块
		else if (tokens.findIndex((t, i) => {
			if (t.tokenType == 'image') {
				imageIndex = i;
				return true;
			}
			return false;
		}) > -1) {
			if (tokens.length === 1) {
				result = <div className="block image-block" key={UUID()}>
					{this.tokensToHtml(tokens)}
				</div>
			} else {
				result = <Fragment key={UUID()}>
					{
						imageIndex > 0 ?
							<div className="block">
								{this.tokensToHtml(tokens.slice(0, imageIndex))}
							</div> : null
					}
					<div className="block image-list-block">
						{this.tokensToHtml([tokens[imageIndex]])}
					</div>
					{
						imageIndex < tokens.length - 1 ?
							<div className="block">
								{this.tokensToHtml(tokens.slice(imageIndex + 1))}
							</div> : null
					}
				</Fragment>;
			}
		} else {
			result = <div className="block" key={UUID()}>
				{this.tokensToHtml(tokens)}
			</div>
		}
		return result
	};

	shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any) {
		this.lastedImagerItems = [];
		return true
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
		this.shouldUpdateImager();
	}

	// 是否需要更新图片查看器
	shouldUpdateImager = () => {
		if (this.lastedImagerItems.length === 0 || !this.lastedImagerItems) {
			if (this.state.imagerItems === null) {
				return
			}
		} else {
			if (this.state.imagerItems && this.state.imagerItems.length === this.lastedImagerItems.length) {
				let i = 0;
				for (; i < this.lastedImagerItems.length; i++) {
					if (this.lastedImagerItems[i].src !== this.state.imagerItems[i].src) {
						break;
					}
					// if (this.lastedImagerItems[i].text.toString() !== this.state.imagerItems[i].text.toString()) {
					// 	break;
					// }
				}
				if (i === this.lastedImagerItems.length) {
					return
				}
			}
		}
		// state中的没有图片数据，但是最新的markdown串中有图片数据。
		this.setState({imagerItems: this.lastedImagerItems})
	};

	imagerClose = () => {
		this.setState({showImager: false})
	};

	render() {
		return (<div className="content">
			{this.state.imagerItems && this.state.imagerItems.length > 0 && this.state.showImager ?
				<LeeImager items={this.state.imagerItems} currentIndex={this.state.currentIndex}
									 close={this.imagerClose}></LeeImager> : null}
			{this.props.content ? this.props.content.map((_, i) => {// 每一行单独转换
				return this.lineToHtml(this.props.content[i])
			}) : null}
		</div>);
	}

}


export default LeeArticle
