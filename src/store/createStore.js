import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

export default (storeNew) => {
  const store = createStore(reducers, storeNew, applyMiddleware(thunk));
  return store;
};
