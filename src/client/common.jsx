import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import * as storejs from 'store';
import { Provider } from 'react-redux';
import { browserHistory, match, Router } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import configureStore from './store/configureStore';
import EnvUtils from './Utils/envUtils';
import RavenUtils from './Utils/ravenUtils';
import Gen from './Utils/gen';

class ClientCommons {
	static init(deviceRoutes) {
		RavenUtils.init();
		const store = ClientCommons.initStores();
		ClientCommons.initGlobalVariables(store);
		if (window.location.hostname !== 'webcache.googleusercontent.com') {
			ClientCommons.initRender(store, deviceRoutes);
		}
	}

	static initGlobalVariables(store) {
		if (!EnvUtils.isProductionEnvironment()) {
			window.store = store;
			window.storejs = storejs;
		}
	}

	static initStores() {
		Gen.sanitizeStore();
		const preLoadedState = fromJS(window.__PRELOADED_STATE__); // eslint-disable-line no-underscore-dangle
		return configureStore(preLoadedState);
	}

	static setCurrentLocation = currentLocation => {
		ClientCommons.prevLocation = ClientCommons.currentLocation;
		ClientCommons.currentLocation = currentLocation;
	};

	static initRender(store, deviceRoutes) {
		match(
			{ history: browserHistory, routes: deviceRoutes },
			(err, redirectLocation, renderProps) => {
				ReactDOM.hydrate(
					<CookiesProvider>
						<Provider store={store}>
							<Router
								{...renderProps}
								onUpdate={() => {
									ClientCommons.setCurrentLocation(
										browserHistory.getCurrentLocation(),
									);
									if (
										!ClientCommons.prevLocation ||
										ClientCommons.currentLocation
											.pathname !==
											ClientCommons.prevLocation.pathname
									) {
										window.scrollTo(0, 0);
									}
								}}
							/>
						</Provider>
					</CookiesProvider>,
					document.getElementById('app'),
				);
			},
		);
	}
}

export default ClientCommons;
