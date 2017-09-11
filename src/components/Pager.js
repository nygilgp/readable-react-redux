import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PostDetail from './PostDetail';
import Post from './Post';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';  
import * as actions from '../actions/post';
import NoMatch from './NoMatch';

class Pager extends Component {
  
  render() {
    const { isValidCategory } = this.props;
    let listing = isValidCategory ? <PostDetail {...this.props} /> : <NoMatch />;
    
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-8 blog-main">
              <Switch>
                <Route exact path="/:category" render={() => (
                  <div className="listing">  
                    {listing}
                  </div>
                )} />
                <Route path="/:category/:post" render={(props) => (
                  <Post {...props} />
                )} />
              </Switch>
            </div>
            <Sidebar categories={ this.props.categories } />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }, ownProps) {
  let isValidCategory = (categories.filter(category => category.path === ownProps.match.params.category)).length === 1;
  return {
    categories,
    posts: posts.filter((post) => post.category === ownProps.match.params.category),
    isValidCategory
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager);  
