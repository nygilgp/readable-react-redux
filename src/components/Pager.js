import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PostDetail from './PostDetail';
import Post from './Post';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';  
import * as actions from '../actions/post';

class Pager extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-8 blog-main">
              <Switch>
                <Route exact path="/:category" render={() => (
                  <div className="listing">  
                    <PostDetail {...this.props} />
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

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    posts: state.posts.filter((post) => post.category === ownProps.match.params.category)
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager);  
