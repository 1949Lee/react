import React, {Component} from 'react';
import './style.scss'

class NewArticle extends Component {

	data = `<div className="content">
      <div className="block"><h3 className="header-h3"><span className="text">斜体和粗体和粗斜体</span></h3></div>
      <div className="block"><span className="text">使用 * 和 ** 和 *** 表示斜体和粗体。</span></div>
      <div className="block"><span className="text">这是 </span><span className="italic">斜体</span><span
       className="text">，这是 </span><span className="bold">粗体</span><span className="text">，这是</span><span
       className="bold-italic">粗斜体</span></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">删除线</span></h3></div>
      <div className="block"><span className="text">使用 ~~ 表示删除线</span></div>
      <div className="block"><span className="text">这是 </span><span className="deleted-text">删除线</span><span
       className="text">，这是 </span><span className="deleted-text">删除线+</span><span
       className="bold-italic deleted-text">粗斜体</span></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">外链接</span></h3></div>
      <div className="block"><span className="text">使用 [描述](链接地址) 为文字增加外链接。</span></div>
      <div className="block"><span className="text">这是一个链接：</span><a className="inline-web-link"
                                      href="https://www.jiaxuanlee.com"><span
       className="text">李佳轩的个人网站——</span><span className="bold-italic">镜中之人</span></a></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">图像块</span></h3></div>
      <div className="block"><span className="text">使用![图像描述](图像地址)来添加图像，一个图像一行。</span></div>
      <div className="block image-block">
       <div className="image-wrapper"><img className="image" src="./img.jpeg" alt=""/>
        <div className="image-text-wrapper"><span className="inline-background-strong"><span
         className="text">这里是一个图片，可以使用其他</span><span className="bold-italic">语法</span></span></div>
       </div>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">行内底色变色强调</span></h3></div>
      <div className="block"><span className="text">使用\`表示行内底色变色强调。</span></div>
      <div className="block"><span className="text">这是一个</span><span className="inline-background-strong"><span
       className="text">行内底色变色强调。</span><a className="inline-web-link" href="https://www.jiaxuanlee.com"><span
       className="text">李佳轩的个人网站——</span><span className="bold-italic">镜中之人</span></a></span><span
       className="text">。</span></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">多级标题</span></h3></div>
      <div className="block"><span className="text">使用一个或多个#然后跟一个空格来表示多级标题</span></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h1 className="header-h1"><span className="text">这是一个一级标题</span></h1></div>
      <div className="block"><h6 className="header-h6"><span className="text">这是一个六级标题，标题还可以跟一些简单语法法。</span><span
       className="inline-background-strong"><span className="text">变色强调。</span><span
       className="bold-italic">粗斜体</span></span></h6></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">无序列表</span></h3></div>
      <div className="block"><span className="text">使用 \\- 表示无序列表。</span></div>
      <div className="block"><span className="text">下面是一个列表：</span></div>
      <div className="block">
       <ul className="list list-level-1">
        <li className="list-item list-item-level-1">
         <div className="list-item-text-line-wrapper title"><span className="text">第一项 还可以使用基础用法。</span><span
          className="inline-background-strong"><span className="text">变色强调。</span><span
          className="bold-italic">粗斜体</span></span></div>
         <ul className="list list-level-2">
          <li className="list-item list-item-level-2">
           <div className="list-item-text-line-wrapper title"><span className="text">第一项二级 1</span></div>
           <ul className="list list-level-3">
            <li className="list-item list-item-level-3">
             <div className="list-item-text-line-wrapper title"><span className="text">三级子列表 1</span></div>
            </li>
            <li className="list-item list-item-level-3">
             <div className="list-item-text-line-wrapper title"><span className="text">三级子列表 2</span></div>
            </li>
           </ul>
          </li>
          <li className="list-item list-item-level-2">
           <div className="list-item-text-line-wrapper title"><span className="text">第一项二级 2 5个空格不足8（上面的三级的最低要求是8个）视为4，所以缩进1级，为2级菜单</span>
           </div>
          </li>
          <li className="list-item list-item-level-2">
           <div className="list-item-text-line-wrapper title"><span className="text">第一项二级 3 6个空格不足8，视为4，所以缩进1级</span>
           </div>
          </li>
          <li className="list-item list-item-level-2">
           <div className="list-item-text-line-wrapper title"><span className="text">第一项二级 4 4个空格</span>
           </div>
          </li>
          <li className="list-item list-item-level-2">
           <div className="list-item-text-line-wrapper title"><span
            className="text">子列表的各项缩进的空格数为4，不足4（1、2、3）视为同级。4个空格表示缩进1级。建议按照tab4个空格来缩进</span></div>
          </li>
         </ul>
        </li>
        <li className="list-item list-item-level-1">
         <div className="list-item-text-line-wrapper title"><span className="text">第二项</span></div>
        </li>
        <li className="list-item list-item-level-1">
         <div className="list-item-text-line-wrapper title"><span className="text">第三项</span></div>
         <div className="list-item-text-line-wrapper"><span className="text">敖德萨大</span></div>
        </li>
       </ul>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">自动有序列表</span></h3></div>
      <div className="block"><span className="text">使用 \\+ 表示自动有序列表。</span></div>
      <div className="block"><span className="text">下面是一个列表：</span></div>
      <div className="block">
       <ol className="auto-order-list list-level-1">
        <li className="auto-order-list-item list-item-level-1">
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="auto-order-list-item-level-index">1.</span><span
          className="text">第一项 还可以使用基础用法。</span><span className="inline-background-strong"><span
          className="text">变色强调。</span><span className="bold-italic">粗斜体</span></span></div>
         <ol className="auto-order-list list-level-2">
          <li className="auto-order-list-item list-item-level-2">
           <div className="auto-order-list-item-text-line-wrapper"><span
            className="auto-order-list-item-level-index">1.1</span><span className="text">第一项二级 1</span>
           </div>
           <ol className="auto-order-list list-level-3">
            <li className="auto-order-list-item list-item-level-3">
             <div className="auto-order-list-item-text-line-wrapper"><span
              className="auto-order-list-item-level-index">1.1.1</span><span
              className="text">三级子列表 1</span></div>
             <ul className="list list-level-4">
              <li className="list-item list-item-level-4">
               <div className="list-item-text-line-wrapper title"><span className="text">无序第一项</span>
               </div>
              </li>
              <li className="list-item list-item-level-4">
               <div className="list-item-text-line-wrapper title"><span className="text">无序第二项</span>
               </div>
              </li>
             </ul>
            </li>
            <li className="auto-order-list-item list-item-level-3">
             <div className="auto-order-list-item-text-line-wrapper"><span
              className="auto-order-list-item-level-index">1.1.2</span><span
              className="text">三级子列表 2</span></div>
            </li>
           </ol>
          </li>
          <li className="auto-order-list-item list-item-level-2">
           <div className="auto-order-list-item-text-line-wrapper"><span
            className="auto-order-list-item-level-index">1.2</span><span className="text">第一项二级 2 5个空格不足8（上面的三级的最低要求是8个）视为4，所以缩进1级，为2级菜单</span>
           </div>
          </li>
          <li className="auto-order-list-item list-item-level-2">
           <div className="auto-order-list-item-text-line-wrapper"><span
            className="auto-order-list-item-level-index">1.3</span><span className="text">第一项二级 3 6个空格不足8，视为4，所以缩进1级</span>
           </div>
          </li>
          <li className="auto-order-list-item list-item-level-2">
           <div className="auto-order-list-item-text-line-wrapper"><span
            className="auto-order-list-item-level-index">1.4</span><span
            className="text">第一项二级 4 4个空格</span></div>
          </li>
          <li className="auto-order-list-item list-item-level-2">
           <div className="auto-order-list-item-text-line-wrapper"><span
            className="auto-order-list-item-level-index">1.5</span><span
            className="text">子列表的各项缩进的空格数为4，不足4（1、2、3）视为同级。4个空格表示缩进1级。建议按照tab4个空格来缩进</span></div>
          </li>
         </ol>
        </li>
        <li className="auto-order-list-item list-item-level-1">
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="auto-order-list-item-level-index">2.</span><span className="text">第二项</span></div>
        </li>
        <li className="auto-order-list-item list-item-level-1">
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="auto-order-list-item-level-index">3.</span><span className="text">第三项</span></div>
         <div className="auto-order-list-item-text-line-wrapper"><span className="text">敖德萨大</span></div>
        </li>
       </ol>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">文字引用</span></h3></div>
      <div className="block">
       <div className="block-quote">
        <div className="block-quote-line"><span className="text">这是一个文字引用块，下方是一个自动有序列表</span></div>
        <div className="block-quote-line">
         <ol className="auto-order-list list-level-1">
          <li className="auto-order-list-item list-item-level-1">
           <div className="auto-order-list-item-text-line-wrapper"><span
            className="auto-order-list-item-level-index">1.</span><span
            className="inline-background-strong"><a className="inline-web-link"
                                href="https://www.jiaxuanlee.com"><span
            className="text">李佳轩的个人网站——</span><span className="bold-italic">镜中之人</span></a></span></div>
          </li>
          <li className="auto-order-list-item list-item-level-1">
           <div className="auto-order-list-item-text-line-wrapper"><span
            className="auto-order-list-item-level-index">2.</span><span className="text">第二项</span></div>
           <div className="auto-order-list-item-text-line-wrapper"><span className="text">普通文字</span></div>
          </li>
         </ol>
        </div>
        <div className="block-quote-line">
         <ul className="list list-level-1">
          <li className="list-item list-item-level-1">
           <div className="list-item-text-line-wrapper title"><span className="text">无序列表也可以</span></div>
          </li>
         </ul>
        </div>
       </div>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">颜色块</span></h3></div>
      <div className="block"><span
       className="text">使用>>>background-color:#afeeee;表示颜色块开始，三个大于号后面可以加style表达式</span></div>
      <div className="styled-block block"
         style="background-color:#afeeee;text-align:center;border-radius:8px;margin:20px 25px;padding:10px 0;box-shadow:0 8px 12px #ebedf0;font-size:20px;">
       <div className="styled-block-line"><span className="text">浮生若梦，为欢几何。</span></div>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="styled-block block"
         style="background-color:#afeeee;border-radius:8px;margin:20px 25px;padding:10px 0;box-shadow:0 8px 12px #ebedf0;">
       <div className="styled-block-line"><span className="text">也可以写其他的语法</span></div>
       <div className="styled-block-line">
        <ol className="auto-order-list list-level-1">
         <li className="auto-order-list-item list-item-level-1">
          <div className="auto-order-list-item-text-line-wrapper"><span
           className="auto-order-list-item-level-index">1.</span><span className="text">a</span></div>
         </li>
         <li className="auto-order-list-item list-item-level-1">
          <div className="auto-order-list-item-text-line-wrapper"><span
           className="auto-order-list-item-level-index">2.</span><span className="text">b</span></div>
         </li>
         <li className="auto-order-list-item list-item-level-1">
          <div className="auto-order-list-item-text-line-wrapper"><span
           className="auto-order-list-item-level-index">3.</span><span className="text">abc</span></div>
          <ol className="auto-order-list list-level-2">
           <li className="auto-order-list-item list-item-level-2">
            <div className="auto-order-list-item-text-line-wrapper"><span
             className="auto-order-list-item-level-index">3.1</span><span
             className="inline-background-strong">bcd</span></div>
           </li>
          </ol>
         </li>
        </ol>
       </div>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">代码块</span></h3></div>
      <div className="block"><span className="text">使用\` javascript表示代码块。</span></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">table</span></h3></div>
      <div className="block"><span className="text">普通</span></div>
      <div className="block">
       <table className="table-block">
        <thead className="table-block-thead">
        <tr className="table-block-thead-tr">
         <th className="table-block-thead-th" style="text-align:right;"><span className="text"> 左对齐</span></th>
         <th className="table-block-thead-th" style="text-align:left;"><span className="text"> 右对齐</span></th>
         <th className="table-block-thead-th" style="text-align:center;"><span className="text"> 居中对齐</span>
         </th>
        </tr>
        </thead>
        <tbody className="table-block-tbody">
        <tr className="table-block-tbody-tr">
         <td className="table-block-tbody-td" style="text-align:right;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" style="text-align:left;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" style="text-align:center;"><span className="text"> 单元格</span>
         </td>
        </tr>
        <tr className="table-block-tbody-tr">
         <td className="table-block-tbody-td" style="text-align:right;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" style="text-align:left;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" style="text-align:center;"><span className="text"> 单元格</span>
         </td>
        </tr>
        </tbody>
       </table>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><span className="text">可合并的</span></div>
      <div className="block">
       <table className="table-block">
        <thead className="table-block-thead">
        <tr className="table-block-thead-tr">
         <th className="table-block-thead-th" style="text-align:right;"><span className="text"> 左对齐</span></th>
         <th className="table-block-thead-th" style="text-align:left;"><span className="text"> 右对齐</span></th>
         <th className="table-block-thead-th" style="text-align:center;"><span className="text"> 居中对齐</span>
         </th>
        </tr>
        </thead>
        <tbody className="table-block-tbody">
        <tr className="table-block-tbody-tr">
         <td className="table-block-tbody-td" style="text-align:right;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" style="text-align:left;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" rowSpan="2" style="text-align:center;"><span
          className="text"> 单元格</span></td>
        </tr>
        <tr className="table-block-tbody-tr">
         <td className="table-block-tbody-td" colSpan="2" style="text-align:right;"><span
          className="text"> 单元格</span></td>
        </tr>
        <tr className="table-block-tbody-tr">
         <td className="table-block-tbody-td" style="text-align:right;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" style="text-align:left;"><span className="text"> 单元格</span></td>
         <td className="table-block-tbody-td" style="text-align:center;"><span className="text"> 单元格</span>
         </td>
        </tr>
        </tbody>
       </table>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block"><h3 className="header-h3"><span className="text">小技巧</span></h3></div>
      <div className="block">
       <ol className="auto-order-list list-level-1">
        <li className="auto-order-list-item list-item-level-1">
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="auto-order-list-item-level-index">1.</span><span
          className="text">支持转义字符。可以使用转义符来表示符号本身的意思，否则，会认为使用了markdown的语法。</span></div>
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="text">&#8194;&#8194;&#8194;&#8194;如：使用 * 和 ** 表示斜体和粗体。</span></div>
        </li>
        <li className="auto-order-list-item list-item-level-1">
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="auto-order-list-item-level-index">2.</span><span
          className="text">支持段落首行缩进2个汉字。用其他的每个段落的开始可以用一个tab键（四个空格）来表示缩进两个空格。如不没有，则不缩进。</span></div>
        </li>
        <li className="auto-order-list-item list-item-level-1">
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="auto-order-list-item-level-index">3.</span><span className="text">换行就是换行。</span></div>
        </li>
        <li className="auto-order-list-item list-item-level-1">
         <div className="auto-order-list-item-text-line-wrapper"><span
          className="auto-order-list-item-level-index">4.</span><span className="text">支持表情 😂😇🙌💚💛👏😉💝💙💘💞💕💯🖤💜❤️😍😻💓😘😹😂😇😋💗💖😁😀🤞😲😄✌️😅😃😌👍😊🤗💋😽😽😚🤠😼😏😸👄😺😙😽😚🤠😼😏😸👄😺😙👌😎😆😛🙏🤝🤤😑😐😝🤑🙂😴😪😶🤡🙃😤😵😓👊😦😷🤐🤔🙄😥👻🤓😜🤒🙁😔😯☹️☠️😣😒😕😖😩😰😢😢😮😿🤧😫🤥😨😳💀👎😬😞🤕🤢😱😭😠😈👿💩🙀😟💔😧😀</span>
         </div>
        </li>
       </ol>
      </div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
      <div className="block empty-single-line-block"><br className="empty-line-br"/></div>
     </div>`;
	constructor(props) {
		super(props);
		this.props = props;
		this.textInput = this.textInput.bind(this);
		this.textPaste = this.textPaste.bind(this);
	}

	textPaste(e) {
		// 阻止默认粘贴
		e.preventDefault();
		// 粘贴事件有一个clipboardData的属性，提供了对剪贴板的访问
		// clipboardData的getData(fomat) 从剪贴板获取指定格式的数据
		let text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
		// 插入
		document.execCommand("insertText", false, text);
	}

	textInput(e) {
		if (e.key.toUpperCase() === 'TAB') {
			let selection = window.getSelection();
			if (selection.type === 'Caret') {
				let endNode = selection.anchorNode;
				let endIndex = selection.anchorOffset;
				selection.anchorNode.nodeValue = '    ' + selection.anchorNode.nodeValue;
				selection.collapse(endNode, endIndex + 4)
				// let range = document.createRange();
				// let range = selection.getRangeAt(0);
				// // range.selectNode(endNode);
				// range.setEnd(endNode,endIndex + 4);
				// range.collapse(false);
			} else {
				let startIndex = null;
				let endIndex = null;
				let parent = selection.anchorNode.parentNode;
				// 获取到选中的行的下标
				for (let i = 0; i < parent.childNodes.length; i++) {
					if (parent.childNodes[i].isSameNode(selection.anchorNode)) { // 开始用鼠标拖动选择行时，点击的行。
						startIndex = i;
					}
					if (parent.childNodes[i].isSameNode(selection.focusNode)) { // 结束用鼠标拖动选择行时，离开的行。
						endIndex = i
					}
				}
				// 因为有可能是从下往上选拖动的鼠标，所以开始下标可能会比他
				if (startIndex > endIndex) {
					let temp = startIndex;
					startIndex = endIndex;
					endIndex = temp;
				}

				for (let i = startIndex; i <= endIndex; i++) {
					if (parent.childNodes[i].nodeValue !== '\n') {
						parent.childNodes[i].nodeValue = '    ' + parent.childNodes[i].nodeValue;
					}
				}

			}
			e.preventDefault();
		}
	}

	render() {
		return (
			<div id="new-article">
				<div className="options-wrapper"></div>
				<div className="editor-wrapper">
					<div className="editor" onKeyDown={this.textInput} contentEditable="true" onPaste={this.textPaste}></div>
				</div>
				<div className="divider"></div>
				<div className="preview-wrapper">
					<div className="preview-html" dangerouslySetInnerHTML={{__html:this.data}}>
					</div>
				</div>
			</div>
		);
	}
}

export default NewArticle;
