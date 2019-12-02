// markdown的节点流
import React,{Fragment} from "react";

export interface Token {

	// 节点的内的文字
	text: string;

	// 节点类型（markdown的节点，如有序列表，无序列表，文本节点，图片块等）
	tokenType: string;

	// 节点对应HTML标签
	nodeTagName: string;

	// 节点CSS样式类名
	nodeClass: string;

	// 节点属性
	nodeAttrs: NodeAttr[];

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

// token转换
export function Parse(lines: Token[][]) {
	return (<div className="content">
		{lines.map((_, i) => {
			return lineToHtml(i,lines[i])
		})}
	</div>);
}

// 将传入的token数组转化为html
function lineToHtml(lineNum:number,tokens: Token[]) {
	let result = null;
	let imageIndex = null;
	if (tokens[0].tokenType == 'empty-line-br') {
		result = <div className="block empty-single-line-block" key={lineNum+'empty-single-line-block'}>
			{tokensToHtml(tokens)}
		</div>;
	} else if (tokens[0].tokenType == 'styled-block') {
		tokens[0].nodeClass += " block";
		result = tokensToHtml(tokens);
	} else if (tokens.findIndex((t, i) => {
		if (t.tokenType == 'image') {
			imageIndex = i;
			return true
		}
	}) > -1) {
		if (tokens.length === 1) {
			result = <div className="block image-block"  key={lineNum+'image-block'}>
				{tokensToHtml(tokens)}
			</div>
		} else {
			result = <Fragment>
				{
					imageIndex > 0?
					<div className="block"  key={lineNum+'image-block-before'}>
					{tokensToHtml(tokens.slice(0,imageIndex))}
					</div>:null
				}
				<div className="block image-list-block" key={lineNum+'image-list-block'}>
					{tokensToHtml([tokens[imageIndex]])}
				</div>
				{
					imageIndex < tokens.length - 1?
						<div className="block" key={lineNum+'image-block-after'}>
							{tokensToHtml(tokens.slice(imageIndex + 1))}
						</div>:null
				}
			</Fragment>;
		}
	} else {
		result = <div className="block" key={lineNum+'normal'}>
			{tokensToHtml(tokens)}
		</div>
	}
	return result
}

// 将token转化为html
function tokensToHtml(tokens: Token[]): any {
	// for (let i = 0;i < tokens.length;i++) {
// 		if tokens[i].TokenType == "empty-line-br" {
// 			builder.WriteString("<")
// 			builder.WriteString(tokens[i].NodeTagName)
// 			builder.WriteString(` class="`)
// 			builder.WriteString(tokens[i].NodeClass)
// 			builder.WriteString(`" `)
// 			if len(tokens[i].NodeAttrs) > 0 {
// 				for j := range tokens[i].NodeAttrs {
// 					builder.WriteString(` `)
// 					builder.WriteString(tokens[i].NodeAttrs[j].Key)
// 					builder.WriteString(`="`)
// 					builder.WriteString(tokens[i].NodeAttrs[j].Value)
// 					builder.WriteString(`" `)
// 				}
// 			}
// 			builder.WriteString("/>")
// 		} else if tokens[i].TokenType == "image" { // image的特殊处理
// 			builder.WriteString(`<div class="image-wrapper">`)
// 			builder.WriteString("<")
// 			builder.WriteString(tokens[i].NodeTagName)
// 			builder.WriteString(` class="`)
// 			builder.WriteString(tokens[i].NodeClass)
// 			builder.WriteString(`" `)
// 			if len(tokens[i].NodeAttrs) > 0 {
// 				for j := range tokens[i].NodeAttrs {
// 					builder.WriteString(` `)
// 					builder.WriteString(tokens[i].NodeAttrs[j].Key)
// 					builder.WriteString(`="`)
// 					builder.WriteString(tokens[i].NodeAttrs[j].Value)
// 					builder.WriteString(`" `)
// 				}
// 			}
// 			builder.WriteString("/>")
// 			builder.WriteString(`<div class="image-text-wrapper">`)
// 			builder.WriteString(tokens[i].Text)
// 			if len(tokens[i].Children) > 0 {
// 				builder.WriteString(tokensToHtml(tokens[i].Children))
// 			}
// 			builder.WriteString(`</div></div>`)
// 		} else {
// 			builder.WriteString("<")
// 			builder.WriteString(tokens[i].NodeTagName)
// 			builder.WriteString(` class="`)
// 			builder.WriteString(tokens[i].NodeClass)
// 			builder.WriteString(`" `)
// 			if len(tokens[i].NodeAttrs) > 0 {
// 				for j := range tokens[i].NodeAttrs {
// 					builder.WriteString(` `)
// 					builder.WriteString(tokens[i].NodeAttrs[j].Key)
// 					builder.WriteString(`="`)
// 					builder.WriteString(tokens[i].NodeAttrs[j].Value)
// 					builder.WriteString(`" `)
// 				}
// 			}
// 			builder.WriteString(">")
// 			builder.WriteString(tokens[i].Text)
// 			if len(tokens[i].Children) > 0 {
// 				builder.WriteString(tokensToHtml(tokens[i].Children))
// 			}
// 			//result += "<"+ l.t.NodeTagName +" class="++" >"
// 			builder.WriteString("</")
// 			builder.WriteString(tokens[i].NodeTagName)
// 			builder.WriteString(">")
// 		}
// 	}
	return 'line'
}
