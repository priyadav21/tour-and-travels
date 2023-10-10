import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import '../Utils/nodeFillers';

// NOTE: require is specific to webpack. Since we are using the same code through node, below polyfill is needed
if (typeof require.ensure !== 'function') {
	require.ensure = (d, c) => {
		c(require);
	};
}
if (typeof require.include !== 'function') {
	require.include = () => {};
}

// Throws an error in the console if the page wasn't able to load
const errorLoading = error => {
	throw new Error(`Dynamic page loading failed: ${error}`);
};

// Loading modules!
const loadRoute = cb => module => cb(null, module.default);

const paths = [
	<IndexRoute
		key='nonCitiesFeedPage'
		getComponent={(location, cb) => {
			import('Containers/desktop/homePage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='appShowcasePage'
		path='app'
		getComponent={(location, cb) => {
			import('Containers/desktop/appShowcasePage.jsx').then(
				loadRoute(cb),
			);
		}}
	/>,
	<Route
		key='citiesPage'
		path='cities'
		getComponent={(location, cb) => {
			import('Containers/desktop/citiesPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='citiesFeedPageV2'
		path='cities/:city'
		getComponent={(location, cb) => {
			import('Containers/desktop/citiesFeedPageV2.jsx').then(
				loadRoute(cb),
			);
		}}
	/>,
	<Route
		key='tourListPage'
		path='tours/:city'
		getComponent={(location, cb) => {
			import('Containers/desktop/tourListPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='tourListPage'
		path='category/:id(/:slug)'
		getComponent={(nextState, callback) => {
			require.ensure(
				[],
				require => {
					callback(
						null,
						require('../containers/desktop/tourListPage.jsx')
							.default,
					);
				},
				'DesktopTourListPage',
			);
		}}
	/>,
	<Route
		key='collectionsPage'
		path='categories/:city'
		getComponent={(location, cb) => {
			import('Containers/desktop/collectionsPage.jsx').then(
				loadRoute(cb),
			);
		}}
	/>,
	<Route
		key='profilePage'
		path='profile(/:tab)'
		getComponent={(location, cb) => {
			import('Containers/desktop/profilePage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='reviewsPage'
		path='reviews/:id(/:country(/:city(/:name)))'
		getComponent={(location, cb) => {
			import('Containers/desktop/reviewsPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='productPage'
		path='tour/:id(/:country(/:city(/:name)))'
		getComponent={(location, cb) => {
			import('Containers/desktop/productPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='bookingFlowEntry'
		path='book/:id'
		getComponent={(location, cb) => {
			import('Containers/common/bookingFlowEntry.jsx').then(
				loadRoute(cb),
			);
		}}
	>
		<IndexRoute
			key='bookingFlowIndex'
			getComponent={(location, cb) => {
				import('Containers/common/bookingFlowIndex.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		{/* select and variant are same */}
		<Route
			key='selectScreen-select'
			path='select'
			getComponent={(location, cb) => {
				import('Containers/desktop/selectScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='selectScreen-variant'
			path='variant'
			getComponent={(location, cb) => {
				import('Containers/desktop/selectScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='seatmapSelectScreen'
			path='seatmap-select'
			getComponent={(location, cb) => {
				import('Containers/desktop/seatmapSelectScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='svgSelectScreen'
			path='svg-select'
			getComponent={(location, cb) => {
				import('Containers/desktop/svgSelectScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='seatmapVariantScreen'
			path='seatmap-variant'
			getComponent={(location, cb) => {
				import('Containers/desktop/seatmapVariantScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='svgVariantScreen'
			path='svg-variant'
			getComponent={(location, cb) => {
				import('Containers/desktop/svgVariantScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='CheckoutWrapper'
			path='seatmap-checkout'
			getComponent={(location, cb) => {
				import('Containers/desktop/checkoutWrapper.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='CheckoutWrapper'
			path='svg-checkout'
			getComponent={(location, cb) => {
				import('Containers/desktop/checkoutWrapper.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='CheckoutWrapper'
			path='checkout'
			getComponent={(location, cb) => {
				import('Containers/desktop/checkoutWrapper.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>

		<Route
			key='paymentVerification'
			path='payment-verification/:piid'
			getComponent={(location, cb) => {
				import('Containers/desktop/microauthScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
	</Route>,
	<Route
		key='paymentVerification'
		path='payment-verification/:piid'
		getComponent={(location, cb) => {
			import('Containers/desktop/microauthScreen.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='confirmationScreen'
		path='confirmation/:piid'
		getComponent={(location, cb) => {
			import('Containers/desktop/confirmationScreen.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='searchListPage'
		path='search'
		getComponent={(location, cb) => {
			import('Containers/desktop/searchListPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='userWishlistPage'
		path='wishlists/user/:userId'
		getComponent={(location, cb) => {
			import('Containers/desktop/userWishlistPage.jsx').then(
				loadRoute(cb),
			);
		}}
	/>,
	<Route
		key='wishlistPage'
		path='wishlists/:userId/:wishlistId'
		getComponent={(location, cb) => {
			import('Containers/desktop/wishlistPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='aboutUs'
		path='about-us'
		getComponent={(location, cb) => {
			import('../../Components/desktop/aboutus/aboutUs.jsx').then(
				loadRoute(cb),
			);
		}}
	/>,
	<Route
		key='privacyPolicyPage'
		path='privacy-policy'
		getComponent={(location, cb) => {
			import('Containers/common/privacyPolicyPage.jsx').then(
				loadRoute(cb),
			);
		}}
	/>,
	<Route
		key='termsOfUsePage'
		path='terms-of-use'
		getComponent={(location, cb) => {
			import('Containers/common/termsOfUsePage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='scholarshipPage'
		path='college-scholarship'
		getComponent={(location, cb) => {
			import('Containers/common/scholarshipPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='referralPage'
		path='cashback/:token'
		getComponent={(location, cb) => {
			import('Containers/desktop/referralPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='referralPage'
		path='invite/:token'
		getComponent={(location, cb) => {
			import('Containers/desktop/referralPage.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='affiliatesLogin'
		path='affiliates/login'
		getComponent={(location, cb) => {
			import('Containers/common/affiliatesLogin.jsx').then(loadRoute(cb));
		}}
	/>,
	<Route
		key='helpPage'
		path='help'
		getComponent={(location, cb) => {
			import('Containers/desktop/helpPage.jsx').then(loadRoute(cb));
		}}
	/>,
];

const routes = (
	<Router>
		<Route
			path='/'
			/* getComponent={(location, cb) => {
				import('Containers/desktop/app').then(loadRoute(cb));
			}} */
		>
			{paths}
		</Route>
		<Route
			path='/:lang'
			getComponent={(location, cb) => {
				import('Containers/desktop/app').then(loadRoute(cb));
			}}
		>
			{paths}
		</Route>
		<Route
			path='*'
			getComponent={(location, cb) => {
				import('Containers/desktop/notFound.jsx').then(loadRoute(cb));
			}}
		/>
	</Router>
);

export default routes;
