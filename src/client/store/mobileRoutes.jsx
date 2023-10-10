import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import LogUtils from '../Utils/logUtils';
import '../Utils/nodeFillers';
import { PROFILE_PAGE_TAB } from '../Constants/constants';

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
	LogUtils.error(`Dynamic page loading failed: ${error}`);
	// throw new Error();
};

// Loading modules!
const loadRoute = cb => module => cb(null, module.default);

const paths = [
	<IndexRoute
		key='citiesFeedPage'
		getComponent={(location, cb) => {
			import('Containers/mobile/homePage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='appShowcasePage'
		path='app'
		getComponent={(location, cb) => {
			import('Containers/mobile/appShowcasePage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='citiesPage'
		path='cities'
		getComponent={(location, cb) => {
			import('Containers/mobile/citiesPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='citiesFeedPage'
		path='cities/:city'
		getComponent={(location, cb) => {
			import('Containers/mobile/citiesFeedPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='tourListPage'
		path='tours/:city'
		getComponent={(location, cb) => {
			import('Containers/mobile/tourListPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
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
						require('Containers/mobile/tourListPage.jsx').default,
					);
				},
				'MobileTourListPage',
			);
		}}
	/>,
	<Route
		key='collectionsPage'
		path='categories/:city'
		getComponent={(location, cb) => {
			import('Containers/mobile/collectionsPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='reviewsPage'
		path='reviews/:id(/:country(/:city(/:name)))'
		getComponent={(location, cb) => {
			import('Containers/mobile/reviewsPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='productPage'
		path='tour/:id(/:country(/:city(/:name)))'
		getComponent={(location, cb) => {
			import('Containers/mobile/productPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='searchListPage'
		path='search'
		getComponent={(location, cb) => {
			import('Containers/mobile/searchListPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='privacyPolicyPage'
		path='privacy-policy'
		getComponent={(location, cb) => {
			import('Containers/common/privacyPolicyPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='bookingsPage'
		path={`profile/${PROFILE_PAGE_TAB.BOOKING}`}
		getComponent={(location, cb) => {
			import('Containers/mobile/bookingsPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='creditsSection'
		path={`profile/${PROFILE_PAGE_TAB.CREDITS}`}
		getComponent={(location, cb) => {
			import('../../Components/common/creditsSection.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='profilePage'
		path='profile'
		getComponent={(location, cb) => {
			import('Containers/mobile/profilePage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='termsOfUsePage'
		path='terms-of-use'
		getComponent={(location, cb) => {
			import('Containers/common/termsOfUsePage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='bookingFlowEntry'
		path='book/:id'
		getComponent={(location, cb) => {
			import('Containers/common/bookingFlowEntry.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	>
		<IndexRoute
			getComponent={(location, cb) => {
				import('Containers/common/bookingFlowIndex.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='selectScreen'
			path='select'
			getComponent={(location, cb) => {
				import('Containers/mobile/selectScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		>
			<Route
				key='selectTimeScreen'
				path='time'
				getComponent={(location, cb) => {
					import('Containers/mobile/selectTimeScreen.jsx')
						.then(loadRoute(cb))
						.catch(errorLoading);
				}}
			/>
			<Route
				key='selectPaxScreen'
				path='pax'
				getComponent={(location, cb) => {
					import('Containers/mobile/selectPaxScreen.jsx')
						.then(loadRoute(cb))
						.catch(errorLoading);
				}}
			/>
		</Route>
		<Route
			key='seatmapSelectScreen'
			path='seatmap-select'
			getComponent={(location, cb) => {
				import('Containers/mobile/seatmapSelectScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='svgSelectScreen'
			path='svg-select'
			getComponent={(location, cb) => {
				import('Containers/mobile/svgSelectScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='seatmapVariantScreen'
			path='seatmap-variant'
			getComponent={(location, cb) => {
				import('Containers/mobile/seatmapVariantScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='svgVariantScreen'
			path='svg-variant'
			getComponent={(location, cb) => {
				import('Containers/mobile/svgVariantScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		>
			<Route
				key='svgPaxScreen'
				path='pax'
				getComponent={(location, cb) => {
					import('Containers/mobile/svgSelectPaxScreen.jsx')
						.then(loadRoute(cb))
						.catch(errorLoading);
				}}
			/>
		</Route>
		<Route
			key='checkoutScreen-checkout'
			path='checkout'
			getComponent={(location, cb) => {
				import('Containers/mobile/checkoutScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='seatmapCheckoutScreen'
			path='seatmap-checkout'
			getComponent={(location, cb) => {
				import('Containers/mobile/seatmapCheckoutScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='checkoutScreen-svg-checkout'
			path='svg-checkout'
			getComponent={(location, cb) => {
				import('Containers/mobile/checkoutScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
		<Route
			key='paymentVerification'
			path='payment-verification/:piid'
			getComponent={(location, cb) => {
				import('Containers/mobile/microauthScreen.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
	</Route>,
	<Route
		key='paymentVerification'
		path='payment-verification/:piid'
		getComponent={(location, cb) => {
			import('Containers/mobile/microauthScreen.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='confirmationScreen'
		path='confirmation/:piid'
		getComponent={(location, cb) => {
			import('Containers/mobile/confirmationScreen.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='scholarshipPage'
		path='college-scholarship'
		getComponent={(location, cb) => {
			import('Containers/mobile/scholarshipPage.js')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='referralPage'
		path='cashback/:token'
		getComponent={(location, cb) => {
			import('Containers/mobile/referralPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='referralPage'
		path='invite/:token'
		getComponent={(location, cb) => {
			import('Containers/mobile/referralPage.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='affiliatesLogin'
		path='affiliates/login'
		getComponent={(location, cb) => {
			import('Containers/common/affiliatesLogin.jsx')
				.then(loadRoute(cb))
				.catch(errorLoading);
		}}
	/>,
	<Route
		key='helpPage'
		path='help'
		getComponent={(location, cb) => {
			import('Containers/mobile/helpPage.jsx').then(loadRoute(cb));
		}}
	/>,
];

const routes = (
	<Router>
		<Route
			path='/'
			getComponent={(location, cb) => {
				import('Containers/mobile/app')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		>
			{paths}
		</Route>
		<Route
			path='/:lang'
			getComponent={(location, cb) => {
				import('Containers/mobile/app')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		>
			{paths}
		</Route>
		<Route
			path='*'
			getComponent={(location, cb) => {
				import('Containers/mobile/notFound.jsx')
					.then(loadRoute(cb))
					.catch(errorLoading);
			}}
		/>
	</Router>
);

export default routes;
