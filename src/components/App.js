import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PostDetail from './PostDetail';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';  
import * as actions from '../actions/post';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-8 blog-main">
              <div className="listing">  
                <PostDetail {...this.props} />
              </div>
            </div>
            <Sidebar categories={ this.props.categories } />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);  
