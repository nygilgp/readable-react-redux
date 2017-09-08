import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Listing from './Listing';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-8 blog-main">
              <Listing posts={this.props.posts} />
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
    posts: state.posts
  };
} 

export default connect(mapStateToProps)(App);  
