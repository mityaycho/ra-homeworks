'use strict';

const List = props => {
	return (
		props.list.map(item => {
		switch (item.type) {
			case 'video': 
				return <VideoWithWrap {...item} view={item.view} />;
			case 'article':
				return <ArticleWidthWrap {...item} view={item.view} />;
		}
	})
	);
};

const VideoWithWrap = widthStatus(Video),
ArticleWidthWrap = widthStatus(Article);

function widthStatus(Component) {
	return (
		class extends React.Component {
			render() {
				if (this.props.views > 999) {
					return (
						<Popular>
							<Component {...this.props} />
						</Popular>
					);
				} else if (this.props.views < 101) {
					return (
						<New>
							<Component {...this.props} />
						</New>
					);
				} else {
					return <Component {...this.props} />
				}
			}
		}
	)
}