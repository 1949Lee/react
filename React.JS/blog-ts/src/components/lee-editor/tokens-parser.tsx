// markdown的节点流
import React, { Fragment} from "react";
import {HyphenToCamelCase} from "../../utils/methods";
import {UUID} from "../../utils/uuid";

export interface Token {

	// 节点的内的文字
	text: string;

	// 节点类型（markdown的节点，如有序列表，无序列表，文本节点，图片块等）
	tokenType: string;

	// 节点对应HTML标签
	tagName: string;

	// 节点CSS样式类名
	class: string;

	// 节点属性
	attrs: NodeAttr[];

	// 子节点
	children: Token[];
}

// 节点属性
export interface NodeAttr {
	// 属性名
	key: string;

	// 属性值
	value: string;
}

// token转换，lines数组中的每一项都是markdown中的对应行
export function Parse(lines: Token[][]) {
	return (<div className="content">
		{lines.map((_, i) => {// 每一行单独转换
			return lineToHtml(lines[i])
		})}
	</div>);
}

// 将markdown中的某一行转换为html
function lineToHtml(tokens: Token[]) {
	let result = null;
	let imageIndex = null;
	// 空行
	if (tokens[0].tokenType == 'empty-line-br') {
		result = <div className="block empty-single-line-block" key={UUID()}>
			{tokensToHtml(tokens)}
		</div>;
	}
	// 颜色块儿
	else if (tokens[0].tokenType == 'styled-block') {
		tokens[0].class += " block";
		result = tokensToHtml(tokens);
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
				{tokensToHtml(tokens)}
			</div>
		} else {
			result = <Fragment key={UUID()}>
				{
					imageIndex > 0 ?
						<div className="block">
							{tokensToHtml(tokens.slice(0, imageIndex))}
						</div> : null
				}
				<div className="block image-list-block">
					{tokensToHtml([tokens[imageIndex]])}
				</div>
				{
					imageIndex < tokens.length - 1 ?
						<div className="block">
							{tokensToHtml(tokens.slice(imageIndex + 1))}
						</div> : null
				}
			</Fragment>;
		}
	} else {
		result = <div className="block" key={UUID()}>
			{tokensToHtml(tokens)}
		</div>
	}
	return result
}

// 将token转化为html
function tokensToHtml(tokens: Token[]): any {
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
					ele = <div className="image-wrapper" key={UUID()}>
						{React.createElement(
							token.tagName,
							{className: token.class, ...objs[i], key: UUID()}
						)}
						<div className="image-text-wrapper" key={UUID()}>{token.text}
						{token.children && token.children.length > 0 ? tokensToHtml(token.children) : null}
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
				} else if(tokens[i].tokenType === 'table-block-tbody-tr' || tokens[i].tokenType === 'table-block-tbody-td' || tokens[i].tokenType === 'table-block-thead-th'){
					if (objs[i]['rowspan'] !== undefined) {
						objs[i]['rowSpan'] = objs[i]['rowspan'];
						delete objs[i]['rowspan'];
					}
					if (objs[i]['colspan'] !== undefined) {
						objs[i]['colSpan'] = objs[i]['colspan'];
						delete objs[i]['colspan'];
					}
					if (objs[i].style) {
						objs[i].style = toStyleObj(objs[i].style);
					}
					ele = React.createElement(
						token.tagName,
						{className: token.class, ...objs[i], key: UUID(),},
							[token.text? token.text :null, token.children && token.children.length > 0 ? tokensToHtml(token.children) : null]
					);
				} else {
					if (objs[i].style) {
						objs[i].style = toStyleObj(objs[i].style);
					}
					ele = React.createElement(
						token.tagName,
						{className: token.class, ...objs[i], key: UUID()},
						[token.text? token.text :null, token.children && token.children.length > 0 ? tokensToHtml(token.children) : null]
					);
				}
				return ele;
			})
		}
	</Fragment>
}

function toStyleObj(str: string) {
	let obj = {};
	let map = str.split(";");
	for (let i = 0; i < map.length; i++) {
		let kv = map[i].split(":");
		kv[0] = HyphenToCamelCase(kv[0]);
		obj[kv[0]] = kv[1];
	}
	return obj;
}
