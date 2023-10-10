import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
// import PageLoader from '../../Components/core/common/pageLoader';
// import loaderUntilDeferred from '../../Components/core/common/loaderUntilDeferred';
import ServerPage from './serverPage';

const wrapWithServerPageHOC = (
	{
		prePush, // called before push, to check for redirects, 404s ...
		preRender, // called before render, to fetch data, validate etc...
		getTitle, // called during render
		getMetaTags, // called during render
		getMetaDescription, // called during render
		getAmpUrl, // called during render
		getCanonicalUrl, // called during render
		isNoIndex, // called during render
		getMetaScript, // called during render
		getErrorComp, // **Required** to show the right error comp
	},
	WrappedComp,
) => {
	if (getErrorComp === undefined) {
		throw new Error(
			'getErrorCompFunc was not supplied to wrapWithServerPage. Use asDesktopServerPage or asMobileServerPage',
		);
	}
	//const DeferredPageComp = loaderUntilDeferred(WrappedComp, PageLoader);
	const comp = props => (
		<ServerPage {...props} getErrorComp={getErrorComp}>
			<WrappedComp {...props} />
		</ServerPage>
	); // pure render component
	hoistNonReactStatics(comp, WrappedComp);
	comp.displayName = `ServerPage(${WrappedComp.displayName || ''}`;
	comp.prePush = prePush;
	comp.getTitle = getTitle;
	comp.getMetaTags = getMetaTags;
	comp.getMetaDescription = getMetaDescription;
	comp.getAmpUrl = getAmpUrl;
	comp.getCanonicalUrl = getCanonicalUrl;
	comp.isNoIndex = isNoIndex;
	comp.getMetaScript = getMetaScript;
	comp.preRender = pageInfo => {
		const { store } = pageInfo;
		const { statusCode } = store.getState().get('serverStatus');
		const errorComp = getErrorComp(statusCode);
		if (errorComp)
			return errorComp.preRender
				? errorComp.preRender(pageInfo)
				: Promise.resolve();
		return preRender(pageInfo);
	};
	return comp;
};

const wrapWithServerPage = statics => WrappedComp =>
	wrapWithServerPageHOC(statics, WrappedComp);

export default wrapWithServerPage;
