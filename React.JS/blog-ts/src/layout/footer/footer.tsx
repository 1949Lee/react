import React from 'react'
import * as style from './style.scss'

class Footer extends React.Component<any, any>{
	render() {
		return <div className={style['footer-wrapper']}>
			<span className={style['info']}>Copyright © 2020 镜中之人</span>
			<a href={'http://www.beian.miit.gov.cn'} className={style['crt']}>京ICP备17066982号</a>
		</div>;
	}
}

export default Footer