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
import { getCategories } from './utils/category';

let cc = getCategories().then(d => console.log(d));
*/


/*
import { getPosts, addPost, deletePost } from './utils/post';
import { getPostComments, voteComment, updateComment, deleteComment } from './utils/comment';

let dataAdd = addPost('nygil 1st post', 'lorem ipsum post data here..', 'nygil', 'react');
dataAdd.then(d => console.log(d));

let dataup = updatePost("zusr2def59bo2kto7k89t", 'nygil 2nd post', '2nd lorem ipsum post data here..');
dataup.then(d => console.log(d));


let ddata = deletePost("l1f2afgndik46qxp2nbk8t");
console.log(ddata);


let data = getPosts();
data.then(d => console.log(d));

let vdata = deleteComment("xnqltopbwyos2wsqtk55p");
vdata.then(d => console.log(d));


let datac = getPostComments("8xf0y6ziyjabvozdd253nd");
datac.then(d => console.log(d));


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


