import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import axios from 'axios';
import {ArticleListItem} from '../../utils/api.interface';

interface State {
	article:ArticleListItem;
}

interface Props extends React.ComponentProps<any>, RouteComponentProps<{ id: any }> {
}
class Article extends Component<Props,State> {
	constructor(props:Props) {
		super(props);
		this.state = {
			article: null
		}

	}
	componentDidMount(): void {
		axios.post("http://localhost:1314/show-article",{id:+this.props.match.params.id}).then((res) => {
			if(res.data.code === 0) {

			} else {

			}
		},err => {

		});
	}

	render() {
    return (
      <div>
        这是一篇文章
      </div>
    );
  }
}

export default withRouter(Article);
