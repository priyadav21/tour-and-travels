import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
 * Shows the 404 or error page if there is an error,
 * Otherwise shows the wrapped component/child
 */
class ServerPageElements extends React.PureComponent {
	isServerPage = () => {
		const { location, pageUrl } = this.props;
		const currentUrl = `${location.pathname}${location.search}`;
		return pageUrl && currentUrl === pageUrl.replace('/amp', '');
	};
	render() {
		const { statusCode, getErrorComp } = this.props;
		const ErrorComp = this.isServerPage() ? getErrorComp(statusCode) : null;
		return ErrorComp ? <ErrorComp {...this.props} /> : this.props.children;
	}
}

ServerPageElements.propTypes = {
	pageUrl: PropTypes.string,
	location: PropTypes.object.isRequired,
	statusCode: PropTypes.number,
	children: PropTypes.node.isRequired,
	getErrorComp: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	const serverStatus = state.get('serverStatus');
	const { pageUrl, statusCode } = serverStatus;
	return { pageUrl, statusCode };
};

const ServerPage = withRouter(connect(mapStateToProps)(ServerPageElements));

export default ServerPage;
