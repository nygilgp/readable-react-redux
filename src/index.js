import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Pager from './components/Pager';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux'; 
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { loadCategories } from './actions/category';
import { loadPosts } from './actions/post';
import { IntlProvider } from 'react-intl';

/*
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

store.dispatch(loadPosts());
store.dispatch(loadCategories());

ReactDOM.render(<Provider store={store}><IntlProvider locale="en">
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/:category" component={Pager} />
		</Switch>
	</BrowserRouter></IntlProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();


